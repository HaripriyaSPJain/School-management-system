import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET: Fetch all schools
export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM schools');
    console.log('GET /api/schools - rows:', rows); // <-- Add this line
    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET /api/schools error:', error); // <-- Add this line
    return NextResponse.json(
      { message: 'Failed to fetch schools', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST: Add a new school
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('POST /api/schools - body:', body); // <-- Add this line

    const {
      name,
      address,
      city,
      state,
      contact,
      image = '',
      email_id = '',
      description = '',
      established = '',
      studentCount = '',
      facilities = [],
      achievements = [],
    } = body;

    if (!name || !address || !city || !state || !contact) {
      console.warn('POST /api/schools - missing required fields'); // <-- Add this line
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await db.query(
      `INSERT INTO schools 
        (name, address, city, state, contact, image, email_id, description, established, studentCount, facilities, achievements)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        address,
        city,
        state,
        contact,
        image,
        email_id,
        description,
        established,
        studentCount,
        JSON.stringify(facilities),
        JSON.stringify(achievements),
      ]
    );

    console.log('POST /api/schools - insert successful'); // <-- Add this line
    return NextResponse.json({ message: 'School added successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/schools error:', error); // <-- Add this line
    return NextResponse.json(
      { message: 'Failed to add school', error: (error as Error).message },
      { status: 500 }
    );
  }
}