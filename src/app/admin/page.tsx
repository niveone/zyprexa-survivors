import { db } from '@/lib/db'
import Link from 'next/link'
import { deleteDocument } from './documents/actions'
import { Button } from '@/components/ui/button'

export default async function AdminPage() {
  const documents = await db.document.findMany()

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin - Documents</h1>
        <Link href="/admin/documents/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          New Document
        </Link>
      </div>
      <ul className="mt-4 space-y-2">
        {documents.map((doc) => (
          <li key={doc.id} className="flex justify-between items-center p-2 border rounded">
            <span>{doc.title}</span>
            <div className="flex items-center gap-2">
              <Link href={`/admin/documents/${doc.id}/edit`} className="text-blue-500 hover:underline">
                Edit
              </Link>
              <form action={deleteDocument.bind(null, doc.id)}>
                <Button type="submit" variant="destructive" size="sm">Delete</Button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
