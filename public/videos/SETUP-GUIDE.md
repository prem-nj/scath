# Quick Setup Checklist for Video Hero Section

## Step 1: Place Your Video Files

Copy your two video files to `/public/videos/`:

- `scath-hoodie.mp4` - Primary format (H.264)
- `scath-hoodie.webm` - Alternative format (VP9)

Or use these FFmpeg commands to convert from your source:

```bash
# Convert to MP4
ffmpeg -i your-video.mov -vcodec libx264 -crf 23 -preset slow -acodec aac -b:a 128k scath-hoodie.mp4

# Convert to WebM
ffmpeg -i your-video.mov -vcodec libvpx-vp9 -crf 30 -b:v 2000k scath-hoodie.webm
```

## Step 2: Create Fallback Image

Place a high-quality image at `/public/images/hero-fallback.jpg`:

- At least 1920x1080 resolution
- Compressed to 300-500KB
- Same framing as your video

To optimize JPEG:

```bash
ffmpeg -i hero.jpg -q:v 3 hero-fallback.jpg
```

## Step 3: Verify Installation

The hero section is already implemented in `/views/shop.ejs` and includes:
✅ Full-screen video background
✅ Auto-play, muted, looped
✅ Smooth fade-in animation
✅ Loading spinner
✅ "SCATH" brand name overlay
✅ Call-to-action button
✅ Pause on hover (desktop)
✅ Responsive design
✅ Accessibility features
✅ Error handling with fallback

## File Paths (Auto-configured)

```
/public/videos/scath-hoodie.mp4     ← Primary video
/public/videos/scath-hoodie.webm    ← Alternative video
/public/images/hero-fallback.jpg    ← Fallback image
/views/shop.ejs                     ← Hero section HTML/CSS/JS
```

## Testing

1. Run your Node.js server: `npm start`
2. Navigate to your homepage (/ or /shop route)
3. Video should auto-play with fade-in effect
4. Loading spinner appears briefly
5. "Shop Now" button is clickable
6. Button scrolls to shop section below hero
7. Desktop: Video pauses on hover
8. Mobile: No pause on touch
9. If video fails: Fallback image displays

## Performance Tips

- Video should be under 10MB for fast loading
- Compress aggressively while maintaining quality
- Use CDN for video files in production
- Test on slow 4G connections

## Browser Support

Works on:

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- iOS Safari & Chrome Mobile

---

All code is already in place. Just add your videos and fallback image!
