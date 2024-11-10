import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';

export async function PUT(req: NextRequest) {
    const { id, name } = await req.json();

    if (!id || !name) {
        return NextResponse.json({
            status: 400,
            message: 'Both ID and new name are required.',
        });
    }

    try {
        const db = await pool.getConnection();
        const query = 'UPDATE languages SET name = ? WHERE id = ?';
        const [result] = await db.execute(query, [name, id]);

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
            message: 'Language updated successfully.',
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: `Error occurred: ${error}`,
        });
    }
}
