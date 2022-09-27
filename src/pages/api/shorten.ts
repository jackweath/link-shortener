import { Redis } from '@upstash/redis';
import { generateSlug } from 'random-word-slugs';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const redis = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
    var { url } = request.query;
    if (Array.isArray(url)) {
        url = url[0];
    }
    for (var i = 0; i <= 5; i++) {
        const randSlug = generateSlug();
        var slugCheck = await redis.get(randSlug);
        if (slugCheck !== null) {
            redis.set(randSlug, url);
            return response.status(200).json({ slug: randSlug });
        }
    }
    return response.status(418).json({ error: 'Unknown error' });
}
