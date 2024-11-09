import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params } : { params: Promise<{ slug: string }> } ) {
    try {
        const { slug } = await params;
        const { name } = await req.json();

        if (slug == "add") {
            const db = await pool.getConnection()
            const query = 'insert into schools (name) values (?)'
            const [result] = await db.execute(query, [name]);
            db.release()
    
            return NextResponse.json({
                status: 200,
                data: {
                    "id": (result as any).insertId,
                    "name": name
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({
                status: 400,
                message: 'Hiányzik az ID a törléshez.'
            });
        }

        if (slug == "delete") {
            const db = await pool.getConnection();

            const query = 'DELETE FROM schools WHERE id = ?';
            const [result] = await db.execute(query, [id]);
            db.release();

            return NextResponse.json({
                status: 200,
                message: `A(z) ${id} ID-jú iskola sikeresen törölve lett.`
            });
        } else {
            return NextResponse.json({
                status: 404,
                data: `Hiba történt: nem elfogadható a használt slug`
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: `Hiba történt: ${error}`
        });
    }
}