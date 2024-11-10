import pool from '@/app/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ data: 'date parameter is required' }, { status: 400 });
    }

    const db = await pool.getConnection();
    let query;


    if (date === "startDate") {
      query = 'SELECT startDate FROM registerdeadline';
    } else if (date === "closeDate") {
      query = 'SELECT closeDate FROM registerdeadline';
    } else {
      return NextResponse.json({ data: 'Invalid date parameter' }, { status: 400 });
    }

    const [rows] = await db.execute(query) as [Array<{ startDate: number | null; closeDate: number | null }>, any];


    db.release();

    const dateValue = rows[0]?.[date as 'startDate' | 'closeDate'];

    if (!dateValue) {
      return NextResponse.json({ data: `No data found for ${date}` }, { status: 404 });
    }

    const formattedDate = new Date(dateValue).toISOString().replace("T", " ").split(".")[0];

    return NextResponse.json({
      status: 200,
      data: formattedDate
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: `Error: ${error}`
    });
  }

}

