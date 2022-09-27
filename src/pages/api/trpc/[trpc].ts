// [trpc].ts
import { createAstroTRPCApiHandler } from 'astro-trpc';
import * as trpc from '@trpc/server';
import { Redis } from '@upstash/redis';
import { z } from 'zod';
import { generateSlug } from 'random-word-slugs';

const redis = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN
});

// the tRPC router
export const appRouter = trpc
    .router()
    .query('greeting', {
        input: z
            .object({
                name: z.string().nullish()
            })
            .nullish(),
        resolve({ input }) {
            return {
                greeting: `hello ${input?.name ?? 'world!'}`
            };
        }
    })
    .query('getSlug', {
        input: z.object({
            slug: z.string()
        }),
        async resolve({ input }) {
            const url = redis.get(input.slug);
            if (url !== null) {
                return { url: url };
            } else {
                return { url: '' };
            }
        }
    })
    .mutation('setSlug', {
        input: z.object({
            url: z.string().url()
        }),
        async resolve({ input }) {
            for (var i = 0; i <= 5; i++) {
                const newSlug = generateSlug();
                var slugCheck = await redis.get(newSlug);
                if (slugCheck !== null) {
                    redis.set(newSlug, input.url);
                    return { slug: newSlug };
                }
            }
            return { slug: 'ERROR' };
        }
    });

// type definition of the router
export type AppRouter = typeof appRouter;

// API handler
export const all = createAstroTRPCApiHandler({
    router: appRouter,
    createContext: () => null
});
