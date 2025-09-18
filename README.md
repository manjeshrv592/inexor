# INEXOR

A modern Next.js web application featuring an interactive world map for service location visualization and business information management.

## Features

### 🗺️ Interactive World Map
- **Dual-view system**: Continent view and detailed country view
- **Smooth transitions**: 750ms animated zoom transitions between views
- **Service location markers**: Visual indicators for countries with available services
- **Smart tooltips**: Cursor-following tooltips with service details (tax, duties, lead time)
- **Zoom-independent elements**: Consistent border widths and marker sizes at all zoom levels
- **Professional hover effects**: Subtle visual feedback without distracting animations

### 🎨 Modern UI/UX
- **Clean interface**: Minimal design with focus on content
- **Lucide icons**: Consistent iconography throughout the application
- **Responsive design**: Optimized for desktop and mobile devices
- **Smooth animations**: Professional transitions and hover effects

### 🔐 Authentication System
- **Conditional OTP**: Date-based OTP requirement configuration
- **Session management**: Inactivity timeout protection
- **Secure cookies**: Proper authentication state management

### 📊 Content Management
- **Sanity CMS integration**: Dynamic content management
- **Navigation management**: Configurable navigation items
- **SEO optimization**: Meta tags and structured data

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm/bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables (see ENV_SETUP.md)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── maps/              # Interactive world map components
│   ├── sections/          # Page sections
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
├── sanity/                # Sanity CMS configuration
└── styles/                # Global styles
```

## Maps Component

The interactive world map is the centerpiece of the application, featuring:

- **D3.js powered**: High-performance SVG-based rendering
- **Continent navigation**: Click continents to explore countries
- **Service visualization**: Orange markers and borders for service locations
- **Consistent scaling**: Elements maintain visual size across zoom levels
- **Professional interactions**: Clean hover effects and smooth transitions

For detailed maps documentation, see [src/components/maps/README.md](src/components/maps/README.md).

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Mapping**: D3.js (d3-geo, d3-zoom, d3-selection)
- **Styling**: Tailwind CSS, CSS Modules
- **Icons**: Lucide React
- **CMS**: Sanity
- **Authentication**: Custom JWT-based system

## Environment Configuration

The application uses environment variables for configuration. See `ENV_SETUP.md` for detailed setup instructions.

Key environment variables:
- `NEXT_PUBLIC_WEB_ACCESS_ENABLED`: Enable/disable authentication
- `NEXT_PUBLIC_OTP_AUTH_FROM`: Date from which OTP is required
- `NEXT_PUBLIC_SESSION_TIMEOUT`: Session timeout duration

## Deployment

The application is optimized for deployment on Vercel:

```bash
npm run build
npm run start
```

For other deployment platforms, ensure environment variables are properly configured.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [D3.js Documentation](https://d3js.org/) - Data visualization library
- [Sanity Documentation](https://www.sanity.io/docs) - Content management system
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
