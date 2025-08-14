import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { updateDocument } from '@/app/admin/documents/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default async function EditDocumentPage({ params }: { params: { id: string } }) {
  const document = await db.document.findUnique({
    where: { id: params.id },
  })

  if (!document) {
    notFound()
  }

  const updateDocumentWithId = updateDocument.bind(null, document.id)

  return (
    <form action={updateDocumentWithId} className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Edit Document</h1>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={document.title} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={document.description} required />
      </div>
      <div>
        <Label htmlFor="length">Length</Label>
        <Input id="length" name="length" defaultValue={document.length} required />
      </div>
      <div>
        <Label htmlFor="format">Format</Label>
        <Input id="format" name="format" defaultValue={document.format} required />
      </div>
      <div>
        <Label htmlFor="icon">Icon</Label>
        <Input id="icon" name="icon" defaultValue={document.icon} required />
      </div>
      <div>
        <Label htmlFor="bestFor">Best For</Label>
        <Input id="bestFor" name="bestFor" defaultValue={document.bestFor} required />
      </div>
      <div>
        <Label htmlFor="filename">Filename</Label>
        <Input id="filename" name="filename" defaultValue={document.filename} required />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" defaultValue={document.content} required rows={10} />
      </div>
      <Button type="submit">Update Document</Button>
    </form>
  )
}
