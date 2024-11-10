import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';

export async function PUT(req: NextRequest) {
    try {
        const { id, name } = await req.json();

        if (!id || !name) {
            return NextResponse.json({
                status: 400,
                message: 'ID and name are required.'
            });
        }

        const db = await pool.getConnection();
        const query = 'UPDATE categories SET name = ? WHERE id = ?';
        const [result] = await db.execute(query, [name, id]);

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
            data: { id, name }
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: `Error: ${error}`
        });
    }
}
