import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params } : { params: Promise<{ slug: string }> } ) {
    try {
        const { slug } = await params;
        const { date, value } = await req.json();

        if (!date || !value) {
            return NextResponse.json({ error: 'A dátum fajtája és az új dátum szükséges' }, { status: 400 });
        }

        if (slug == "modify") {
            const db = await pool.getConnection()
            const query = `update registerdeadline set ${date}=?`
            const [result] = await db.execute(query, [value]);
            db.release()
    
            return NextResponse.json({
                status: 200,
                data: value
            })
        }
        else {
            return NextResponse.json({
                status: 404,
                data: `Hiba történt: nem elfogadható a használt slug`
            })
        }
    } catch (error) {
        return NextResponse.json({
            status: 404,
            data: `Hiba történt: ${error}`
        })
    }
}