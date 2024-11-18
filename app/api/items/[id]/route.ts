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

import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// In Next.js 15, route handlers use a different type signature
export async function PUT(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const { name, location } = await req.json()
        const item = await prisma.item.update({
            where: { id: context.params.id },
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

export async function DELETE(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        await prisma.item.delete({
            where: { id: context.params.id },
        })
        return new NextResponse(null, { status: 204 })
    } catch {
        return NextResponse.json(
            { error: 'Failed to delete item' },
            { status: 500 }
        )
    }
}