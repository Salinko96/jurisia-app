# JurisIA - AI-Powered Legal Research Assistant

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="JurisIA Banner" width="100%" />
  <p><strong>Simplifying Legal Research with AI</strong></p>
</div>

---

## Overview

**JurisIA** is an intelligent legal research assistant built with **Google Gemini AI** and a modern web interface. It helps legal professionals, students, and researchers quickly find relevant case law, statutes, and legal precedents through natural language queries.

### Key Features

- 🤖 **AI-Powered Search**: Uses Google Gemini API for intelligent legal document analysis
- 📚 **Case Law Database**: Access to organized legal precedents and statutes
- ⚡ **Fast & Accurate**: Retrieve relevant legal information in seconds
- 🎨 **Modern UI**: Clean, responsive interface built with React & TypeScript
- 🔐 **Secure API Integration**: Safe handling of Gemini API credentials
- 📱 **Mobile Friendly**: Works seamlessly on desktop and mobile devices

---

## Tech Stack

| Technology | Purpose |
|------------|----------|
| **React 18** | UI Framework |
| **TypeScript** | Type-safe development |
| **Vite** | Build tool & dev server |
| **Google Gemini API** | AI Processing |
| **Node.js** | Runtime environment |

---

## Project Structure

```
jurisia-app/
├── components/          # React components for UI
│   ├── SearchBar.tsx   # Search input interface
│   ├── ResultsList.tsx # Display search results
│   └── ...            # Other UI components
├── services/           # API integrations
│   ├── geminiService.ts   # Gemini API calls
│   └── ...            # Other services
├── types.ts           # TypeScript type definitions
├── constants.tsx      # App-wide constants
├── App.tsx            # Main app component
├── index.tsx          # Entry point
├── schema.sql         # Database schema (if applicable)
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
├── vite.config.ts     # Vite config
└── README.md          # This file
```

---

## Installation

### Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Gemini API Key** ([Get one](https://makersuite.google.com/app/apikey))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Salinko96/jurisia-app.git
   cd jurisia-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > Replace `your_gemini_api_key_here` with your actual Gemini API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Visit `http://localhost:5173` (or the URL shown in terminal)

---

## Usage

### Running the App

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Using JurisIA

1. Open the app in your browser
2. Enter a legal question or search term in the search bar
3. Click "Search" or press Enter
4. Review AI-generated results with relevant case law and statutes
5. Click on results for more details

---

## Environment Variables

Create a `.env.local` file with the following:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

**Required:** Yes  
**Default:** None

---

## Development

### Scripts

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview built app
npm run preview

# Type checking
npx tsc --noEmit
```

### Adding New Components

1. Create component file in `components/`
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Export from component index if needed

---

## Deployment

### Deploy to Google AI Studio

Your app is already configured for Google AI Studio:  
👉 [View on AI Studio](https://ai.studio/apps/drive/1S3C7L0RW8mRHhXSeSc_Q0QK9gcZXr7kA)

### Deploy to Other Platforms

#### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Option 2: Netlify
```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

#### Option 3: Railway / Render
1. Connect your GitHub repo
2. Set environment variables
3. Deploy automatically on push

---

## API Documentation

### Gemini API

The app uses Google Gemini API for AI processing:

- **Endpoint**: `api.generativeai.google.com`
- **Auth**: API Key in `.env.local`
- **Models**: `gemini-pro` (or latest stable)

See `services/geminiService.ts` for implementation details.

---

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## Support

### Having Issues?

- 📖 Check the [FAQ](#faq) section
- 🐛 Report bugs on [GitHub Issues](https://github.com/Salinko96/jurisia-app/issues)
- 💬 Join our [Discussions](https://github.com/Salinko96/jurisia-app/discussions)

### Getting Help

- **Documentation**: See `docs/` folder
- **API Docs**: Check Gemini AI [official docs](https://ai.google.dev/)
- **TypeScript**: [Learn TypeScript](https://www.typescriptlang.org/)

---

## FAQ

**Q: Do I need a Gemini API key?**  
A: Yes, you need a free API key from Google AI Studio to use the AI features.

**Q: Can I use this for commercial purposes?**  
A: Check the LICENSE file. You may need to comply with Gemini API terms.

**Q: How do I update dependencies?**  
A: Run `npm update` to get the latest versions.

---

## Roadmap

- [ ] Multi-language support (French, Spanish, etc.)
- [ ] Advanced search filters
- [ ] Case law history tracking
- [ ] Citation generator (APA, MLA, Harvard)
- [ ] User accounts & saved searches
- [ ] Mobile app (React Native)
- [ ] Database integration for offline access
- [ ] Export to PDF/Word

---

## Author

👤 **Salinko96**

- GitHub: [@Salinko96](https://github.com/Salinko96)
- 📧 Contact: via GitHub Issues

---

## Acknowledgments

- 🤝 Google Gemini API for AI capabilities
- ⚛️ React community for amazing tools
- 📚 Legal professionals for inspiration

---

## Status

![GitHub last commit](https://img.shields.io/github/last-commit/Salinko96/jurisia-app)  
![GitHub license](https://img.shields.io/github/license/Salinko96/jurisia-app)  
![GitHub repo size](https://img.shields.io/github/repo-size/Salinko96/jurisia-app)

---

**Made with ❤️ for legal professionals**
