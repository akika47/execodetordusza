import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

interface User {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    schoolId: number | null;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        const db = await pool.getConnection();
        const query = 'SELECT id, username, email, phoneNumber, role, schoolId FROM users WHERE id = ?';
        
        const [rows]: [RowDataPacket[], any] = await db.execute(query, [slug]);
        db.release();

        const users: User[] = rows.map((row) => ({
            id: row.id,
            username: row.username,
            email: row.email,
            phoneNumber: row.phoneNumber,
            role: row.role,
            schoolId: row.schoolId,
        }));

        if (users.length > 0) {
            return NextResponse.json({
                status: 200,
                role: users[0].role,
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: 'User not found',
            });
        }

    } catch (error) {
        return NextResponse.json({
            status: 404,
            data: `Error occurred: ${error}`,
        });
    }
}
