import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const items = await prisma.item.findMany({
        where: {
            OR: [
                { name: { contains: search || '', mode: 'insensitive' } },
                { location: { contains: search || '', mode: 'insensitive' } },
            ],
        },
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(items)
}

export async function POST(request: Request) {
    const { name, location } = await request.json()

    const item = await prisma.item.create({
        data: { name, location },
    })

    return NextResponse.json(item)
}

// app/api/items/search/route.ts
// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url)
//     const search = searchParams.get('search') || ''

//     try {
//         const items = await prisma.item.findMany({
//             where: {
//                 OR: [
//                     { name: { contains: search, mode: 'insensitive' } },
//                     { location: { contains: search, mode: 'insensitive' } },
//                 ],
//             },
//             orderBy: { createdAt: 'desc' },
//         })

//         return NextResponse.json(items)
//     } catch (error) {
//         console.error('Search error:', error)
//         return NextResponse.json({ error: 'Failed to search items' }, { status: 500 })
//     }
// }