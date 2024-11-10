import pool from '@/app/libs/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM languages ORDER BY name';
        const [rows] = await db.execute(query);
        db.release();

        return NextResponse.json({
            status: 200,
            data: rows,
        });
    } catch (error) {
        return NextResponse.json({
            status: 404,
            data: `Error occurred: ${error}`,
        });
    }
}
