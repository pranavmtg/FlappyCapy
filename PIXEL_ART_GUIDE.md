# 🎨 8-Bit Capybara Sprite Guide

## Quick Answer
**File format needed: PNG (with transparent background)**

---

## Specifications for Your 8-Bit Capybara

### Recommended Size
- **48x48 pixels** (sweet spot for mobile + desktop)
- Alternative sizes: 32x32, 64x64, or 96x96

### File Format
- **PNG** - Best choice! ✓
  - Supports transparency (no white box around sprite)
  - Lossless (keeps pixels crisp)
  - Works perfectly with HTML5 Canvas

### Style Guidelines
1. **Hard edges** - No smooth gradients or anti-aliasing
2. **Limited color palette** - 8-16 colors max for authentic retro look
3. **Chunky pixels** - Visible individual pixels, not smooth
4. **Transparent background** - So it floats in the game

---

## Where to Get Pixel Art Capybara

### Option 1: Create Your Own
**Free tools:**
- **Piskel** (piskelapp.com) - Browser-based, easy!
- **Aseprite** ($20) - Professional pixel art tool
- **GIMP** (Free) - Set pencil to 1px, disable anti-aliasing

**Tips:**
- Start with brown oval (body)
- Add darker brown for snout
- Add black dots for eyes and nose
- Keep it simple - fewer pixels = more retro!

### Option 2: Find Existing Pixel Art
**Free resources:**
- OpenGameArt.org - Search "capybara" or "rodent"
- Itch.io asset packs - Many free pixel art packs
- Pixilart.com - Community pixel art
- Make one using AI: "8-bit pixel art capybara sprite, 48x48, transparent background"

### Option 3: Commission an Artist
- Fiverr - $5-20 for custom pixel art
- r/PixelArt on Reddit - Find artists

---

## How to Use Your Sprite

### Once you have the PNG file:

1. **Save it in the FlappyCapy folder**
   ```
   FlappyCapy/
   ├── capy-pixel.png  ← Your new sprite here!
   ├── index.html
   ├── script.js
   └── style.css
   ```

2. **Update script.js**

   Find this line near the top:
   ```javascript
   const ASSETS = {
       capybara: 'capy.webp',  // Change this line
   ```

   Change it to:
   ```javascript
   const ASSETS = {
       capybara: 'capy-pixel.png',  // Your new sprite!
   ```

3. **Adjust size if needed**

   If your sprite is not 48x48, update CONFIG:
   ```javascript
   const CONFIG = {
       // ...
       capyWidth: 64,   // Match your sprite width
       capyHeight: 64,  // Match your sprite height
   ```

---

## Example: Simple 8-Bit Capybara in Code

If you want, I can generate a simple pixel art capybara directly in the game code (no external file needed). It won't be as detailed as a PNG, but it'll be pure retro style!

Let me know if you want this option.

---

## Size Recommendations by Platform

| Platform | Recommended Size | Why |
|----------|------------------|-----|
| Mobile   | 48x48 or 64x64  | Visible but not too large |
| Desktop  | 64x64 or 96x96  | More detail visible |
| Retro feel | 32x32 or 48x48 | Classic NES/Game Boy size |

**Current game settings:** 50x50 (works great!)

---

## Testing Your Sprite

After adding your PNG:

1. Open `index.html` in browser
2. Start game
3. Check that:
   - Capybara appears (not broken image icon)
   - No white box around it (transparency working)
   - Size looks good
   - Rotates smoothly when jumping/falling

If the sprite is too big/small, adjust `capyWidth` and `capyHeight` in CONFIG.

---

## Why PNG is Better Than Other Formats

| Format | Good for Pixel Art? | Notes |
|--------|---------------------|-------|
| **PNG** | ✅ Yes! | Perfect. Use this. |
| GIF | ✅ OK | Works, but PNG is better |
| WebP | ✅ OK | Modern, but PNG more compatible |
| JPG | ❌ No | Compression blurs pixels |
| SVG | ❌ No | Vector = not pixel art |
| BMP | ✅ OK | Too large file size |

---

## Quick Sprite Checklist

Before using your pixel art:
- [ ] PNG format
- [ ] Transparent background
- [ ] Between 32x32 and 96x96 pixels
- [ ] Hard pixel edges (no blur)
- [ ] Limited color palette
- [ ] Saved in FlappyCapy folder
- [ ] Updated ASSETS.capybara path in script.js

---

## Need Help?

Let me know if you:
- Want me to adjust the game for a different sprite size
- Need help creating pixel art
- Want me to code a simple pixel capybara directly in the game
- Have a sprite ready and need help integrating it

Just drop the PNG in the folder and tell me the filename! 🦫
