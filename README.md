# Ade Portfolio

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.


## Features

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - GSAP ScrollTrigger animations throughout
- **Modern Stack** - React + TypeScript + Vite + Tailwind CSS
- **Dark Theme** - Bold black and red aesthetic
- **Sections Included:**
  - Hero with animated background
  - Awards & Recognition with counters
  - About Me with stats
  - Projects gallery (horizontal scroll on desktop)
  - Services grid
  - Testimonials carousel
  - Blog section
  - Contact form with social links

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** GSAP + ScrollTrigger
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/ade-portfolio.git
cd ade-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── public/              # Static assets (images)
├── src/
│   ├── sections/        # Page sections (Hero, About, Projects, etc.)
│   ├── components/ui/   # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Customization

### Update Personal Information

1. **Name & Branding** - Edit `src/sections/Navigation.tsx` and `src/sections/Footer.tsx`
2. **Hero Section** - Edit `src/sections/Hero.tsx`
3. **About Section** - Edit `src/sections/About.tsx`
4. **Projects** - Edit `src/sections/Projects.tsx`
5. **Testimonials** - Edit `src/sections/Testimonials.tsx`
6. **Contact Info** - Edit `src/sections/Footer.tsx`

### Update Images

Replace images in the `public/` folder:
- `about-portrait.jpg` - Your profile photo
- `project-1.jpg` to `project-4.jpg` - Project screenshots
- `testimonial-1.jpg` to `testimonial-3.jpg` - Client photos
- `blog-1.jpg` to `blog-3.jpg` - Blog post images

### Change Colors

Edit the color variables in `src/index.css`:

```css
--primary: 0 100% 50%;        /* Red accent */
--background: 0 0% 0%;        /* Black background */
```

## Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
npm run build
# Copy dist contents to gh-pages branch
```

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

- Design & Development: Ade
- Icons: [Lucide](https://lucide.dev/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Animations: [GSAP](https://greensock.com/gsap/)
# ade-portfolio
