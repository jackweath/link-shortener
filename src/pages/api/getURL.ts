import { Redis } from '@upstash/redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const redis = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
    var { slug } = request.query;
    if (Array.isArray(slug)) {
        slug = slug[0];
    }
    const url = await redis.get(slug);
    if (url === null) {
        return response.status(418).json({ error: 'URL not found' });
    }
    return response.status(200).json({ url: url });
}
