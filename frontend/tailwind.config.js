/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    // corePlugins: {
    //     preflight: false,
    // },
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    important: true,
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                gray: '#979797',
                'white-60': '#9a9ca1',
                orange: '#FB4B29',
                bg: '#1B212C',
                input: '#E0E0E0',
                black: '#2B2B2B',
                size: '#3a4046',
                pink: '#d081a5',
                money: '#FF952D',
                bg_sell: '#f6f6f6',
                gray2: '#E5E8EA',
                blue: '#33a0ff',
                star: '#E4E4E4',
                rv: '#C1C8CE',
                size2: '#99D0FF',
                buy: '#EBF6FF',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
