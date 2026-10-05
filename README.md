# Yahya Sameeh P P — Personal Portfolio

An ultra-dark, minimalist bento-grid personal portfolio website inspired by high-end design engineering portfolios (clean typographic hierarchy, matte surfaces, subtle micro-interactions, smooth page transitions).

---

## Visual & Technical Highlights

- **Visual Theme & Aesthetics**: Deep matte black canvas (`#080808`), elevated dark container surfaces (`#121214`), hairline borders (`rgba(255, 255, 255, 0.08)`), and soft 24px rounded corners (`rounded-3xl`).
- **Cinematic Texture**: Subtle CSS fractal noise film grain overlay across the entire viewport.
- **Micro-Interactions**:
  - Spotlight cursor illumination on every Bento card.
  - Live local clock for **Edappatta, Kerala (Asia/Kolkata - IST)** with animated emerald pulse indicator.
  - Interactive diagonal arrow hover lifts (`↗`).
  - Seamless page transitions.
- **Performance**: Zero-runtime bundle penalty, sub-second First Contentful Paint, optimized for Netlify Edge hosting.

---

## File Structure

```
├── index.html              # Main Home screen (Interactive Bento Grid layout)
├── about.html              # Subpage: About, bio, principles & technical timeline
├── portfolio.html          # Subpage: Selected projects, mockups & technical tags
├── contact.html            # Subpage: Contact split-screen with dark form
├── resume.html             # Subpage: Minimalist CV view with print styles
├── 404.html                # Custom 404 error page
├── _redirects              # Netlify clean URL rules and 404 routing
├── netlify.toml            # Netlify build and security headers configuration
└── assets/
    ├── css/
    │   └── styles.css      # Custom styling, noise grain, spotlight & animations
    ├── js/
    │   └── main.js         # IST clock, spotlight logic, form & nav interactions
    └── images/
        ├── portrait.jpg    # Monochromatic studio portrait
        ├── api_lab.jpg     # API Learning Lab mockup
        └── cyber_sec.jpg   # Cybersecurity Showcase mockup
```

---

## Git Initialization & Remote Setup

To link this repository to your target GitHub repository (`https://github.com/yahyasameeh1111/portfolio-3.git`) and deploy to Netlify:

```bash
# 1. Initialize git repository
git init

# 2. Add all files to staging
git add .

# 3. Create initial commit
git commit -m "feat: ultra-dark minimalist bento portfolio for Yahya Sameeh"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub remote repository
git remote add origin https://github.com/yahyasameeh1111/portfolio-3.git

# 6. Push to GitHub
git push -u origin main
```

---

## Continuous Deployment to Netlify

### Option A: Via Netlify Web Dashboard (Recommended)
1. Go to [Netlify](https://app.netlify.com/) and log in.
2. Click **"Add new site"** > **"Import an existing project"**.
3. Choose **GitHub** and authorize access.
4. Select `yahyasameeh1111/portfolio-3`.
5. Netlify will auto-detect settings from `netlify.toml`:
   - **Publish directory**: `.` (or root)
   - **Build command**: *(leave blank)*
6. Click **Deploy Site**. Every future push to `main` will automatically build and deploy within seconds!

### Option B: Via Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login and deploy
netlify login
netlify init
```

---

## License & Credits
© 2026 Yahya Sameeh P P. All rights reserved.
