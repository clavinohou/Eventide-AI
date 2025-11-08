# CAL-MGR Landing App

A modern, responsive marketing website for CAL-MGR built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local as needed (optional for local development)
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
web/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # Reusable React components
│   └── Button.tsx         # Button component with variants
├── lib/                   # Utility functions and constants
│   ├── utils.ts           # Helper functions
│   ├── constants.ts       # App-wide constants
│   └── types.ts           # TypeScript type definitions
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc             # Prettier configuration
└── .gitignore             # Git ignore rules
```

## 🎨 Design System

### Colors

The app uses a comprehensive color palette defined in `tailwind.config.ts`:

- **Primary** (Blue): Primary actions and brand color
- **Secondary** (Purple): Secondary actions and accents
- **Accent** (Orange): Highlights and calls-to-action
- **Neutral** (Gray): Text, backgrounds, and borders
- **Semantic**: Success (green), Warning (yellow), Error (red)

### Typography

- **Fonts**: Geist Sans (primary), Geist Mono (code)
- **Font source**: Google Fonts
- **Scales**: Display (lg/md/sm), Heading (lg/md/sm), Body (lg/md/sm), Label

### Components

- **Button**: Multiple variants (primary, secondary, outline, ghost) and sizes (sm, md, lg)
- **Container**: Responsive max-width container with centered layout
- **Grid**: Responsive grid system (1 column mobile → 3 columns desktop)

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

### Code Style

- **ESLint**: Enforces code quality using Next.js recommended rules
- **Prettier**: Auto-formats code on save
- **TypeScript**: Strict type checking enabled

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001` |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO | `http://localhost:3000` |

## 📦 Key Dependencies

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 3**: Utility-first CSS framework
- **@tailwindcss/forms**: Form styling plugin
- **@tailwindcss/typography**: Typography plugin
- **PostCSS & Autoprefixer**: CSS processing

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

The build output will be in `.next/` directory.

### Environment for Production

Create a `.env.local` file with production values:

```bash
NEXT_PUBLIC_API_URL=https://api.cal-mgr.app
NEXT_PUBLIC_SITE_URL=https://cal-mgr.app
```

### Hosting Options

- **Vercel** (recommended): Push to git and auto-deploy
- **Docker**: See root-level Docker configuration
- **Traditional**: Deploy `.next/` to any Node.js server

## 🔗 Integration with Backend

The landing app can communicate with the CAL-MGR backend API:

- **Extract endpoint**: `POST /extract` - Process flyers/URLs/text
- **Save endpoint**: `POST /save` - Save events to Google Calendar
- **Health endpoint**: `GET /health` - Backend health check

Configure the backend URL in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📱 Responsive Design

The landing page is fully responsive:

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Touch-friendly** buttons and interactive elements
- **Performance**: Optimized images and lazy loading

## 🧪 Testing

(Testing setup to be added)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

## 📄 License

Proprietary - CAL-MGR Project

## 🤝 Contributing

For contribution guidelines, see the root [README.md](../README.md)
