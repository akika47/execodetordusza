import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';

export async function POST(req: NextRequest) {
  const { username, password, schoolName, city, contactEmail } = await req.json();

  if (!username || !password || !schoolName || !city || !contactEmail) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {

    const [schoolResult] = await pool.query(
      'INSERT INTO schools (name, city) VALUES (?, ?)',
      [schoolName, city]
    );
    const schoolId = (schoolResult as any).insertId;

    const [userResult] = await pool.query(
      'INSERT INTO users (username, password, email, role, schoolId) VALUES (?, ?, ?, ?, ?)',
      [username, password, contactEmail, 'Igazgató', schoolId]  
    );
    const principalId = (userResult as any).insertId;

    await pool.query('UPDATE schools SET principal = ? WHERE id = ?', [principalId, schoolId]);


    return NextResponse.json({
      message: 'School and principal registered successfully',
      data: {
        schoolId,
        schoolName,
        city,
        principal: username,
      },
    }, { status: 200 });
  } catch (err) {
    console.error('Error during registration:', err);
    return NextResponse.json({ message: 'An error occurred while registering the school' }, { status: 500 });
  }
}
