import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        dark: '#1F2937',
        light: '#F3F4F6',
        border: '#E5E7EB',
        success: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '90rem',  // 1440px gibi özel tanımlar
        'content-container': '1280px', // Özel sınıf ismiyle
      },
    },
  },
  plugins: [],
  corePlugins: {
    scrollBehavior: true,
  },
}

export default config
