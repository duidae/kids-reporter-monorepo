import { promises as fs } from 'fs'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { ContentType, PREVIEW_SECRET_PATH } from '@/app/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')
  const requestSecret = searchParams.get('secret')
  const isValidType = type === ContentType.ARTICLE || type === ContentType.TOPIC

  let secretValue
  try {
    secretValue = await fs.readFile(PREVIEW_SECRET_PATH, {
      encoding: 'utf8',
    })
  } catch (err) {
    console.error('Failed to read secret!', err)
  }

  const isValidSecret =
    requestSecret && secretValue && requestSecret === secretValue
  if (!isValidSecret || !isValidType || !slug) {
    console.log('Get preview failed!', type, slug)
    redirect('/not-found')
  }

  draftMode().enable()
  const path = `/${type}/${slug}`
  console.log('Redirect for preview to', path)
  redirect(path)
}