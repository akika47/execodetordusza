import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from schools order by city, name'
        const [rows] = await db.execute(query);
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