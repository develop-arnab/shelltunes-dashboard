//src/pages/sitemap.xml.tsx
import fs from 'fs'
// import { getPosts } from '../services/getPosts'
// import { getTodos } from '../services/getTodos'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  const baseUrl = 'http://localhost:3000'
//   const postsData = await getPosts()

  // Collecting all dynamics urls
  // src/pages/posts/[id].tsx
//   const dynamicPostsPaths = postsData.map(post => {
//     return `${baseUrl}/posts/${post.id}`
//   })

  // static routes under src/pages
  const staticPages = fs
    .readdirSync('./src/pages')
    .filter(staticPage => {
      return ['index.tsx'].includes(staticPage)
    })
    .map(staticPagePath => {
      return `${baseUrl}/${staticPagePath}`
    })

  // creating collection of all routes
//   const allPaths = [...staticPages, ...dynamicPostsPaths]
const allPaths = [...staticPages]
  // creating sitemap structured object.
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPaths
          .map(url => {
            return `
            <url>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            `
          })
          .join('')}
    </urlset>
    `

  // setting header as xml
  res.setHeader('Content-Type', 'text/xml')

  // sending all sitemap in response object
  res.write(sitemap)

  // ending response
  res.end()

  // no need to return anything as we alreadying
  // required data from res.write()
  return {
    props: {}
  }
}

export default Sitemap
