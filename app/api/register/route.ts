import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

type User = {
    username: string
    password: string
    email: string
    phoneNumber: string
    role: string
    schoolId: number
}

export async function POST(req: NextRequest) {
    try {
        const { username, password, email, phoneNumber, role, schoolId } = await req.json() as User;

        const db = await pool.getConnection()
        const query = 'insert into users (username, password, email, phoneNumber, role, schoolId) values (?, ?, ?, ?, ?, ?)'
        const [result] = await db.execute(query, [username, password, email, phoneNumber, role, schoolId]);
        db.release()
        
        return NextResponse.json({
            status: 200,
            data: [
                {
                    "id": (result as any).insertId,
                    "username": username,
                    "password": password,
                    "email": email,
                    "phoneNumber": phoneNumber,
                    "role": role,
                    "schoolId": schoolId
                }
            ]
        })
    } catch (error) {
        return NextResponse.json({
            status: 404,
            data: `Hiba történt: ${error}`
        })
    }
}