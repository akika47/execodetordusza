import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = `
      SELECT t.id, t.teamName, t.schoolId, t.status, s.name AS schoolName
      FROM teams t
      JOIN schools s ON t.schoolId = s.id
    `;
    const [rows] = await db.execute(query);
    db.release();

    return NextResponse.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      data: `Error: ${error}`,
    });
  }
}
