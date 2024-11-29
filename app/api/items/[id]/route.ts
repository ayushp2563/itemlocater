
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

// import { NextResponse, NextRequest } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function PUT(
//   request: NextRequest, 
//   context: { params: { id: string } }
// ) {
//     try {
//         const { id } = context.params;
//         const { name, location } = await request.json()
        
//         // Add input validation
//         if (!name || !location) {
//             return NextResponse.json(
//                 { error: 'Name and location are required' },
//                 { status: 400 }
//             );
//         }

//         const item = await prisma.item.update({
//             where: { id },
//             data: { name, location },
//         })
//         return NextResponse.json(item)
//     } catch (error) {
//         console.error('Update error:', error);
//         return NextResponse.json(
//             { error: 'Failed to update item', details: error instanceof Error ? error.message : 'Unknown error' },
//             { status: 500 }
//         )
//     }
// }

// export async function DELETE(
//   request: NextRequest, 
//   context: { params: { id: string } }
// ) {
//     try {
//         const { id } = context.params;
//         await prisma.item.delete({
//             where: { id },
//         })
//         return new NextResponse(null, { status: 204 })
//     } catch (error) {
//         console.error('Delete error:', error);
//         return NextResponse.json(
//             { error: 'Failed to delete item', details: error instanceof Error ? error.message : 'Unknown error' },
//             { status: 500 }
//         )
//     }
// }