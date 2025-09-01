import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

type Context = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, context: Context) {
  try {
    const { id } = context.params;
    await db.query('DELETE FROM schools WHERE id = ?', [id]);
    return NextResponse.json({ message: 'School deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete school', error: (error as Error).message },
      { status: 500 }
    );
  }
}
