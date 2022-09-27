/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.25s',
                'fade-out': 'fadeOut 0.25s',
                'fade-in-out': 'fadeIn 0.25s ease-in-out fadeOut 0.25s ease-in-out'
            },
            keyframes: () => ({
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                },
                fadeOut: {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 }
                }
            })
        }
    },
    plugins: []
};
