/** @type {import('next-sitemap').IConfig} */

const SITE_URL = 'https://ztlog.io';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8086';
const ITEMS_PER_PAGE = 5;

async function fetchAllContentIds() {
  try {
    const firstRes = await fetch(`${BACKEND_URL}/front/api/v1/contents?page=1`);
    if (!firstRes.ok) return [];

    const firstData = await firstRes.json();
    const { list = [], totalCount = 0 } = firstData?.data || {};

    if (totalCount <= ITEMS_PER_PAGE) return list;

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const requests = Array.from({ length: totalPages - 1 }, (_, i) =>
      fetch(`${BACKEND_URL}/front/api/v1/contents?page=${i + 2}`)
        .then((res) => (res.ok ? res.json() : null))
    );

    const results = await Promise.all(requests);
    const all = [...list];
    for (const result of results) {
      if (result?.data?.list) all.push(...result.data.list);
    }
    return all;
  } catch {
    return [];
  }
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  exclude: ['/front/api/*'],
  additionalPaths: async () => {
    const contents = await fetchAllContentIds();
    return contents.map((content) => ({
      loc: `/contents/${content.ctntNo}`,
      lastmod: content.inpDttm ? new Date(content.inpDttm).toISOString() : undefined,
      changefreq: 'monthly',
      priority: 0.8,
    }));
  },
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/about': 0.5,
      '/search': 0.4,
    };
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
