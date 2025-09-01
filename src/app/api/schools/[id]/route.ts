import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await db.query('DELETE FROM schools WHERE id = ?', [id]);
    return NextResponse.json({ message: 'School deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete school', error: (error as Error).message },
      { status: 500 }
    );
  }
}