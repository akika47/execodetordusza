import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params } : { params: Promise<{ slug: string }> } ) {
    try {
        const { slug } = await params

        const db = await pool.getConnection()
        const query = 'select id, username, email, phoneNumber, role, schoolId from users where id=?'
        const [rows] = await db.execute(query, [slug]);
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