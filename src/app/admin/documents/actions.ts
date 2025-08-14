'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const DocumentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  length: z.string().min(1),
  format: z.string().min(1),
  icon: z.string().min(1),
  bestFor: z.string().min(1),
  filename: z.string().min(1),
  content: z.string().min(1),
})

export async function createDocument(formData: FormData) {
  const validatedFields = DocumentSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    length: formData.get('length'),
    format: formData.get('format'),
    icon: formData.get('icon'),
    bestFor: formData.get('bestFor'),
    filename: formData.get('filename'),
    content: formData.get('content'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await db.document.create({
      data: validatedFields.data,
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Document.',
    }
  }

  revalidatePath('/admin')
  redirect('/admin')
}

export async function updateDocument(id: string, formData: FormData) {
  const validatedFields = DocumentSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    length: formData.get('length'),
    format: formData.get('format'),
    icon: formData.get('icon'),
    bestFor: formData.get('bestFor'),
    filename: formData.get('filename'),
    content: formData.get('content'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await db.document.update({
      where: { id },
      data: validatedFields.data,
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Document.',
    }
  }

  revalidatePath('/admin')
  revalidatePath(`/admin/documents/${id}/edit`)
  redirect('/admin')
}

export async function deleteDocument(id: string) {
  try {
    await db.document.delete({
      where: { id },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Document.',
    }
  }

  revalidatePath('/admin')
}
