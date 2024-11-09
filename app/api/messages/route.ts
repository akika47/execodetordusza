import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const teamId = searchParams.get("teamId");

        if (!teamId) {
            return NextResponse.json({ error: 'teamId paraméter szükséges' }, { status: 400 });
        }

        const db = await pool.getConnection()
        const query = 'select * from messages where teamId=?'
        const [rows] = await db.execute(query, [teamId]);
        db.release()

        return NextResponse.json({
            status: 200,
            data: rows
        })
    } catch (error) {
        return NextResponse.json({
            status: 404,
            data: `Hiba történt: ${error}`
        })
    }
}