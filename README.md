# Web Developer Portfolio

A modern, professional, and fast-loading personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Material-UI.

## Features

- 🚀 **Next.js 14** with App Router
- ⚡ **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 📦 **Material-UI** for components
- 📱 **Fully Responsive** design
- 🔍 **SEO Optimized** with meta tags
- ♿ **Accessible** HTML structure
- 🎯 **Clean & Minimal** professional design

## Sections

1. **Hero Section** - Introduction with CTA buttons
2. **About Me** - Professional summary and highlights
3. **Skills** - Categorized skills with progress indicators
4. **Projects** - Project showcase with tech stack
5. **Experience** - Work history and contributions
6. **Contact** - Contact form and social links

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Personal Information

1. **Name & Role**: Edit `components/Hero.tsx`
2. **About Section**: Edit `components/About.tsx`
3. **Skills**: Edit `components/Skills.tsx`
4. **Projects**: Edit `components/Projects.tsx`
5. **Experience**: Edit `components/Experience.tsx`
6. **Social Links**: Edit `components/Contact.tsx` and `components/Footer.tsx`
7. **SEO Meta Tags**: Edit `app/layout.tsx`

### Styling

- **Colors**: Modify `tailwind.config.ts` to change the primary color scheme
- **Typography**: Adjust font sizes and weights in component files
- **Spacing**: Modify padding and margins in Tailwind classes

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with SEO
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Footer.tsx       # Footer component
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Skills.tsx       # Skills section
│   ├── Projects.tsx     # Projects section
│   ├── Experience.tsx   # Experience section
│   └── Contact.tsx      # Contact section
├── public/              # Static assets
└── package.json         # Dependencies
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Material-UI** - React component library
- **React** - UI library

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, feel free to reach out!

