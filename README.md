# 🦫 FlappyCapy - Swamp Adventure

A mobile-responsive Flappy Bird clone featuring a capybara navigating through a swamp!

## 🎮 Features

- **Mobile-First Design**: Perfectly scales to fit portrait phone screens
- **Touch & Keyboard Controls**: Tap screen or press SPACE to hop
- **Swamp Theme**: Dark green aesthetic with cypress trees and misty atmosphere
- **Smooth Animations**: 60 FPS gameplay with physics-based movement
- **Score Tracking**: Points for every obstacle pair passed
- **Easy Asset Swapping**: Simple configuration for custom images

## 🚀 Quick Start

### Local Testing
1. Simply open `index.html` in your browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (if you have http-server installed)
   npx http-server
   ```
3. Navigate to `http://localhost:8000`

### Deploy to GitHub Pages

1. **Create a new repository on GitHub** (e.g., `flappy-capy`)

2. **Initialize git in this folder**:
   ```bash
   cd "C:\Users\prana\OneDrive\a. Documents\d. Claude Projects\FlappyCapy"
   git init
   git add .
   git commit -m "Initial commit: FlappyCapy game"
   ```

3. **Connect to GitHub and push**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/flappy-capy.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your game will be live at: `https://YOUR-USERNAME.github.io/flappy-capy/`

## 🎨 Adding Custom Assets

### Option 1: Add Image Files to This Folder

1. Add your images to this directory:
   - `capybara.png` - Your capybara sprite (recommended size: 40x40px or larger)
   - `swamp-bg.png` - Background image (400x600px or larger)
   - `cypress-tree.png` - Tree/vine obstacle (60px wide, tall)

2. Update `script.js` at the top:
   ```javascript
   const ASSETS = {
       capybara: 'capybara.png',
       background: 'swamp-bg.png',
       tree: 'cypress-tree.png'
   };
   ```

### Option 2: Use External URLs

Update the ASSETS object in `script.js` with image URLs:
```javascript
const ASSETS = {
    capybara: 'https://example.com/capybara.png',
    background: 'https://example.com/swamp-bg.png',
    tree: 'https://example.com/tree.png'
};
```

## 🎮 Controls

- **Desktop**: Press `SPACE` to hop
- **Mobile**: Tap anywhere on the screen to hop

## ⚙️ Customization

All game settings are in `script.js` under the `CONFIG` object:

```javascript
const CONFIG = {
    canvasWidth: 400,        // Game width
    canvasHeight: 600,       // Game height
    capyWidth: 40,           // Capybara size
    capyHeight: 40,
    gravity: 0.5,            // How fast capybara falls
    jumpStrength: -9,        // How high capybara hops
    treeWidth: 60,           // Obstacle width
    treeGap: 180,            // Gap between top/bottom obstacles
    treeSpeed: 2,            // How fast obstacles move
    treeSpawnInterval: 90,   // Frames between obstacles

    colors: {                // Placeholder colors (before adding images)
        capybara: '#8B4513',
        tree: '#2F4F2F',
        // ... more colors
    }
};
```

### Make the Game Easier/Harder

**Easier**:
- Increase `treeGap` to 220
- Decrease `treeSpeed` to 1.5
- Decrease `gravity` to 0.4

**Harder**:
- Decrease `treeGap` to 150
- Increase `treeSpeed` to 3
- Increase `gravity` to 0.6

## 📱 Mobile Optimization

The game automatically:
- Prevents page scrolling/bouncing
- Disables text selection
- Scales canvas to fit screen perfectly
- Handles both portrait and landscape modes
- Uses touch events for input

## 🎨 Current Placeholder Graphics

The game uses colored rectangles as placeholders:
- **Capybara**: Brown rectangle with simple eyes and nose
- **Trees**: Dark green rectangles with texture lines
- **Background**: Green gradient with animated water ripples
- **Mist**: Animated translucent ellipses

All placeholders will be automatically replaced when you add image files!

## 🐛 Troubleshooting

**Game won't start?**
- Check browser console for errors (F12)
- Make sure all three files are in the same folder

**Images not loading?**
- Verify file names match exactly (case-sensitive)
- Check browser console for 404 errors
- Ensure images are in the same folder as `index.html`

**Game too laggy on mobile?**
- Reduce `canvasWidth` and `canvasHeight` in CONFIG
- Decrease `treeSpawnInterval` for fewer obstacles

## 📄 File Structure

```
FlappyCapy/
├── index.html          # Main HTML file
├── style.css           # Responsive styling
├── script.js           # Game logic
├── README.md           # This file
├── capybara.png        # (Add your sprite here)
├── swamp-bg.png        # (Add your background here)
└── cypress-tree.png    # (Add your obstacle here)
```

## 🎯 Future Enhancements

Ideas for extending the game:
- Add sound effects (splash, hop, game over)
- Create different difficulty levels
- Add power-ups (invincibility, slow-motion)
- Implement local high score with localStorage
- Add particle effects (water splashes, leaves)
- Create multiple capybara skins to unlock

## 📜 License

Free to use and modify for personal or commercial projects!

## 🙌 Credits

Built with vanilla JavaScript and HTML5 Canvas.
Inspired by the classic Flappy Bird game.

---

**Enjoy playing FlappyCapy!** 🦫🌿
