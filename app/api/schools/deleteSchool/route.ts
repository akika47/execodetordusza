import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        status: 400,
        message: 'Missing ID for deletion.',
      });
    }

    const db = await pool.getConnection();
    const query = 'DELETE FROM schools WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    db.release();

    return NextResponse.json({
      status: 200,
      message: `School with ID ${id} has been successfully deleted.`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Error occurred: ${error}`,
    });
  }
}
