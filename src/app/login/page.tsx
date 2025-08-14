'use client'

import { authenticate } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <div className="flex items-center justify-center h-screen">
      <form action={dispatch} className="space-y-4 p-4 border rounded-lg">
        <h1 className="text-2xl font-bold">Login</h1>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">Login</Button>
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </form>
    </div>
  )
}
