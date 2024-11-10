import pool from '@/app/libs/mysql';
import * as bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    console.log('Received login attempt:', { username, password });

    const db = await pool.getConnection();
    console.log('Database connection established for login');

    const query = 'SELECT id, username, password, role, schoolId FROM users WHERE username = ? LIMIT 1';
    const [rows] = await db.execute(query, [username]) as [Array<{ id: number, username: string, password: string, role: string, schoolId: number }>, any];
    db.release();

    console.log('Database query result:', rows);

    if (rows.length > 0) {
      const user = rows[0];

      // Compare the entered password with the stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        console.log('Password matches, user authenticated');
        return NextResponse.json({
          status: 200,
          data: {
            id: user.id,
            username: user.username,
            role: user.role,
            schoolId: user.schoolId,
            message: 'Login successful!',
          },
        });
      } else {
        console.log('Incorrect password');
        return NextResponse.json({
          status: 401,
          data: 'Invalid username or password.',
        });
      }
    } else {
      console.log('User not found');
      return NextResponse.json({
        status: 404,
        data: 'User not found.',
      });
    }
  } catch (error) {
    console.error('Error during user login:', error);

    return NextResponse.json({
      status: 500,
      data: `An error occurred: ${error}`,
    });
  }
}
