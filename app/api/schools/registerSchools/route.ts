import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { schoolName, city, principalId } = await req.json();

    if (!schoolName || !city || !principalId) {
      return NextResponse.json({
        status: 400,
        message: 'Missing required fields: schoolName, city, principalId',
      });
    }

    const db = await pool.getConnection();
    const query = 'INSERT INTO schools (name, city, principal) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [schoolName, city, principalId]);
    db.release();

    const insertId = (result as { insertId: number }).insertId;

    return NextResponse.json({
      status: 200,
      message: 'School registered successfully',
      schoolId: insertId,
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      data: `Error: ${error}`,
    });
  }
}
