import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        const db = await pool.getConnection();
        const query = 'SELECT id, username, email, phoneNumber, role, schoolId FROM users WHERE id = ?';

        const [rows]: [any[], any] = await db.execute(query, [slug]); 
        db.release();

        if (rows.length === 0) {
            return NextResponse.json({
                status: 404,
                message: 'User not found'
            });
        }


        return NextResponse.json({
            status: 200,
            data: rows[0]
        });
    } catch (error) {
        return NextResponse.json({
            status: 404,
            data: `Error occurred: ${error}`
        });
    }
}
