import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: Record<string, string> }) {
    const id = params.id;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const { name, location } = await request.json();

        if (!name || !location) {
            return NextResponse.json(
                { error: 'Both "name" and "location" are required fields' },
                { status: 400 }
            );
        }

        const item = await prisma.item.update({
            where: { id },
            data: { name, location },
        });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error updating item:', error);

        if (error === 'P2025') {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(request: Request, { params }: { params: Record<string, string> }) {
    const id = params.id;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        await prisma.item.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting item:', error);

        if (error === 'P2025') {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
