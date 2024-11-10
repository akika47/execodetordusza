import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

interface TeamRow {
  teamName: string;
  schoolName: string;
  status: string;
}

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = `
      SELECT t.teamName, s.name AS schoolName, t.status
      FROM teams t
      JOIN schools s ON t.schoolId = s.id
    `;
    const [rows] = await db.execute(query);

    const teams = rows as TeamRow[];

    const csv = [
      ['Team Name', 'School Name', 'Status'],
      ...teams.map((row) => [row.teamName, row.schoolName, row.status]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    return NextResponse.json({
      status: 200,
      data: csv,
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      data: `Error: ${error}`,
    });
  }
}
