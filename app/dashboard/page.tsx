// // app/dashboard/page.tsx
// import { Suspense } from 'react'
// import ItemList from '@/components/ItemList'
// import AddItemForm from '@/components/AddItemForm'
// import SearchForm from '@/components/SearchForm'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export const dynamic = 'force-dynamic' // Force dynamic rendering for search

// async function getItems(search: string) {
//   try {
//     return await prisma.item.findMany({
//       where: {
//         OR: [
//           { name: { contains: search, mode: 'insensitive' } },
//           { location: { contains: search, mode: 'insensitive' } },
//         ],
//       },
//       orderBy: { createdAt: 'desc' },
//     })
//   } catch (error) {
//     console.error('Database query error:', error)
//     return []
//   }
// }

// export default async function Dashboard({
//   searchParams,
// }: {
//   searchParams: { search?: string }
// }) {
//   const search = searchParams?.search || ''
//   const items = await getItems(search)

//   return (
//     <div className="container mx-auto p-4 max-w-2xl">
//       <h1 className="text-3xl font-bold mb-8 text-center">Item Locator Dashboard</h1>
//       <div className="space-y-8">
//         <AddItemForm />
//         <SearchForm initialSearch={search} />
//         <Suspense
//           key={search}
//           fallback={
//             <div className="space-y-4">
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="h-24 animate-pulse bg-gray-100 rounded-lg" />
//               ))}
//             </div>
//           }
//         >
//           <ItemList initialItems={items} />
//         </Suspense>
//       </div>
//     </div>
//   )
// }

// app/dashboard/page.tsx
import { Suspense } from 'react';
import ItemList from '@/components/ItemList';
import AddItemForm from '@/components/AddItemForm';
import SearchForm from '@/components/SearchForm';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; // Force dynamic rendering for search

async function getItems(search: string) {
  try {
    return await prisma.item.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Database query error:', error);
    return [];
  }
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  // Await the searchParams before accessing its properties
  const { search } = (await searchParams) || {};
  const items = await getItems(search || '');

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Item Locator Dashboard</h1>
      <div className="space-y-8">
        <AddItemForm />
        <SearchForm initialSearch={search} />
        <Suspense
          key={search}
          fallback={
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 animate-pulse bg-gray-100 rounded-lg" />
              ))}
            </div>
          }
        >
          <ItemList initialItems={items} />
        </Suspense>
      </div>
    </div>
  );
}
