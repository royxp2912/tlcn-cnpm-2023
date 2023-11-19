/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
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
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
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
                product2: '2px 2px 4px 0 rgba(38,38,38,0.25)',
            },
            fontFamily: {
                poppin: ['Poppins', 'sans-serif'],
                birsmark: ['Bismarck', 'sans-serif'],
                fb: ['Agency FB', 'sans-serif'],
                bak: ['Bakbak One', 'sans-serif'],
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
