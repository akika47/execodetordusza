import pool from '@/app/libs/mysql';
import * as bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

type User = {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: string;
  schoolId: number;
};

export async function POST(req: NextRequest) {
  try {
    const { username, password, email, phoneNumber, role, schoolId } = (await req.json()) as User;
    console.log('Received data:', { username, password, email, phoneNumber, role, schoolId });


    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await pool.getConnection();
    console.log('Database connection established');

    const query = 'INSERT INTO users (username, password, email, phoneNumber, role, schoolId) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [username, hashedPassword, email, phoneNumber, role, schoolId]);
    console.log('Query executed, result:', result);
    db.release();

    return NextResponse.json({
      status: 200,
      data: {
        id: (result as any).insertId,
        username,
        email,
        phoneNumber,
        role,
        schoolId,
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error);

    return NextResponse.json({
      status: 500,
      data: `An error occurred: ${error}`,
    });
  }
}
