# 🗺️ Viramap Website

Official website for Viramap - Advanced indoor mapping and navigation platform for enclosed environments.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

## Overview

Viramap is a comprehensive platform for indoor mapping and navigation in enclosed environments such as shopping malls, hospitals, airports, and large buildings. This website serves as the primary interface for showcasing Viramap's products, solutions, and services.

## Features

### 🎨 User Interface

- Modern, responsive design
- Dark mode support
- Smooth animations with Framer Motion
- Optimized images with Next.js Image
- Accessible UI components with Radix UI

### ⚡ Performance

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- Automatic code splitting and bundle optimization
- CSS optimization and compression

### 🔍 SEO

- Optimized meta tags
- Structured Data (JSON-LD)
- Automatic sitemap generation
- Robots.txt configuration
- Search engine optimization

### 🛡️ Security

- TypeScript for type safety
- Zod schema validation
- Secure headers configuration
- Protected sensitive files

## Tech Stack

### Core

- **Next.js 16.0.5** - React framework for production
- **React 18.3** - UI library
- **TypeScript 5** - Type safety

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Vendor prefixes

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Swiper** - Slider/carousel component

### Forms & Validation

- **React Hook Form** - Form management
- **Zod** - Schema validation

### Animation

- **Framer Motion** - Advanced animations

### Data Fetching

- **SWR** - Data fetching and caching

## Prerequisites

- **Node.js** 18.x or higher
- **Package Manager**: pnpm (recommended), npm, or yarn

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/viramap-website-app.git
cd viramap-website-app
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Configure the required values in `.env.local`.

### 4. Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
viramap-website-app/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── articles/          # Articles/blog
│   ├── platform/          # Platform page
│   ├── solutions/         # Solutions pages
│   ├── technologies/      # Technologies page
│   └── api/               # API routes
│
├── components/            # React components
│   ├── About/            # About page components
│   ├── ContactUs/        # Contact components
│   ├── Home/             # Home page components
│   ├── layout/           # Header and Footer
│   ├── lib/              # Utilities and helpers
│   └── ui/               # Base UI components
│
├── public/                # Static files
│   ├── images/          # Images
│   └── fonts/           # Fonts
│
├── scripts/              # Utility scripts
└── services/             # API services
```

## Available Scripts

### Development

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

### Maintenance

```bash
pnpm clean-cache      # Clean build caches
```

### Deployment

```bash
pnpm deploy           # Prepare for deployment
pnpm deploy:zip       # Prepare and create ZIP file
```

## Deployment

### Quick Deployment

```bash
pnpm deploy
```

This command:

- Builds the project
- Collects essential files
- Creates a `deploy` folder
- Generates deployment documentation

### Recommended Platforms

- **[Vercel](https://vercel.com/)** - Recommended for Next.js
- **[Netlify](https://www.netlify.com/)** - Great alternative
- **Custom server** - Using deployment scripts

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Development Guidelines

- Use **TypeScript** for all new files
- Run **ESLint** before committing
- Place components in the `components` directory
- Place pages in the `app` directory (App Router)
- Use **Tailwind CSS** for styling

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Check code with ESLint
- Use TypeScript
- Write clear comments
- Test your changes

## License

This project is licensed under the MIT License.

## Contact

- **Website**: [https://viramap.com](https://viramap.com)
- **Email**: info@viramap.com
- **GitHub**: [@viramap](https://github.com/viramap)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

<div align="center">

**Made with ❤️ by the Viramap Team**

</div>
