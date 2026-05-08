# 🚀 JobMatch Pro - GitHub Deployment Guide

## Quick Start (5 minutes)

### Step 1: Create GitHub Account (if you don't have one)
Go to [github.com/signup](https://github.com/signup) and create a free account.

### Step 2: Create New Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `jobmatch-pro`
3. Description: "AI-powered job search and resume matching"
4. Select "Public"
5. Click "Create repository"

### Step 3: Initialize Git & Upload Code

Open terminal/command prompt and run:

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/jobmatch-pro.git
cd jobmatch-pro

# Copy all project files here
# (The files are in /home/claude/jobmatch-pro)

# Add all files
git add .

# Commit
git commit -m "Initial commit: JobMatch Pro v2"

# Push to GitHub
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/jobmatch-pro.git
git push -u origin main
```

### Step 4: Deploy to GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (gear icon)
3. Go to "Pages" (left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Select branch: "main"
6. Select folder: "/ (root)"
7. Click "Save"

**Wait 2-3 minutes...**

Your app will be live at:
```
https://YOUR-USERNAME.github.io/jobmatch-pro
```

---

## Building for Production

Before deploying, you may want to build optimized code:

```bash
npm install
npm run build
```

This creates an optimized production build in `/build` folder.

---

## Your Live App Links

| Component | Link |
|-----------|------|
| Repository | `https://github.com/YOUR-USERNAME/jobmatch-pro` |
| Live App | `https://YOUR-USERNAME.github.io/jobmatch-pro` |
| Readme | `https://github.com/YOUR-USERNAME/jobmatch-pro#readme` |

---

## Troubleshooting

### "Page not found" after deployment
- Wait 3-5 minutes for GitHub Pages to build
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check Settings → Pages to ensure it's enabled

### Changes not showing up
- Push code to `main` branch:
  ```bash
  git add .
  git commit -m "Updated content"
  git push
  ```
- Wait 1-2 minutes for rebuild

### "Node modules not found"
```bash
npm install
npm start
```

---

## Making Updates

Every time you update the code:

```bash
# Make your changes

# Add & commit
git add .
git commit -m "Description of changes"

# Push to GitHub
git push

# Wait 1-2 minutes for automatic deployment
```

---

## Share Your App

Share this link with anyone:
```
https://YOUR-USERNAME.github.io/jobmatch-pro
```

They can:
- Browse jobs
- Test resume matching
- Try cover letter generation
- Track applications

All in their browser with no installation needed!

---

## Next Steps

Once deployed:
1. ✅ Test the app at your live URL
2. ✅ Share with friends/recruiters
3. ✅ Make updates as needed
4. ✅ Add real job data later
5. ✅ Consider converting to Vercel for more features

---

**Your JobMatch Pro is now live! 🎉**
