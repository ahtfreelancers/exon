/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.exontherapeutics.com/',
    generateRobotsTxt: true, // generates both sitemap.xml and robots.txt
    exclude: ['/exon-admin/*'], // optional: exclude private pages
  };
  