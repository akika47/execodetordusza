import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({
                status: 400,
                data: "Language name is required."
            });
        }

        const db = await pool.getConnection();
        const query = 'INSERT INTO languages (name) VALUES (?)';
        const [result] = await db.execute(query, [name]);
        db.release();

        return NextResponse.json({
            status: 200,
            data: {
                id: (result as any).insertId, 
                name,
            },
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            data: `Error: ${error}`
        });
    }
}
