import { db } from '@/lib/db'
import HomePageContent from './page-content'

export default async function Home() {
  const documents = await db.document.findMany()
  return <HomePageContent documents={documents} />
}
