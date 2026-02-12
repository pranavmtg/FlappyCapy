# 🚀 Deploy FlappyCapy to GitHub Pages

Your game is ready to deploy! Follow these simple steps:

## Prerequisites
- [ ] A GitHub account (free at github.com)
- [ ] Git is installed ✓ (already detected on your system)

---

## Step 1: Configure Git (One-time setup)

Open a terminal in this folder and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Replace with your actual name and email (use the email from your GitHub account).

---

## Step 2: Commit Your Files

```bash
cd "C:\Users\prana\OneDrive\a. Documents\d. Claude Projects\FlappyCapy"

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: FlappyCapy Valentine's Day game"
```

---

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `flappy-capy` (or whatever you prefer)
3. Description: "A Valentine's Day Flappy Bird game with a capybara 🦫💖"
4. Set to **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

---

## Step 4: Push to GitHub

GitHub will show you commands. Copy the "push an existing repository" section:

```bash
git remote add origin https://github.com/YOUR-USERNAME/flappy-capy.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

---

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** in the left sidebar
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait ~1 minute for deployment

---

## 🎉 Your Game is Live!

Your game will be available at:
```
https://YOUR-USERNAME.github.io/flappy-capy/
```

Share this URL with anyone! 💖

---

## Alternative: Quick Deploy with Netlify Drop

**Even faster option (no git/GitHub knowledge needed):**

1. Go to https://app.netlify.com/drop
2. Drag this entire `FlappyCapy` folder onto the page
3. Get instant live URL like: `https://random-name-123.netlify.app`
4. **Done!** Share the URL immediately

**Pros:** Instant, no git needed
**Cons:** Harder to update later, random URL

---

## Updating Your Game Later

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages auto-updates in ~1 minute!

---

## Custom Domain (Optional)

If you own a domain (like `valentine.yourname.com`):

1. In GitHub repo → Settings → Pages
2. Add your custom domain
3. Configure DNS with your domain provider
4. Enable HTTPS (automatic after DNS propagates)

---

## Troubleshooting

**Game not loading after deployment?**
- Check browser console (F12) for errors
- Verify all file paths are relative (no `C:\` paths)
- Wait 2-3 minutes for GitHub Pages to fully deploy

**Can't push to GitHub?**
- Make sure you created the repo as **Public**
- Check you used the correct GitHub username
- Verify git credentials are set up

**Netlify option better for you?**
- No GitHub account needed
- No git commands needed
- Instant deployment
- Just drag and drop!

---

## 🎨 Before Deploying

**Checklist:**
- [ ] Replace `capy.webp` with your 8-bit pixel art PNG
- [ ] Test the game locally (open index.html)
- [ ] Make sure high scores work
- [ ] Test on mobile (responsive design)

---

## 📱 Share Your Game!

After deploying, share with:
- Direct link
- QR code (use qr-code-generator.com)
- Social media
- Text message for Valentine's Day! 💖

**Pro tip:** Send the link in a romantic message:
> "I made you a game for Valentine's Day! Help the capybara collect hearts 💖 [your-game-url]"

---

## Need Help?

If anything doesn't work, let me know which step you're stuck on and I'll help troubleshoot!
