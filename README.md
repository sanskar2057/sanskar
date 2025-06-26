# Sanskar Dhungana - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing the work and skills of Sanskar Dhungana, a Full Stack Developer.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark/light mode toggle
- **Responsive**: Optimized for all devices from mobile to desktop
- **Interactive**: Smooth animations and micro-interactions using Framer Motion
- **Performance**: Built with Vite for fast development and optimized builds
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Type Safe**: Built with TypeScript for better development experience
- **Tested**: Comprehensive test suite using Vitest and Testing Library

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Build Tool**: Vite
- **Testing**: Vitest, Testing Library
- **Linting**: ESLint, Prettier
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── sections/        # Page sections (Hero, About, Skills, etc.)
│   ├── Navbar.tsx       # Navigation component
│   └── Footer.tsx       # Footer component
├── store/               # State management
│   └── themeStore.ts    # Theme state management
├── test/                # Test files
│   ├── components/      # Component tests
│   └── setup.ts         # Test setup configuration
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sanskar2057/portfolio
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` file as needed.

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

Build the project:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 🧪 Testing

Run tests:

```bash
npm run test
# or
yarn test
```

Run tests with UI:

```bash
npm run test:ui
# or
yarn test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## 🎨 Customization

### Theme

The theme can be customized by modifying the color variables in `tailwind.config.js` and `src/index.css`. The main accent color is `#C778DD` (purple).

### Content

Update the content in the respective section components:

- **Hero Section**: `src/components/sections/HeroSection.tsx`
- **About Section**: `src/components/sections/AboutSection.tsx`
- **Skills Section**: `src/components/sections/SkillsSection.tsx`
- **Projects Section**: `src/components/sections/WorksSection.tsx`
- **Contact Section**: `src/components/sections/ContactSection.tsx`

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to `src/App.tsx`
3. Update the navigation in `src/components/Navbar.tsx`

## 📱 Responsive Design

The portfolio is built with a mobile-first approach and includes:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

The portfolio includes:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

## 🚀 Deployment

The portfolio can be deployed to various platforms:

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Vercel

1. Connect your repository to Vercel
2. The build settings will be automatically detected
3. Deploy

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
3. Run: `npm run deploy`

## 🔧 Development Workflow

### Git Workflow

- `main`: Production-ready code
- `dev`: Development branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

### Code Quality

The project includes:

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **TypeScript**: Static type checking

### Pre-commit Hooks

Before each commit, the following checks run:

- ESLint for code quality
- Prettier for code formatting
- TypeScript compilation check
- Test execution

## 📊 Performance

The portfolio is optimized for performance:

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with code splitting
- **Images**: Lazy loading and optimization
- **Animations**: GPU-accelerated with Framer Motion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Sanskar Dhungana**

- Email: sanskar2057@gmail.com
- LinkedIn: [linkedin.com/in/sanskar-dhungana](https://www.linkedin.com/in/sanskar-dhungana)
- GitHub: [github.com/sanskar2057](https://github.com/sanskar2057)
- Phone: +977 986-1797766

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from [Lucide React](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by Sanskar Dhungana