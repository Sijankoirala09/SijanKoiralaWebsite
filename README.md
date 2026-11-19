# Sijan Koirala — Graphic Designer Portfolio

A minimalist, high-performance portfolio website built with an **Apple-inspired dark aesthetic**, crafted with clean vanilla **HTML5, CSS3, and JavaScript**.

Ready for instant deployment to **GitHub Pages**.

---

## ✦ Features

- **Apple Dark Aesthetic:** Sleek typography (-apple-system / SF Pro style), deep black backgrounds (`#000000`), frosted glass navigation (`backdrop-filter: blur`), subtle ambient glows, and clean hairline borders.
- **Hero Statement:** Prominently introduces Sijan: *"Hey, I'm Sijan. A graphic designer from Nepal."*
- **Curated Projects Showcase:**
  - Interactive category filtering (*All*, *Branding*, *Editorial*, *Packaging*, *3D & Visual*).
  - Built-in Apple-style modal lightbox to preview project details.
  - High-res vector artwork assets included in `assets/projects/`.
- **Apple Bento Grid ("About" Section):**
  - Story blending Nepalese cultural inspiration with minimalist Swiss design.
  - Interactive skill chips and creative tool stack (Illustrator, Photoshop, InDesign, Figma, Blender).
- **Services Breakdown:** Clear overview of brand identity, editorial print, packaging, and digital art direction offerings.
- **Contact & Micro-Interactions:**
  - Interactive one-click **"Copy Email"** button with a smooth animated toast notification.
  - Direct mail link and social links (Behance, Dribbble, Instagram, LinkedIn, GitHub).
  - Smooth interactive mouse spotlight following the cursor on desktop.
  - Fluid mobile navigation drawer.

---

## 🚀 How to Deploy on GitHub Pages

1. Commit and push the repository to GitHub:
   ```bash
   git add .
   git commit -m "Create Apple-style portfolio website"
   git push origin main
   ```
2. On GitHub, navigate to your repository:
   - Click **Settings** (tab at the top).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
3. Within 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/SijanKoiralaWebsite/`

---

## 🛠 File Structure

```
SijanKoiralaWebsite/
├── index.html            # Main webpage (GitHub Pages entry point)
├── style.css             # Apple dark design tokens, bento grid & responsive styles
├── script.js             # Filter, modal lightbox, cursor glow & copy email logic
├── README.md             # Documentation & deployment guide
└── assets/
    ├── favicon.svg       # Custom SK Monogram dark favicon
    ├── avatar.svg        # Personal branding avatar badge
    └── projects/         # Visual portfolio project covers (SVG)
        ├── project-1.svg # Luminary Architects Brand Identity
        ├── project-2.svg # Himalaya Editorial Poster Series
        ├── project-3.svg # Aura Audio Labs Visual Identity
        ├── project-4.svg # Kavya Botanicals Packaging
        ├── project-5.svg # Nexus 3D Art Direction
        └── project-6.svg # Monolith Archive Catalogue
```

---

## 🎨 How to Customize

- **Change Email:** Search for `sijankoirala.design@gmail.com` in [index.html](file:///Users/sijan/Documents/GitHub/SijanKoiralaWebsite/index.html) and [script.js](file:///Users/sijan/Documents/GitHub/SijanKoiralaWebsite/script.js) and replace it with your actual email address.
- **Add Your Real Project Images:** Drop your `.jpg`, `.png`, or `.webp` project images into `assets/projects/` and update the `src` attribute in [index.html](file:///Users/sijan/Documents/GitHub/SijanKoiralaWebsite/index.html) and the `projectDetails` object in [script.js](file:///Users/sijan/Documents/GitHub/SijanKoiralaWebsite/script.js).
- **Social Handles:** Update the social link URLs in the `#contact` section of [index.html](file:///Users/sijan/Documents/GitHub/SijanKoiralaWebsite/index.html).
