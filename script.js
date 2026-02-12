// ============================================
// ASSET CONFIGURATION
// Replace these with actual image URLs when ready
// ============================================
const ASSETS = {
    capybara: 'Sprite-removebg-preview.png',  // Your custom pixel art sprite with transparent background!
    background: null, // Set to 'swamp-bg.png' URL when available
    tree: null        // Set to 'cypress-tree.png' URL when available
};

// ============================================
// GAME CONFIGURATION
// ============================================
const CONFIG = {
    // Canvas
    canvasWidth: 400,
    canvasHeight: 600,

    // Capybara
    capyWidth: 60,
    capyHeight: 45,
    capyX: 80,
    gravity: 0.4,          // Reduced from 0.5 (easier)
    jumpStrength: -8,      // Reduced from -9 (gentler hop)

    // Obstacles (Trees)
    treeWidth: 60,
    treeGap: 200,          // Increased from 180 (easier)
    treeSpeed: 1.8,        // Reduced from 2 (easier)
    treeSpawnInterval: 100, // Increased from 90 (more time between obstacles)

    // Hearts (Valentine's Day collectibles!)
    heartSize: 20,
    heartChance: 0.8,      // 80% chance to spawn heart with each tree pair

    // Colors (for placeholder rectangles)
    colors: {
        capybara: '#8B4513',      // Brown
        tree: '#2F4F2F',          // Dark green
        ground: '#1a3a2e',        // Dark swamp
        sky: '#4a7c59',           // Swamp green sky
        water: '#3a5a4a',         // Murky water
        mist: 'rgba(200, 230, 201, 0.1)' // Light mist
    }
};

// ============================================
// GAME STATE
// ============================================
const game = {
    canvas: null,
    ctx: null,
    isRunning: false,
    score: 0,
    hearts: 0,          // Hearts collected!
    highScore: 0,       // Best score ever
    highHearts: 0,      // Most hearts collected
    frameCount: 0,

    capybara: {
        x: CONFIG.capyX,
        y: 0,
        velocity: 0,
        rotation: 0,
        legFrame: 0  // For leg animation
    },

    trees: [],
    heartCollectibles: [], // Valentine's hearts to collect!

    images: {
        capybara: null,
        background: null,
        tree: null,
        loaded: false
    }
};

// ============================================
// INITIALIZATION
// ============================================
function init() {
    game.canvas = document.getElementById('game-canvas');
    game.ctx = game.canvas.getContext('2d');

    // Load high scores from localStorage
    loadHighScores();

    // Set canvas size for mobile responsiveness
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load assets (if available)
    loadAssets();

    // Event listeners
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);

    // Input controls
    document.addEventListener('keydown', handleInput);
    game.canvas.addEventListener('touchstart', handleInput);
    game.canvas.addEventListener('click', handleInput);

    // Prevent scroll on space bar
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
        }
    });
}

function resizeCanvas() {
    const container = document.getElementById('game-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate scale to fit container while maintaining aspect ratio
    const scale = Math.min(
        containerWidth / CONFIG.canvasWidth,
        containerHeight / CONFIG.canvasHeight
    );

    game.canvas.width = CONFIG.canvasWidth;
    game.canvas.height = CONFIG.canvasHeight;
    game.canvas.style.width = `${CONFIG.canvasWidth * scale}px`;
    game.canvas.style.height = `${CONFIG.canvasHeight * scale}px`;
}

function loadAssets() {
    let loadedCount = 0;
    const totalAssets = Object.keys(ASSETS).filter(key => ASSETS[key]).length;

    if (totalAssets === 0) {
        game.images.loaded = true;
        return;
    }

    function onAssetLoad() {
        loadedCount++;
        if (loadedCount === totalAssets) {
            game.images.loaded = true;
        }
    }

    // Load capybara image
    if (ASSETS.capybara) {
        game.images.capybara = new Image();
        game.images.capybara.onload = onAssetLoad;
        game.images.capybara.src = ASSETS.capybara;
    }

    // Load background image
    if (ASSETS.background) {
        game.images.background = new Image();
        game.images.background.onload = onAssetLoad;
        game.images.background.src = ASSETS.background;
    }

    // Load tree image
    if (ASSETS.tree) {
        game.images.tree = new Image();
        game.images.tree.onload = onAssetLoad;
        game.images.tree.src = ASSETS.tree;
    }
}

// ============================================
// GAME CONTROLS
// ============================================
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    resetGame();
    game.isRunning = true;
    gameLoop();
}

function restartGame() {
    document.getElementById('game-over-screen').classList.add('hidden');
    resetGame();
    game.isRunning = true;
    gameLoop();
}

function resetGame() {
    game.score = 0;
    game.hearts = 0;
    game.frameCount = 0;
    game.trees = [];
    game.heartCollectibles = [];
    game.capybara.y = CONFIG.canvasHeight / 2;
    game.capybara.velocity = 0;
    game.capybara.rotation = 0;
    updateScoreDisplay();
}

function loadHighScores() {
    const savedHighScore = localStorage.getItem('flappyCapyHighScore');
    const savedHighHearts = localStorage.getItem('flappyCapyHighHearts');

    if (savedHighScore) game.highScore = parseInt(savedHighScore);
    if (savedHighHearts) game.highHearts = parseInt(savedHighHearts);
}

function saveHighScores() {
    if (game.score > game.highScore) {
        game.highScore = game.score;
        localStorage.setItem('flappyCapyHighScore', game.highScore);
    }
    if (game.hearts > game.highHearts) {
        game.highHearts = game.hearts;
        localStorage.setItem('flappyCapyHighHearts', game.hearts);
    }
}

function handleInput(e) {
    if (!game.isRunning) return;

    if (e.type === 'keydown' && e.code !== 'Space') return;

    e.preventDefault();
    jump();
}

function jump() {
    game.capybara.velocity = CONFIG.jumpStrength;
    game.capybara.legFrame = 10; // Start leg animation
}

function updateScoreDisplay() {
    document.getElementById('score-display').textContent = game.score;
    document.getElementById('hearts-display').textContent = `💖 ${game.hearts}`;
    document.getElementById('high-score-display').textContent = `Best: ${game.highScore} | 💖 ${game.highHearts}`;
}

// ============================================
// GAME LOGIC
// ============================================
function gameLoop() {
    if (!game.isRunning) return;

    update();
    render();

    requestAnimationFrame(gameLoop);
}

function update() {
    game.frameCount++;

    // Update capybara physics
    game.capybara.velocity += CONFIG.gravity;
    game.capybara.y += game.capybara.velocity;

    // Rotation based on velocity (tilt when falling/jumping)
    game.capybara.rotation = Math.min(Math.max(game.capybara.velocity * 2, -30), 90);

    // Update leg animation
    if (game.capybara.legFrame > 0) {
        game.capybara.legFrame--;
    }

    // Check ground collision
    if (game.capybara.y + CONFIG.capyHeight > CONFIG.canvasHeight) {
        gameOver();
        return;
    }

    // Check ceiling collision
    if (game.capybara.y < 0) {
        game.capybara.y = 0;
        game.capybara.velocity = 0;
    }

    // Spawn trees
    if (game.frameCount % CONFIG.treeSpawnInterval === 0) {
        spawnTree();
    }

    // Update trees
    for (let i = game.trees.length - 1; i >= 0; i--) {
        const tree = game.trees[i];
        tree.x -= CONFIG.treeSpeed;

        // Check if tree passed capybara (score)
        if (!tree.scored && tree.x + CONFIG.treeWidth < game.capybara.x) {
            tree.scored = true;
            game.score++;
            updateScoreDisplay();
        }

        // Remove off-screen trees
        if (tree.x + CONFIG.treeWidth < 0) {
            game.trees.splice(i, 1);
        }

        // Check collision
        if (checkCollision(tree)) {
            gameOver();
            return;
        }
    }

    // Update hearts
    for (let i = game.heartCollectibles.length - 1; i >= 0; i--) {
        const heart = game.heartCollectibles[i];
        heart.x -= CONFIG.treeSpeed;

        // Check if capybara collected the heart
        if (checkHeartCollision(heart)) {
            game.hearts++;
            game.heartCollectibles.splice(i, 1);
            updateScoreDisplay();
            continue;
        }

        // Remove off-screen hearts
        if (heart.x + CONFIG.heartSize < 0) {
            game.heartCollectibles.splice(i, 1);
        }
    }
}

function spawnTree() {
    const minGapY = 100;
    const maxGapY = CONFIG.canvasHeight - CONFIG.treeGap - 100;
    const gapY = Math.random() * (maxGapY - minGapY) + minGapY;

    game.trees.push({
        x: CONFIG.canvasWidth,
        topHeight: gapY,
        bottomY: gapY + CONFIG.treeGap,
        scored: false
    });

    // Spawn a heart between the trees (Valentine's Day special!)
    if (Math.random() < CONFIG.heartChance) {
        spawnHeart(gapY);
    }
}

function spawnHeart(gapY) {
    const heartX = CONFIG.canvasWidth + CONFIG.treeWidth / 2;
    const heartY = gapY + (CONFIG.treeGap / 2) - (CONFIG.heartSize / 2);

    game.heartCollectibles.push({
        x: heartX,
        y: heartY,
        pulse: 0 // For animation
    });
}

function checkCollision(tree) {
    const capyLeft = game.capybara.x;
    const capyRight = game.capybara.x + CONFIG.capyWidth;
    const capyTop = game.capybara.y;
    const capyBottom = game.capybara.y + CONFIG.capyHeight;

    const treeLeft = tree.x;
    const treeRight = tree.x + CONFIG.treeWidth;

    // Check if capybara is within tree's x range
    if (capyRight > treeLeft && capyLeft < treeRight) {
        // Check collision with top tree
        if (capyTop < tree.topHeight) {
            return true;
        }
        // Check collision with bottom tree
        if (capyBottom > tree.bottomY) {
            return true;
        }
    }

    return false;
}

function checkHeartCollision(heart) {
    const capyLeft = game.capybara.x;
    const capyRight = game.capybara.x + CONFIG.capyWidth;
    const capyTop = game.capybara.y;
    const capyBottom = game.capybara.y + CONFIG.capyHeight;

    const heartLeft = heart.x;
    const heartRight = heart.x + CONFIG.heartSize;
    const heartTop = heart.y;
    const heartBottom = heart.y + CONFIG.heartSize;

    // Check overlap
    return !(capyRight < heartLeft ||
             capyLeft > heartRight ||
             capyBottom < heartTop ||
             capyTop > heartBottom);
}

function gameOver() {
    game.isRunning = false;
    saveHighScores();

    const isNewHighScore = game.score === game.highScore && game.score > 0;
    const isNewHighHearts = game.hearts === game.highHearts && game.hearts > 0;

    let scoreText = `Score: ${game.score}`;
    if (isNewHighScore) scoreText += ' 🎉 NEW RECORD!';
    scoreText += `\n💖 Hearts: ${game.hearts}`;
    if (isNewHighHearts) scoreText += ' 🎉';

    document.getElementById('final-score').innerHTML = scoreText.replace('\n', '<br>');
    document.getElementById('game-over-screen').classList.remove('hidden');
}

// ============================================
// RENDERING
// ============================================
function render() {
    const ctx = game.ctx;

    // Clear canvas
    ctx.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);

    // Draw background
    drawBackground();

    // Draw trees
    game.trees.forEach(tree => drawTree(tree));

    // Draw hearts
    game.heartCollectibles.forEach(heart => drawHeart(heart));

    // Draw capybara
    drawCapybara();

    // Draw mist effect
    drawMist();
}

function drawBackground() {
    const ctx = game.ctx;

    if (game.images.background) {
        ctx.drawImage(game.images.background, 0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
    } else {
        // Placeholder: Gradient sky
        const gradient = ctx.createLinearGradient(0, 0, 0, CONFIG.canvasHeight);
        gradient.addColorStop(0, CONFIG.colors.sky);
        gradient.addColorStop(0.7, CONFIG.colors.water);
        gradient.addColorStop(1, CONFIG.colors.ground);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);

        // Draw water ripples
        ctx.fillStyle = 'rgba(42, 90, 74, 0.3)';
        const waterStart = CONFIG.canvasHeight * 0.7;
        for (let i = 0; i < 3; i++) {
            const y = waterStart + i * 20 + Math.sin(game.frameCount * 0.05 + i) * 5;
            ctx.fillRect(0, y, CONFIG.canvasWidth, 10);
        }
    }
}

function drawCapybara() {
    const ctx = game.ctx;
    const capy = game.capybara;

    ctx.save();
    ctx.translate(capy.x + CONFIG.capyWidth / 2, capy.y + CONFIG.capyHeight / 2);
    ctx.rotate((capy.rotation * Math.PI) / 180);

    if (game.images.capybara && game.images.capybara.complete) {
        ctx.drawImage(
            game.images.capybara,
            -CONFIG.capyWidth / 2,
            -CONFIG.capyHeight / 2,
            CONFIG.capyWidth,
            CONFIG.capyHeight
        );
    } else {
        // 8-bit Pixel Art Capybara - Matching reference PNG!
        // Lying down pose with rounded back, black outline, white tooth
        const pixelSize = 4;
        const offsetX = -CONFIG.capyWidth / 2;
        const offsetY = -CONFIG.capyHeight / 2;

        // Helper function to draw a pixel
        function drawPixel(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(offsetX + x * pixelSize, offsetY + y * pixelSize, pixelSize, pixelSize);
        }

        // Color palette matching reference
        const tan = '#D4A574';
        const lightTan = '#E6C19A';
        const brown = '#A67C52';
        const darkBrown = '#7D5A3B';
        const veryDark = '#5C4033';
        const black = '#000000';
        const white = '#FFFFFF';

        // Check if legs should be "jumping" (animated)
        const isJumping = capy.legFrame > 0;

        // LYING CAPYBARA with BLACK OUTLINE (13 wide x 11 tall)

        // Row 0: Ear tops with outline
        drawPixel(3, 0, black);
        drawPixel(4, 0, black);

        // Row 1: Ears with rounded back starting
        drawPixel(2, 1, black);
        drawPixel(3, 1, brown);
        drawPixel(4, 1, darkBrown);
        drawPixel(5, 1, black);
        drawPixel(6, 1, black);
        drawPixel(7, 1, black);

        // Row 2: Head and raised back hump
        drawPixel(1, 2, black);
        drawPixel(2, 2, brown);
        drawPixel(3, 2, black);      // Eye!
        drawPixel(4, 2, brown);
        drawPixel(5, 2, tan);
        drawPixel(6, 2, tan);
        drawPixel(7, 2, tan);
        drawPixel(8, 2, black);

        // Row 3: Snout and continuing back curve
        drawPixel(0, 3, black);
        drawPixel(1, 3, darkBrown);
        drawPixel(2, 3, darkBrown);
        drawPixel(3, 3, brown);
        drawPixel(4, 3, tan);
        drawPixel(5, 3, tan);
        drawPixel(6, 3, tan);
        drawPixel(7, 3, tan);
        drawPixel(8, 3, tan);
        drawPixel(9, 3, black);

        // Row 4: Nose area with white tooth and body
        drawPixel(0, 4, black);
        drawPixel(1, 4, darkBrown);
        drawPixel(2, 4, black);      // Nose
        drawPixel(3, 4, white);      // TOOTH!
        drawPixel(4, 4, tan);
        drawPixel(5, 4, tan);
        drawPixel(6, 4, tan);
        drawPixel(7, 4, tan);
        drawPixel(8, 4, tan);
        drawPixel(9, 4, tan);
        drawPixel(10, 4, black);

        // Row 5: Mouth/neck transitioning to body
        drawPixel(0, 5, black);
        drawPixel(1, 5, darkBrown);
        drawPixel(2, 5, brown);
        drawPixel(3, 5, tan);
        drawPixel(4, 5, tan);
        drawPixel(5, 5, tan);
        drawPixel(6, 5, tan);
        drawPixel(7, 5, tan);
        drawPixel(8, 5, tan);
        drawPixel(9, 5, tan);
        drawPixel(10, 5, black);

        // Row 6: Main body - widest part
        drawPixel(1, 6, black);
        drawPixel(2, 6, tan);
        drawPixel(3, 6, tan);
        drawPixel(4, 6, tan);
        drawPixel(5, 6, tan);
        drawPixel(6, 6, tan);
        drawPixel(7, 6, tan);
        drawPixel(8, 6, tan);
        drawPixel(9, 6, tan);
        drawPixel(10, 6, tan);
        drawPixel(11, 6, black);

        // Row 7: Belly area
        drawPixel(1, 7, black);
        drawPixel(2, 7, tan);
        drawPixel(3, 7, lightTan);
        drawPixel(4, 7, lightTan);
        drawPixel(5, 7, tan);
        drawPixel(6, 7, tan);
        drawPixel(7, 7, tan);
        drawPixel(8, 7, tan);
        drawPixel(9, 7, tan);
        drawPixel(10, 7, black);

        // Row 8: Bottom of body with legs
        drawPixel(2, 8, black);
        drawPixel(3, 8, tan);
        drawPixel(4, 8, tan);
        drawPixel(5, 8, tan);
        drawPixel(6, 8, tan);
        drawPixel(7, 8, tan);
        drawPixel(8, 8, tan);
        drawPixel(9, 8, black);

        // LEGS (animated!)
        if (isJumping) {
            // LEGS UP - Jumping pose!
            // Front legs
            drawPixel(3, 8, black);
            drawPixel(3, 9, darkBrown);
            drawPixel(4, 9, darkBrown);

            // Back legs
            drawPixel(7, 8, black);
            drawPixel(7, 9, darkBrown);
            drawPixel(8, 9, darkBrown);
        } else {
            // LEGS DOWN - Lying/falling pose
            // Front legs
            drawPixel(3, 9, black);
            drawPixel(3, 10, darkBrown);
            drawPixel(4, 10, darkBrown);
            drawPixel(3, 11, black);
            drawPixel(4, 11, black);

            // Back legs
            drawPixel(7, 9, black);
            drawPixel(7, 10, darkBrown);
            drawPixel(8, 10, darkBrown);
            drawPixel(7, 11, black);
            drawPixel(8, 11, black);
        }
    }

    ctx.restore();
}

function drawTree(tree) {
    const ctx = game.ctx;

    if (game.images.tree) {
        // Draw top tree (flipped)
        ctx.save();
        ctx.translate(tree.x + CONFIG.treeWidth / 2, tree.topHeight);
        ctx.scale(1, -1);
        ctx.drawImage(game.images.tree, -CONFIG.treeWidth / 2, 0, CONFIG.treeWidth, tree.topHeight);
        ctx.restore();

        // Draw bottom tree
        ctx.drawImage(
            game.images.tree,
            tree.x,
            tree.bottomY,
            CONFIG.treeWidth,
            CONFIG.canvasHeight - tree.bottomY
        );
    } else {
        // Placeholder: Dark green rectangles with texture
        const treeColor = CONFIG.colors.tree;

        // Top tree
        ctx.fillStyle = treeColor;
        ctx.fillRect(tree.x, 0, CONFIG.treeWidth, tree.topHeight);

        // Add texture lines
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        for (let i = 0; i < tree.topHeight; i += 20) {
            ctx.beginPath();
            ctx.moveTo(tree.x, i);
            ctx.lineTo(tree.x + CONFIG.treeWidth, i);
            ctx.stroke();
        }

        // Bottom tree
        ctx.fillStyle = treeColor;
        ctx.fillRect(tree.x, tree.bottomY, CONFIG.treeWidth, CONFIG.canvasHeight - tree.bottomY);

        // Add texture lines
        for (let i = tree.bottomY; i < CONFIG.canvasHeight; i += 20) {
            ctx.beginPath();
            ctx.moveTo(tree.x, i);
            ctx.lineTo(tree.x + CONFIG.treeWidth, i);
            ctx.stroke();
        }

        // Highlight edge
        ctx.strokeStyle = 'rgba(139, 195, 74, 0.5)';
        ctx.lineWidth = 3;
        ctx.strokeRect(tree.x, 0, CONFIG.treeWidth, tree.topHeight);
        ctx.strokeRect(tree.x, tree.bottomY, CONFIG.treeWidth, CONFIG.canvasHeight - tree.bottomY);
    }
}

function drawHeart(heart) {
    const ctx = game.ctx;

    // Pulsing animation
    heart.pulse += 0.1;
    const scale = 1 + Math.sin(heart.pulse) * 0.1;
    const size = CONFIG.heartSize * scale;
    const centerX = heart.x + CONFIG.heartSize / 2;
    const centerY = heart.y + CONFIG.heartSize / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);

    // Draw heart shape
    ctx.fillStyle = '#FF1493'; // Deep pink
    ctx.beginPath();

    // Left curve
    ctx.moveTo(0, -size * 0.3);
    ctx.bezierCurveTo(-size * 0.5, -size * 0.6, -size * 0.5, -size * 0.1, 0, size * 0.3);

    // Right curve
    ctx.bezierCurveTo(size * 0.5, -size * 0.1, size * 0.5, -size * 0.6, 0, -size * 0.3);

    ctx.fill();

    // Add sparkle/highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(-size * 0.15, -size * 0.2, size * 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawMist() {
    const ctx = game.ctx;

    // Animated mist effect
    ctx.fillStyle = CONFIG.colors.mist;
    const mistOffset = (game.frameCount * 0.5) % CONFIG.canvasWidth;

    for (let i = 0; i < 3; i++) {
        const y = CONFIG.canvasHeight * 0.6 + i * 50;
        ctx.beginPath();
        ctx.ellipse(
            mistOffset - 100 + i * 150,
            y,
            100,
            30,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(
            mistOffset + 200 + i * 150,
            y + 20,
            120,
            35,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

// ============================================
// START THE GAME
// ============================================
window.addEventListener('load', init);
