import { draftMode, cookies } from 'next/headers'

const frontendOrigin = process.env.ORIGIN

export async function GET() {
  draftMode().enable()
  console.log('Fetch /test-bypass')

  const draftCookieName = '__prerender_bypass'
  const result = await fetch(`${frontendOrigin}/test-bypass`, {
    headers: {
      cookie: `${draftCookieName}=${cookies().get(draftCookieName)?.value}`,
    },
  })
  return result
}
