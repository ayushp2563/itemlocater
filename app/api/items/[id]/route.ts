// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//     const { name, location } = await request.json()
//     const item = await prisma.item.update({
//         where: { id: params.id },
//         data: { name, location },
//     })
//     return NextResponse.json(item)
// }

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//     await prisma.item.delete({
//         where: { id: params.id },
//     })
//     return new NextResponse(null, { status: 204 })
// }

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const { name, location } = await request.json();

        // Validate the request body
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
    } catch (error: unknown) {
        console.error('Error updating item:', error);

        if (error === 'P2025') {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

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
