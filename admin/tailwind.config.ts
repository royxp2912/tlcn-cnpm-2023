import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                blue: '#33a0ff',
                black: '#262626',
                red: '#FF4747',
                pink: '#FF69B4',
                green: '#00BE98',
                product: '#f6f6f6',
                orange: '#FF952D',
            },
            boxShadow: {
                nav: '2px 0 1px 0 rgba(0,0,0,0.1)',
                header: '0 2px 1px 0 rgba(0,0,0,0.1)',
                revenue: '2px 2px 1px 0 rgba(38,38,38,0.1)',
                order: '1px 2px 6px 0 rgba(38,38,38,0.2)',
                product: '2px 2px 2px 0 rgba(38,38,38,0.2)',
                cate: '2px 2px 2px 0 rgba(38,38,38,0.25)',
                cate2: '1px 1px 2px 0 rgba(38,38,38,0.2)',
            },
        },
    },
    plugins: [],
};
export default config;
