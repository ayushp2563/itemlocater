import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { name, location } = await request.json()
    const item = await prisma.item.update({
        where: { id: params.id },
        data: { name, location },
    })
    return NextResponse.json(item)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await prisma.item.delete({
        where: { id: params.id },
    })
    return new NextResponse(null, { status: 204 })
}