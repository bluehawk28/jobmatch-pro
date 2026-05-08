# 🚀 JobMatch Pro v2

**AI-powered job search, resume matching, and application tracking system**

## Features

✅ **Job Board**
- Browse remote frontend engineer jobs ($170k+)
- Full-time only filter
- H1B sponsorship support
- Search & bookmark functionality
- View complete job descriptions

✅ **Resume Agent**
- AI-powered resume-to-job matching
- Smart cover letter generation
- Editable cover letters
- Truthful resume suggestions only
- Match score calculation

✅ **Resume Versions**
- 3 pre-built versions (All-Purpose, Architecture-Focused, Leadership-Focused)
- Create custom versions
- Switch versions before applying
- Edit and delete versions

✅ **Application Tracking**
- Track all job applications
- Match score history
- Email confirmations
- Application status

✅ **Email Automation**
- Daily job digest (configurable time)
- Application confirmations
- LinkedIn quick-apply links

## Tech Stack

- **React** 18.2.0
- **Lucide React** (Icons)
- **Tailwind CSS** (Styling)
- **LocalStorage** (Data persistence)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/jobmatch-pro.git
cd jobmatch-pro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Deployment to GitHub Pages

### 1. Create GitHub Repository

Go to [github.com/new](https://github.com/new) and create a repository named `jobmatch-pro`

### 2. Initialize Git & Push Code

```bash
cd jobmatch-pro
git init
git add .
git commit -m "Initial commit: JobMatch Pro v2"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/jobmatch-pro.git
git push -u origin main
```

### 3. Update package.json for GitHub Pages

Add this line to `package.json`:
```json
"homepage": "https://YOUR-USERNAME.github.io/jobmatch-pro"
```

### 4. Deploy with GitHub Pages

```bash
npm run build
```

Then go to **Repository Settings → Pages** and:
1. Set "Source" to "Deploy from a branch"
2. Select "main" branch and "/root" folder
3. Click Save

Your app will be live at: `https://YOUR-USERNAME.github.io/jobmatch-pro`

---

## How to Use

### Job Board Tab
1. Click "📋 Job Board"
2. Browse available jobs (4 sample jobs pre-loaded)
3. Use filters to find matching roles
4. Click eye icon (👁️) to view full job description
5. Click "Apply" to start the application process

### Resume Agent Tab
1. The job loads automatically when you click "Apply"
2. Agent analyzes the job against your resume
3. Review suggestions and cover letter
4. Edit cover letter if needed
5. Click "Submit Application"

### Applications Tab
1. View all submitted applications
2. See match scores and timestamps
3. Track which resume version was used
4. View email confirmations

### Resume Versions Tab
1. View 3 pre-built versions
2. Click "Use This Version" to select for applications
3. Click "New Version" to create custom versions
4. Edit or delete versions as needed

### Email Settings Tab
1. Configure primary email address
2. Set daily digest time
3. Preview daily digest emails
4. View automation status

---

## File Structure

```
jobmatch-pro/
├── public/
│   └── index.html           # Main HTML file
├── src/
│   ├── App.jsx              # Main component
│   └── index.js             # React entry point
├── package.json             # Dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## Local Data Storage

All data is stored in browser's localStorage:
- Jobs and bookmarks
- Applications & tracking
- Resume versions
- Email preferences

Data persists across browser sessions!

---

## Sample Jobs

The app comes pre-loaded with 4 sample jobs:
1. **Vercel** - Senior Frontend Engineer ($185k)
2. **Stripe** - Staff Frontend Engineer ($220k)
3. **Figma** - Senior Frontend Engineer ($195k)
4. **Notion** - Senior Software Engineer ($180k)

All are full-time, remote USA, H1B sponsorship included.

---

## Features Guide

### 🔍 Job Matching
- Extracts keywords from job descriptions
- Compares against your skills
- Generates match score
- Identifies missing skills (honestly)

### 📝 Cover Letter Generation
- Auto-generated based on job & company
- Fully editable
- Personalized to company mission
- Professional formatting

### 📊 Resume Versions
- Default: All-purpose professional summary
- Architecture-Focused: Emphasizes design systems & technical leadership
- Leadership-Focused: Highlights mentoring & team coordination
- Custom: Create your own versions

### 💌 Email Features
- **Daily Digest**: Receive top matching jobs at configured time
- **Confirmations**: Get alerts when applications submitted
- **LinkedIn Links**: Direct apply buttons for each job

---

## Future Enhancements

- Real API integration (LinkedIn, Indeed scraping)
- Database backend (Firebase/PostgreSQL)
- User authentication
- Email service integration (SendGrid)
- Interview prep agent
- Salary negotiation guide
- Auto-apply feature
- Analytics dashboard

---

## Support & Issues

For bugs or feature requests, create an issue on GitHub or contact the maintainer.

---

## License

MIT License - Feel free to use and modify

---

## Author

Built for Siddharth Phadke - Senior Frontend Engineer
- GitHub: [@bluehawk28](https://github.com/bluehawk28)
- Portfolio: [bluehawk28.github.io/my-portfolio](https://bluehawk28.github.io/my-portfolio)

---

**Happy job hunting! 🚀**
