# webpage_company

Website for an AI hardware engineering company: AI chip design, NPU architecture,
FPGA acceleration, ASIC/RTL design and edge AI optimization.

**Main message of the site:** *We help companies turn AI models into efficient,
high-performance hardware.*

The site is plain HTML, CSS and JavaScript. There is no framework, no build step
and nothing to install. Open `index.html` in a browser and it works.

---

## 1. Folder structure

```
webpage_company/
├── index.html          Home page
├── services.html       Services page (6 services in detail)
├── solutions.html      Solutions page (common customer problems)
├── case-studies.html   Case studies page
├── about.html          About the company
├── contact.html        Contact page with the contact form
├── README.md           This file
└── assets/
    ├── css/style.css   All design: colors, fonts, layout, mobile version
    ├── js/main.js      Small scripts: menu, animations, contact form
    └── img/favicon.svg Small icon shown in the browser tab
```

---

## 2. The pages

| Page | File | What it contains |
|---|---|---|
| Home | `index.html` | Hero (headline + chip diagram), 6 service cards, "From AI Models to Silicon" stack, 5-step engineering approach, industries, case-study preview, about summary, final call to action |
| Services | `services.html` | Each service with description and capability list. The menu below the title jumps to each service. |
| Solutions | `solutions.html` | 4 typical problems ("Our model is too slow…", etc.) and how we solve them |
| Case Studies | `case-studies.html` | 3 case studies in the format Problem → Architecture → Implementation → Benchmark → Result |
| About | `about.html` | Company statement, who we work with, engineering principles, expertise |
| Contact | `contact.html` | Contact form + email + "what happens next" |

Every page has the same **header** (logo + menu) at the top and the same
**footer** at the bottom.

---

## 3. How the website works

### Design
- All colors, fonts and spacing are in `assets/css/style.css`.
- Main colors are defined at the top of the file in `:root`:
  - `--bg` dark background
  - `--blue` and `--violet` accent colors
  - `--text` white text
  Change a value there and it changes on the whole site.
- Fonts: **Inter** (text) and **JetBrains Mono** (technical labels), loaded from Google Fonts.
- The site is responsive: it adapts to desktop, tablet and phone automatically.

### Diagrams
All chip / NPU / FPGA drawings are **SVG code inside the HTML files** (no image
files). They are marked as *Illustrative* because they are not real measurements.

The grid of small squares (the NPU processing elements) is drawn by JavaScript.
In the HTML it looks like this:

```html
<g data-pe-grid="8,8,168,140,24,8"></g>
```
The numbers mean: `columns, rows, x position, y position, square size, gap`.

### JavaScript (`assets/js/main.js`)
| Part | What it does |
|---|---|
| Header | Adds a dark background when you scroll; opens/closes the mobile menu |
| Reveal | Elements with class `reveal` fade in when you scroll to them |
| PE grid | Draws the animated NPU grid in the diagrams |
| Services menu | Highlights the current service in the menu on the Services page |
| Contact form | Sends the form to Formspree and shows "Thank you" or an error |
| Footer year | Writes the current year in the footer automatically |

### Contact form
- The form sends messages through **Formspree** to **bobkhon1345@gmail.com**.
- Formspree form address: `https://formspree.io/f/xyekwlow`
  (set in `contact.html`, in the `<form action="...">` line).
- See all messages in your Formspree dashboard: https://formspree.io
- Free plan: about 50 messages per month.
- A hidden field (`_gotcha`) blocks simple spam bots.

---

## 4. How to edit the website

You can edit the files with any text editor (VS Code is recommended).

### Change text
Open the page file (for example `about.html`), find the text, change it, save.
Refresh the browser to see the result.

### Change the company name
The name **"Your Company"** is a placeholder. Replace it in **all 6 HTML files**.
In VS Code: `Ctrl + Shift + H` (Replace in files) → search `Your Company` →
replace with your real name → *Replace All*.

### Change the email
Search `bobkhon1345@gmail.com` in all files and replace it.
Also change the email in your Formspree form settings.

### Change the menu (header or footer)
The header and footer are **copied in every page**. If you change a menu link,
change it in **all 6 HTML files**.

### Add a real case study
Open `case-studies.html`. Each case study has 5 parts. Replace the text in
`[square brackets]` with real information. When you have **verified** results,
replace the "Results pending publication" box with the real numbers.

> Rule of this website: do not publish invented customers, numbers,
> testimonials or certifications. Publish numbers only when they were measured.

---

## 5. Placeholders to replace before going public

- [ ] Company name "Your Company" (all pages)
- [ ] Logo (the small chip icon in the header/footer and `assets/img/favicon.svg`)
- [ ] Case study text in `[square brackets]` (`case-studies.html`)
- [ ] Optional: professional email on your own domain instead of Gmail

---

## 6. View the site on your computer

Double-click `index.html`, or in VS Code install the **Live Server** extension,
right-click `index.html` → *Open with Live Server*.

---

## 7. Publish the site online (free) with GitHub Pages

1. Open the repository on GitHub: https://github.com/YUSUPBAEV/webpage_company
2. Go to **Settings → Pages**.
3. Under *Branch*, choose `main` and folder `/ (root)`, click **Save**.
4. After 1–2 minutes the site is live at:
   **https://yusupbaev.github.io/webpage_company/**

Every time you push changes to `main`, the live site updates automatically.

### Use your own domain (optional)
Buy a domain (for example on Namecheap or Cloudflare), then in
**Settings → Pages → Custom domain** enter it and follow GitHub's DNS instructions.

---

## 8. Save changes to GitHub

After editing files, run in the terminal (inside the project folder):

```bash
git add -A
git commit -m "Describe what you changed"
git push
```

---

## 9. Ideas for next improvements

- Real company name, logo and domain
- Founder / team page with photos and background
- Real case studies with measured results
- Technical blog articles (quantization, NPU dataflow, FPGA acceleration)
- Calendar booking button (Calendly or Cal.com)
- SEO: `sitemap.xml`, `robots.txt`, social sharing preview image
- Privacy policy page (the contact form collects personal data)
