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

import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type RouteContext = {
    params: Promise<{
        id: string
    }>
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const { name, location } = await request.json()
        const item = await prisma.item.update({
            where: { id: params.id },
            data: { name, location },
        })
        return NextResponse.json(item)
    } catch {
        return NextResponse.json(
            { error: 'Failed to update item' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, props: RouteContext) {
    const params = await props.params;
    try {
        await prisma.item.delete({
            where: { id: params.id },
        })
        return new NextResponse(null, { status: 204 })
    } catch {
        return NextResponse.json(
            { error: 'Failed to delete item' },
            { status: 500 }
        )
    }
}