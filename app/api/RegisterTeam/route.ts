import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket, ResultSetHeader } from 'mysql2'; // Use ResultSetHeader instead of OkPacket
import pool from '@/app/libs/mysql';

type Member = {
    teamname: string;
    schoolName: string;
    teacherName: string;
    categoryName: string;
    languageName: string;
    status: 'Regisztrált' | 'Iskola által jóváhagyva' | 'Szervezők által jóváhagyva'; // Enum options for status
};

export async function POST(req: NextRequest) {
    try {
        const { teamname, schoolName, teacherName, categoryName, languageName, status } = (await req.json()) as Member;

        console.log('Received data:', { schoolName, categoryName, languageName });

        const db = await pool.getConnection();

        // Fetch the list of schools, categories, and languages from your APIs
        const [schoolsResponse, categoriesResponse, languagesResponse, userResponse] = await Promise.all([
            fetch('http://localhost:3000/api/schools'), // Adjust the URL as needed
            fetch('http://localhost:3000/api/categories'), // Adjust the URL as needed
            fetch('http://localhost:3000/api/languages'),
            fetch('http://localhost:3000/api/users') // Adjust the URL as needed
        ]);

        const schools = await schoolsResponse.json();
        const categories = await categoriesResponse.json();
        const languages = await languagesResponse.json();
        const users = await userResponse.json();

        // Find the school, category, and language IDs from the responses
        const school = schools.data.find((s: any) => s.name === schoolName);
        const category = categories.data.find((c: any) => c.name === categoryName);
        const language = languages.data.find((l: any) => l.name === languageName);
        const user = users.data.find((u: any) => u.name === teacherName)

        // Check if they were found
        if (!school) {
            throw new Error(`School with name '${schoolName}' not found`);
        }
        if (!category) {
            throw new Error(`Category with name '${categoryName}' not found`);
        }
        if (!language) {
            throw new Error(`Language with name '${languageName}' not found`);
        }
        if (!user) {
            throw new Error(`User with name '${user}' not found`);
        }

        const schoolId = school.id;
        const categoryId = category.id;
        const languageId = language.id;
        const teacher = user.id;

        // Insert into the members table
        const query = 'INSERT INTO teams (teamname, schoolId, teacher, categoryId, languageId, status) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [teamname, schoolId, teacher, categoryId, languageId, status]) as [ResultSetHeader, any[]];

        db.release();

        return NextResponse.json({
            status: 200,
            data: {
                id: result.insertId, // Now it's safe to access insertId
                teamname,
                schoolId,
                teacher,
                categoryId,
                languageId,
                status,
            },
        });
    } catch (error) {
        console.error('Error during user registration:', error);

        return NextResponse.json({
            status: 500,
            data: `An error occurred`,
        });
    }
}
