import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({
                status: 400,
                message: 'Category ID is required for deletion.'
            });
        }

        const db = await pool.getConnection();
        const query = 'DELETE FROM categories WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        const resultSetHeader = result as ResultSetHeader;

        db.release();

        if (resultSetHeader.affectedRows === 0) {
            return NextResponse.json({
                status: 404,
                message: `Category with ID ${id} not found.`
            });
        }

        return NextResponse.json({
            status: 200,
            message: `Category with ID ${id} deleted successfully.`
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: `Error: ${error}`
        });
    }
}
