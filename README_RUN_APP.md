# How to Run the Subscription Analytics App

## 📁 Folder Structure

```
billwise/
├── Subscription Analytics App UI/      ← Your web app (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── lib/                                ← Flutter app (if applicable)
├── android/                            ← Android files (if applicable)
└── ios/                               ← iOS files (if applicable)
```

## 🚀 Quick Start

### Option 1: Run Development Server (Recommended for Development)

```bash
cd "Subscription Analytics App UI"
npm install        # Install dependencies (only first time)
npm run dev        # Start development server
```

The app will open at: **http://localhost:5173/**

### Option 2: Build for Production

```bash
cd "Subscription Analytics App UI"
npm run build      # Create optimized build
```

Output files will be in: `dist/` folder

## 📱 Using the App in Chrome

1. Start the dev server: `npm run dev`
2. Open Chrome and go to: http://localhost:5173/
3. Use mobile device toggle (F12 → Mobile view) for best experience
4. Viewport size: 375px width (standard mobile)

## 🗂️ Creating a Separate Folder (Optional)

If you want to keep the web app separate from the Flutter app:

### Step 1: Create new folder structure
```
billwise-app/
├── web/                               ← Web app
│   ├── Subscription Analytics App UI/
│   └── README.md
├── mobile/                            ← Flutter app
│   ├── lib/
│   ├── android/
│   ├── ios/
│   └── README.md
└── README.md
```

### Step 2: Copy the web app
```bash
# On Windows PowerShell
mkdir billwise-app\web
copy-item -Path ".\Subscription Analytics App UI\*" -Destination ".\billwise-app\web\Subscription Analytics App UI\" -Recurse
```

Or manually:
1. Right-click `Subscription Analytics App UI` folder
2. Select "Copy"
3. Create `billwise-app\web\` folder
4. Paste the folder

### Step 3: Update paths in scripts (if needed)
If your scripts reference relative paths, update them to match new folder structure.

## 📦 Project Structure Inside Web App

```
Subscription Analytics App UI/
├── src/
│   ├── app/
│   │   ├── screens/              ← Page components
│   │   │   ├── Dashboard.tsx      (Subscriptions module)
│   │   │   ├── Analytics.tsx
│   │   │   ├── History.tsx
│   │   │   ├── Reminders.tsx
│   │   │   ├── dashboard/         (Dashboard module)
│   │   │   │   ├── DashboardOverview.tsx
│   │   │   │   ├── DashboardAnalytics.tsx
│   │   │   │   └── ...
│   │   │   └── emi/              (EMI module)
│   │   │       ├── EMIDashboard.tsx
│   │   │       ├── EMIAnalytics.tsx
│   │   │       └── ...
│   │   ├── modules/              ← Module routers
│   │   │   ├── DashboardModule.tsx
│   │   │   ├── SubscriptionsModule.tsx
│   │   │   ├── EMIModule.tsx
│   │   │   └── ...
│   │   ├── components/           ← Reusable components
│   │   │   ├── BottomNav.tsx
│   │   │   ├── DrawerNav.tsx
│   │   │   ├── AppLayout.tsx
│   │   │   └── ui/              ← shadcn/ui components
│   │   ├── data/                ← Mock data
│   │   │   └── mockData.ts
│   │   ├── routes.tsx           ← Route definitions
│   │   └── App.tsx              ← Main app component
│   ├── styles/                  ← Global styles
│   │   └── globals.css
│   └── main.tsx                 ← Entry point
├── index.html                   ← HTML template
├── package.json                 ← Dependencies
├── vite.config.ts              ← Build config
├── tailwind.config.ts          ← Tailwind config
├── tsconfig.json               ← TypeScript config
└── README.md                    ← Project docs
```

## 💻 Common Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm audit fix` | Fix security vulnerabilities |

## 🌐 Accessing from Other Devices

To access the app from another device on your network:

1. Find your computer's IP address:
   ```bash
   ipconfig              # Windows PowerShell
   # Look for "IPv4 Address: xxx.xxx.xxx.xxx"
   ```

2. Start dev server with `--host`:
   ```bash
   npm run dev -- --host
   ```

3. Open on other device:
   ```
   http://YOUR_IP:5173/
   Example: http://192.168.1.100:5173/
   ```

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
# Find process using port (Windows)
netstat -ano | findstr :5173

# Kill process
taskkill /PID <PID> /F
```

### Modules not found error
```bash
# Clear cache and reinstall
rm -r node_modules
npm install
npm run dev
```

### Changes not appearing in browser
1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. Clear browser cache
3. Restart dev server

## 📲 Mobile Testing

### Using Chrome DevTools
1. Open app in Chrome: http://localhost:5173/
2. Press F12 to open DevTools
3. Click mobile icon (top-left of DevTools)
4. Select device: "iPhone 12 Pro" (375×812px)
5. Test navigation and UI

### Tested Screen Sizes
- ✅ iPhone SE: 375×667px
- ✅ iPhone 12: 390×844px
- ✅ iPhone 13: 390×844px
- ✅ Pixel 5: 393×851px
- ✅ Tablet: Up to 768px

## 📚 Key Technologies

- **React 18.3.1** - UI framework
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Recharts** - Charts and graphs
- **Radix UI** - Accessible components
- **Vite** - Build tool and dev server

## 🎨 Design System

All components follow the Figma design:
- **Color System**: Accent colors per module
- **Typography**: Consistent font sizes and weights
- **Spacing**: 4px, 8px, 12px, 16px, 20px, 24px, etc.
- **Border Radius**: 8px (components), 12px (cards), 16px (large elements)
- **Shadows**: Subtle, consistent shadow system

## 🔗 Useful Links

- **Figma Design**: https://www.figma.com/design/E3bd4rWeQibyplM1MUOsJD/Subscription-Analytics-App-UI
- **Vite Docs**: https://vitejs.dev/
- **React Router Docs**: https://reactrouter.com/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

## ❓ Need Help?

Common issues and solutions:
1. **App won't start**: Check Node.js is installed (`node -v`)
2. **Port error**: Another app using port 5173
3. **Module not found**: Run `npm install` again
4. **Styling broken**: Clear browser cache and hard refresh

---

**Last Updated**: June 2026
**App Version**: 0.0.1
