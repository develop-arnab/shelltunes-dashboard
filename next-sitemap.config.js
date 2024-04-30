module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://shelltunes.com',
  generateRobotsTxt: true,
  exclude: [
    '/account-settings',
    '/cards',
    '/form-layouts',
    '/icons',
    '/tables',
    '/typography',
    '/401',
    '/error',
    '/login',
    '/register',
    '/old_sitemap.xml'
  ],
  priority: 1
}
