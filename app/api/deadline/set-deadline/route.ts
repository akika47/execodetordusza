import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const { startDate, closeDate } = await req.json();

    // Check if the startDate and closeDate are valid
    if (!startDate || !closeDate) {
      return NextResponse.json({ data: 'Both startDate and closeDate are required' }, { status: 400 });
    }

    const db = await pool.getConnection();
    await db.execute(
      `INSERT INTO registerdeadline (startDate, closeDate) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE startDate = VALUES(startDate), closeDate = VALUES(closeDate)`,
      [startDate, closeDate]
    );
    db.release();

    return NextResponse.json({
      status: 200,
      data: 'Deadline dates updated successfully',
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: `Error: ${error}`,
    });
  }
}
