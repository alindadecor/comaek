// Cloudflare bindings – accessed via:
// import { getRequestContext } from '@cloudflare/next-on-pages'
// const { env } = getRequestContext()
// env.DB   → D1Database
// env.ASSETS → R2Bucket

interface CloudflareEnv {
    DB: D1Database;
    R2_STORAGE: R2Bucket;
}
