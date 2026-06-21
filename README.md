# Portfolio Website – Step by Step Build Guide

This repository contains my personal portfolio website and the full journey of how I built it from scratch, using free tools and keeping costs low.  
It includes all source code (HTML, CSS, JavaScript) and instructions on how I set up hosting with XAMPP, Cloudflare Tunnel, and a custom domain.

---

## 📑 Table of Contents
- Step 1: Install XAMPP
- Step 2: Install Cloudflared
- Step 3: Buy a Domain
- Step 4: Set Up Cloudflare
- Step 5: Link Domain to Tunnel
- Step 6: Start Coding Website
- Step 7: Test Locally
- Step 8: Make Site Public
- Step 9: Submit to Google Search Console
- Features
- Tech Stack
- License

---

## Step 1: Install XAMPP
XAMPP gives you Apache (web server), MySQL (database), and PHP to run websites locally.

1. Go to [apachefriends.org](https://www.apachefriends.org)  
2. Download the latest version for your OS (Windows/Linux/Mac)  
3. Run the installer and accept defaults  
4. Open the **XAMPP Control Panel**  
5. Start **Apache** and **MySQL** services  

---

## Step 2: Install Cloudflared
Cloudflared creates a secure tunnel from your local server to the internet.

1. Go to [developers.cloudflare.com](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation)  
2. Download the installer for your OS  
3. Run the setup  
4. Test installation:  
   ```bash
   cloudflared --version
## Step 3: Buy a Domain
A domain gives your site a professional address.

- Register a domain (e.g., `ockertoosthuizen.org`) from a registrar  
- Cost is usually around $10 per year  
- Keep login details safe  

---

## Step 4: Set Up Cloudflare Account
Cloudflare manages your DNS and connects your domain to the tunnel.

1. Go to [cloudflare.com](https://www.cloudflare.com) → Sign Up  
2. Add your domain to Cloudflare  
3. Change your registrar’s nameservers to Cloudflare’s  
4. Wait for DNS propagation (can take a few hours)  

---

## Step 5: Link Domain to Tunnel
Connect your domain to your local XAMPP server via Cloudflare Tunnel.

bash
cloudflared tunnel create mysite
cloudflared tunnel run mysite

## Step 6: Start Coding Website
Now it’s time to build your actual site using **HTML, CSS, and JavaScript**.

- **Create your main pages:**
  - `index.html` → Homepage
  - `about.html` → About me
  - `projects.html` → Portfolio projects
  - `games.html` → Interactive web games
  - `contact.html` → Contact form

- **Add styles in `assets/css/style.css`:**
  - Define your red/black tech theme
  - Add animations (like fade‑ins or typing effects)
  - Make the layout responsive for mobile and desktop

- **Add interactivity in `assets/js/main.js`:**
  - Navigation menu toggle (hamburger menu)
  - Typing animation for the hero section
  - Game logic for the Games tab

- **Organize images in `assets/images/`:**
  - Logos, icons, and screenshots
  - Favicon for the browser tab

### Example folder structure:
  website/
  ├── index.html
  ├── about.html
  ├── projects.html
  ├── games.html
  ├── contact.html
  ├── assets/
  │   ├── css/
  │   │   └── style.css
  │   ├── js/
  │   │   └── main.js
  │   └── images/
  └── README.md

## Step 7: Test Locally
Check your site works before going live.

Open http://localhost/website in browser

Verify navigation, animations, and forms

Fix any errors

## Step 8: Make Site Public
With Cloudflare Tunnel running, your domain is now live.

Keep Cloudflared running to maintain tunnel

Visit your domain (e.g., ockertoosthuizen.org) from any device

Share the link

## Step 9: Submit to Google Search Console
Tell Google about your site so it appears in search results.

Go to Google Search Console (search.google.com in Bing) → Add Property

Verify domain ownership via DNS TXT record

Upload sitemap.xml

Request indexing for your homepage
