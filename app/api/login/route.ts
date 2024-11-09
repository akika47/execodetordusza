import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    console.log('Login attempt:', { username });

    const db = await pool.getConnection();
    console.log('Database connection established for login');

    const query = 'SELECT id, username, password, role, schoolId FROM users WHERE username = ? LIMIT 1';
    const [rows] = await db.execute(query, [username]) as [Array<{ id: number, username: string, password: string, role: string, schoolId: number }>, any];
    db.release();

    if (rows.length > 0) {
      const user = rows[0];


      if (user.password === password) { // Replace with bcrypt comparison later when hashing
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
        return NextResponse.json({
          status: 401,
          data: 'Invalid username or password.',
        });
      }
    } else {
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
