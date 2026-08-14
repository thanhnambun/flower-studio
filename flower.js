/**
 * Flower Math & Rendering Engine (DIY Creative Studio Edition)
 * Handles procedural Bezier petal geometry, organic growth, particle physics,
 * and aesthetic Polaroid card generation.
 */

// Easing function
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

// 1. Falling Petals Rain
class FallingPetal {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset(true);
  }

  reset(randomY = false) {
    this.x = Math.random() * this.canvasWidth;
    this.y = randomY ? Math.random() * this.canvasHeight : -20;
    this.size = Math.random() * 7 + 7;
    this.speedY = Math.random() * 1.1 + 0.7;
    this.speedX = Math.random() * 0.8 - 0.2;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.04;
    this.flip = Math.random() * Math.PI * 2;
    this.flipSpeed = Math.random() * 0.03 + 0.01;
    this.color = Math.random() < 0.6 ? '#fbcfe8' : '#fda4af';
    this.opacity = Math.random() * 0.45 + 0.35;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.8;
    this.rot += this.rotSpeed;
    this.flip += this.flipSpeed;

    if (this.y > this.canvasHeight + 20 || this.x < -20 || this.x > this.canvasWidth + 20) {
      this.reset(false);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.scale(1, Math.cos(this.flip));
    ctx.globalAlpha = this.opacity;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size * 0.5, -this.size * 0.6, -this.size * 0.3, -this.size, 0, -this.size * 1.1);
    ctx.bezierCurveTo(this.size * 0.3, -this.size, this.size * 0.5, -this.size * 0.6, 0, 0);
    ctx.fill();

    ctx.restore();
  }
}

// 2. Floating Compliment & Fun Bubble (Subtle & Encouraging)
class FloatingLoveBubble {
  constructor(x, y, text) {
    this.x = x;
    this.y = y - 35;
    this.text = text;
    this.vy = -1.1;
    this.life = 0;
    this.maxLife = 120;
    this.alpha = 1;
    this.scale = 0.8;
  }

  update() {
    this.life++;
    this.y += this.vy;
    this.vy *= 0.98;
    
    if (this.life < 15) {
      this.scale = 0.8 + (this.life / 15) * 0.2;
    }

    if (this.life > this.maxLife - 30) {
      this.alpha = Math.max(0, (this.maxLife - this.life) / 30);
    }

    return this.life < this.maxLife;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);

    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    const textMetrics = ctx.measureText(this.text);
    const paddingX = 14;
    const paddingY = 8;
    const boxWidth = textMetrics.width + paddingX * 2;
    const boxHeight = 28;
    const rx = -boxWidth / 2;
    const ry = -boxHeight / 2;

    ctx.shadowColor = 'rgba(251, 113, 133, 0.35)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    
    ctx.beginPath();
    ctx.roundRect(rx, ry, boxWidth, boxHeight, 14);
    ctx.fill();

    ctx.fillStyle = '#be123c';
    ctx.shadowBlur = 0;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, 0, 1);

    ctx.restore();
  }
}

// 3. Fairy Dust Stardust Particle
class FairyDustParticle {
  constructor(x, y) {
    this.x = x + (Math.random() - 0.5) * 12;
    this.y = y + (Math.random() - 0.5) * 12;
    this.vx = (Math.random() - 0.5) * 1.4;
    this.vy = (Math.random() - 0.5) * 1.4 - 0.5;
    this.size = Math.random() * 3.5 + 1.8;
    this.life = 0;
    this.maxLife = Math.random() * 32 + 22;
    this.isSparkle = Math.random() < 0.4;
    this.color = this.isSparkle ? '#fb7185' : (Math.random() < 0.5 ? '#fbbf24' : '#ffffff');
  }

  update() {
    this.life++;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha = 1 - (this.life / this.maxLife);
    return this.life < this.maxLife;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = this.color;

    if (this.isSparkle) {
      ctx.font = `${this.size * 2}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨', this.x, this.y);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

// 4. Pollen Particles
class PollenParticle {
  constructor(x, y, color) {
    this.x = x + (Math.random() - 0.5) * 20;
    this.y = y + (Math.random() - 0.5) * 20;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = -Math.random() * 1.8 - 0.6;
    this.size = Math.random() * 3 + 1.5;
    this.color = color || '#fbbf24';
    this.alpha = 1;
    this.life = 0;
    this.maxLife = Math.random() * 75 + 50;
    this.swaySeed = Math.random() * 10;
  }

  update() {
    this.life++;
    this.x += this.vx + Math.sin((this.life + this.swaySeed) * 0.06) * 0.6;
    this.y += this.vy;
    this.alpha = Math.max(0, 1 - (this.life / this.maxLife));
    return this.life < this.maxLife;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// 5. Procedural Flower Class
class Flower {
  constructor(config = {}) {
    this.x = config.x || 400;
    this.y = config.y || 300;
    this.petalCount = config.petalCount || 5;
    this.layers = config.layers || 1;
    this.petalLength = config.petalLength || 68;
    this.petalWidth = config.petalWidth || 44;
    this.shape = config.shape || 'heart';
    this.baseColor = config.baseColor || '#fb7185';
    this.tipColor = config.tipColor || '#ffe4e6';
    this.centerColor = config.centerColor || '#fbbf24';
    this.hasStem = config.hasStem !== undefined ? config.hasStem : true;
    this.hasGlow = config.hasGlow !== undefined ? config.hasGlow : true;
    this.isAnimated = config.isAnimated !== undefined ? config.isAnimated : true;

    // Animation state
    this.bloomProgress = this.isAnimated ? 0 : 1;
    this.bloomSpeed = config.bloomSpeed || 0.024;
    this.isFullyBloomed = !this.isAnimated;
    this.age = 0;
    this.swayPhase = Math.random() * Math.PI * 2;
    this.swaySpeed = 0.015 + Math.random() * 0.01;
    this.stemBend = (Math.random() - 0.5) * 40;
    
    this.stemBaseY = config.stemBaseY !== undefined ? config.stemBaseY : (config.canvasHeight || 800);
    this.stemBaseX = this.x + this.stemBend * 1.4;
  }

  update(particlePool) {
    this.age++;
    
    if (!this.isFullyBloomed) {
      this.bloomProgress += this.bloomSpeed;
      if (this.bloomProgress >= 1) {
        this.bloomProgress = 1;
        this.isFullyBloomed = true;
      }

      if (this.hasGlow && particlePool && Math.random() < 0.4) {
        particlePool.push(new PollenParticle(this.x, this.y, this.centerColor));
      }
    }
  }

  draw(ctx, stepLimit = null) {
    ctx.save();

    const currentSway = Math.sin(this.age * this.swaySpeed + this.swayPhase) * 3;
    const currentScale = this.isAnimated ? easeOutBack(Math.min(this.bloomProgress, 1)) : 1;

    // Step 1: Draw Stem and Leaves
    if (this.hasStem && (stepLimit === null || stepLimit >= 5)) {
      this.drawStem(ctx, currentSway, Math.min(this.bloomProgress * 1.5, 1));
    }

    ctx.translate(this.x + currentSway, this.y);

    if (currentScale > 0.01) {
      // Step 2, 3, 4: Draw Petal Layers
      for (let layer = this.layers; layer >= 1; layer--) {
        if (stepLimit !== null) {
          if (stepLimit < 2) continue;
          if (stepLimit === 2 && layer !== 1) continue;
        }

        const layerScale = (0.6 + (layer / this.layers) * 0.4) * currentScale;
        const layerPetalCount = Math.max(3, Math.round(this.petalCount - (this.layers - layer) * 2));
        const layerAngleOffset = (layer % 2 === 0) ? (Math.PI / layerPetalCount) : 0;

        ctx.save();
        ctx.scale(layerScale, layerScale);

        // Subtle layer depth for lower layers (without altering base gradients)
        if (this.layers > 1 && layer < this.layers) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
          ctx.shadowBlur = 5;
          ctx.shadowOffsetY = 2;
        }

        const petalsToDraw = (stepLimit === 3) ? 1 : layerPetalCount;

        for (let i = 0; i < petalsToDraw; i++) {
          const angle = (i * (Math.PI * 2 / layerPetalCount)) + layerAngleOffset;
          ctx.save();
          ctx.rotate(angle);
          this.drawSinglePetal(ctx, this.petalLength, this.petalWidth, this.shape);
          ctx.restore();
        }
        ctx.restore();
      }

      // Step 5: Draw Center Pistil & Stamens
      if (stepLimit === null || stepLimit >= 1) {
        this.drawCenter(ctx, currentScale, stepLimit);
      }
    }

    ctx.restore();
  }

  drawStem(ctx, sway, progress) {
    ctx.save();
    const startX = this.stemBaseX;
    const startY = this.stemBaseY;
    const targetX = this.x + sway;
    const targetY = this.y;

    const midX = (startX + targetX) / 2 + this.stemBend;
    const midY = (startY + targetY) / 2;

    ctx.strokeStyle = '#2d6a4f';
    ctx.lineWidth = Math.max(3, 7.5 * progress);
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(midX, midY, targetX, targetY);
    ctx.stroke();

    ctx.strokeStyle = '#52b788';
    ctx.lineWidth = Math.max(1, 2.5 * progress);
    ctx.beginPath();
    ctx.moveTo(startX - 1, startY);
    ctx.quadraticCurveTo(midX - 1, midY, targetX - 1, targetY);
    ctx.stroke();

    if (progress > 0.4) {
      const leafScale = Math.min((progress - 0.4) * 1.66, 1);
      this.drawLeaf(ctx, midX - 10, midY + 20, -0.6, leafScale);
      this.drawLeaf(ctx, midX + 15, midY - 30, 0.7, leafScale * 0.85);
    }

    ctx.restore();
  }

  drawLeaf(ctx, lx, ly, angle, scale) {
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const grad = ctx.createLinearGradient(0, 0, 45, 0);
    grad.addColorStop(0, '#1b4332');
    grad.addColorStop(0.5, '#40916c');
    grad.addColorStop(1, '#74c69d');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(15, -15, 35, -12, 50, 0);
    ctx.bezierCurveTo(35, 12, 15, 15, 0, 0);
    ctx.fill();

    ctx.strokeStyle = '#95d5b2';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(44, 0);
    ctx.stroke();

    ctx.restore();
  }

  drawSinglePetal(ctx, length, width, shape) {
    ctx.save();

    const grad = ctx.createLinearGradient(0, 0, 0, -length);
    grad.addColorStop(0, this.baseColor);
    grad.addColorStop(0.7, this.tipColor);
    grad.addColorStop(1, '#ffffff');

    ctx.fillStyle = grad;

    if (this.hasGlow) {
      ctx.shadowColor = this.tipColor;
      ctx.shadowBlur = 10;
    }

    ctx.beginPath();

    switch (shape) {
      case 'rounded':
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-width, -length * 0.35, -width * 0.9, -length * 0.85, 0, -length);
        ctx.bezierCurveTo(width * 0.9, -length * 0.85, width, -length * 0.35, 0, 0);
        break;

      case 'heart':
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-width * 0.8, -length * 0.4, -width, -length * 0.8, -width * 0.4, -length);
        ctx.quadraticCurveTo(-width * 0.1, -length * 0.88, 0, -length * 0.92);
        ctx.quadraticCurveTo(width * 0.1, -length * 0.88, width * 0.4, -length);
        ctx.bezierCurveTo(width, -length * 0.8, width * 0.8, -length * 0.4, 0, 0);
        break;

      case 'swirl':
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-width * 1.1, -length * 0.3, -width * 0.6, -length * 0.95, 0, -length);
        ctx.bezierCurveTo(width * 1.3, -length * 0.7, width * 0.5, -length * 0.2, 0, 0);
        break;

      case 'pointed':
      default:
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-width * 0.9, -length * 0.35, -width * 0.7, -length * 0.8, 0, -length);
        ctx.bezierCurveTo(width * 0.7, -length * 0.8, width * 0.9, -length * 0.35, 0, 0);
        break;
    }

    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -length * 0.1);
    ctx.lineTo(0, -length * 0.8);
    ctx.stroke();

    ctx.restore();
  }

  drawCenter(ctx, scale, stepLimit) {
    ctx.save();
    const radius = Math.max(11, this.petalLength * 0.2) * scale;

    const centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    centerGrad.addColorStop(0, '#fffbeb');
    centerGrad.addColorStop(0.4, this.centerColor);
    centerGrad.addColorStop(1, '#d97706');

    if (this.hasGlow) {
      ctx.shadowColor = this.centerColor;
      ctx.shadowBlur = 14;
    }

    ctx.fillStyle = centerGrad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    if (stepLimit === null || stepLimit >= 6 || stepLimit === 1) {
      const dotCount = Math.min(18, Math.max(8, Math.round(this.petalCount * 1.4)));
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 4;
      for (let d = 0; d < dotCount; d++) {
        const dotAngle = (d * (Math.PI * 2 / dotCount));
        const dotDist = radius * 0.65;
        const dx = Math.cos(dotAngle) * dotDist;
        const dy = Math.sin(dotAngle) * dotDist;

        ctx.beginPath();
        ctx.arc(dx, dy, Math.max(1, radius * 0.1), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}

// Preset Definitions
const PRESETS = {
  cherry_blossom: {
    petalCount: 5,
    layers: 1,
    petalLength: 68,
    petalWidth: 44,
    shape: 'heart',
    baseColor: '#fb7185',
    tipColor: '#ffe4e6',
    centerColor: '#fbbf24'
  },
  sunflower: {
    petalCount: 18,
    layers: 2,
    petalLength: 82,
    petalWidth: 26,
    shape: 'pointed',
    baseColor: '#f59e0b',
    tipColor: '#fef08a',
    centerColor: '#451a03'
  },
  rose: {
    petalCount: 14,
    layers: 3,
    petalLength: 72,
    petalWidth: 48,
    shape: 'swirl',
    baseColor: '#be123c',
    tipColor: '#fb7185',
    centerColor: '#facc15'
  },
  tulip: {
    petalCount: 6,
    layers: 1,
    petalLength: 78,
    petalWidth: 38,
    shape: 'rounded',
    baseColor: '#9333ea',
    tipColor: '#f472b6',
    centerColor: '#fde047'
  },
  daisy: {
    petalCount: 16,
    layers: 1,
    petalLength: 65,
    petalWidth: 22,
    shape: 'rounded',
    baseColor: '#cbd5e1',
    tipColor: '#ffffff',
    centerColor: '#eab308'
  },
  glow_lotus: {
    petalCount: 10,
    layers: 2,
    petalLength: 78,
    petalWidth: 32,
    shape: 'pointed',
    baseColor: '#06b6d4',
    tipColor: '#d946ef',
    centerColor: '#ffffff'
  }
};
