import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'duszadb',
});

export async function GET() {
  try {

    const [rows] = await db.query('SELECT * FROM schools');
    return NextResponse.json({ status: 200, data: rows });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({ status: 500, message: 'Error fetching schools' });

  }
}
