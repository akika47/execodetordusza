import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

//! AZ IDŐ ELTOLÓDÁS ÉRVÉNYBEN VAN A DÁTUMNÁL

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");

        if (!date) {
            return NextResponse.json({ data: 'date paraméter szükséges' }, { status: 400 });
        }

        const db = await pool.getConnection();
        let query;
        if (date == "startDate") {
            query = 'select startDate from registerdeadline'
        } else if (date == "closeDate") {
            query = 'select closeDate from registerdeadline'
        } else {
            return NextResponse.json({ data: 'type paraméter hibásan lett megadva' }, { status: 400 });
        }
        const [rows] = await db.execute(query) as [Array<{ startDate: number, closeDate: number}>, any];
        db.release();
    

        const dateValue = rows[0][date]
        const formattedDate = new Date(dateValue).toISOString().replace("T", " ").split(".")[0];

        return NextResponse.json({
            status: 200,
            data: formattedDate
        })
    } catch (error) {
        return NextResponse.json({
            status: 404,
            data: `Hiba történt: ${error}`
        })
    }
}