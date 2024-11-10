import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/app/libs/mysql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, schoolName, city, contactEmail } = req.body;

    if (!username || !password || !schoolName || !city || !contactEmail) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Insert the school with its name and city
      const [schoolResult] = await pool.query(
        'INSERT INTO schools (name, city) VALUES (?, ?)',
        [schoolName, city]
      );
      const schoolId = (schoolResult as any).insertId;

      // Insert the principal as a user, using their username as the name
      const [userResult] = await pool.query(
        'INSERT INTO users (username, password, email, role, schoolId, name) VALUES (?, ?, ?, ?, ?, ?)',
        [username, password, contactEmail, 'Igazgató', schoolId, username]  // Using the username as the principal's name
      );

      const principalId = (userResult as any).insertId;

      // Update the school's record with the principal's ID
      await pool.query('UPDATE schools SET principal = ? WHERE id = ?', [principalId, schoolId]);

      // Return success response with full data
      return res.status(200).json({
        message: 'School and principal registered successfully',
        data: {
          schoolId,
          schoolName,
          city,
          principal: username,  // Returning the principal's username
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while registering the school' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
