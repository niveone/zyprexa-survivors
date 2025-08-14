import { createDocument } from '@/app/admin/documents/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function NewDocumentPage() {
  return (
    <form action={createDocument} className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">New Document</h1>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div>
        <Label htmlFor="length">Length</Label>
        <Input id="length" name="length" required />
      </div>
      <div>
        <Label htmlFor="format">Format</Label>
        <Input id="format" name="format" required />
      </div>
      <div>
        <Label htmlFor="icon">Icon</Label>
        <Input id="icon" name="icon" required />
      </div>
      <div>
        <Label htmlFor="bestFor">Best For</Label>
        <Input id="bestFor" name="bestFor" required />
      </div>
      <div>
        <Label htmlFor="filename">Filename</Label>
        <Input id="filename" name="filename" required />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" required rows={10} />
      </div>
      <Button type="submit">Create Document</Button>
    </form>
  )
}
