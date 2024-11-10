import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({
            status: 400,
            message: 'Language ID is required.',
        });
    }

    try {
        const db = await pool.getConnection();
        const query = 'DELETE FROM languages WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        const resultSetHeader = result as ResultSetHeader;


        db.release();

        if (resultSetHeader.affectedRows === 0) {
            return NextResponse.json({
                status: 404,
                message: `Language with ID ${id} not found.`,
            });
        }

        return NextResponse.json({
            status: 200,
            message: 'Language deleted successfully.',
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: `Error occurred: ${error}`,
        });
    }
}
