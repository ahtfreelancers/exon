import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'berghan': ['Berghan Regular', 'sans-serif'],
      'openSans': ['OpenSans Regular', 'sans-serif'],
      'helvetica': ['Helvetica Now Display', 'sans-serif'],
    },
    variants: {
      extend: {
        textColor: ['hover'],
      },
    },
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        background: 'var(--background-color)',
        textSecondary: 'var(--text-secondary)',
      },
      screens: {
        'xsm': '430px',
        'sm': '560px',
        'md': '768px',
        'laptop': '992px',
        'lg': '1024px',
        'spbp': '1200px',
        'xl': '1440px',
        '2xl': '1536px',
        '3xl': '1700px',
      },
      backgroundImage: {
        'heroBg': "url('/home/hero.png')",
        'aboutBg': "url('/about/about-banner.png')",
        'solutionBg': "url('/about/solutions-about.png')",
        'mobHeroBg': "url('/home/mobHero.png')",
        'producthero': "url('/about/hero.png')",
      }
    },
  },
  plugins: [],
};
export default config;
