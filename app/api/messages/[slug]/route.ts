import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params } : { params: Promise<{ slug: string }> } ) {
    try {
        const { slug } = await params;
        const { text, teamId } = await req.json();

        if (slug == "send") {
            const db = await pool.getConnection()
            const query = 'insert into messages (text, teamId) values (?, ?)'
            const [result] = await db.execute(query, [text, teamId]);
            db.release()
    
            return NextResponse.json({
                status: 200,
                data: {
                    "id": (result as any).insertId,
                    "text": text,
                    "teamId": teamId
                }
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