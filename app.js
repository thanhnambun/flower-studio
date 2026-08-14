/**
 * Flower Studio - DIY Creative Studio & Polaroid Photo Card Creator
 * Features: Live Polaroid Preview, Photo Uploader, Dual/Frame/Solo Layouts,
 * Bulletproof Blob PNG Downloader, Fortune Teller, and Lo-Fi Synth.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const canvas = document.getElementById('flowerCanvas');
  const ctx = canvas.getContext('2d');
  const gardenTip = document.getElementById('garden-tip');
  const gardenTipText = document.getElementById('garden-tip-text');
  const tutorialOverlay = document.getElementById('tutorial-overlay');
  const customControls = document.getElementById('custom-controls');
  const sectionStudioAction = document.getElementById('section-studio-action');
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const btnMobileControls = document.getElementById('btn-mobile-controls');
  const btnCloseSidebarMobile = document.getElementById('btn-close-sidebar-mobile');
  const btnRandomizeFlower = document.getElementById('btn-randomize-flower');

  // Header & Personalization Elements
  const headerCrushTitle = document.getElementById('header-crush-title');
  const badgeCrushName = document.getElementById('badge-crush-name');
  const btnOpenNameModal = document.getElementById('btn-open-name-modal');
  const btnBadgeName = document.getElementById('btn-badge-name');
  const headerAvatarImg = document.getElementById('header-avatar-img');
  const headerAvatarPlaceholder = document.getElementById('header-avatar-placeholder');
  
  // Polaroid Modal Elements
  const modalPolaroidStudio = document.getElementById('modal-polaroid-studio');
  const btnOpenPolaroidModal = document.getElementById('btn-open-polaroid-modal');
  const btnClosePolaroidStudio = document.getElementById('btn-close-polaroid-studio');
  const polaroidRenderCanvas = document.getElementById('polaroidRenderCanvas');
  const polaroidCtx = polaroidRenderCanvas.getContext('2d');
  const layoutButtons = document.querySelectorAll('.layout-btn');
  const inputCardPhoto = document.getElementById('input-card-photo');
  const btnTriggerUpload = document.getElementById('btn-trigger-upload');
  const uploadedPhotoBox = document.getElementById('uploaded-photo-box');
  const previewPhotoThumb = document.getElementById('preview-photo-thumb');
  const btnRemovePhoto = document.getElementById('btn-remove-photo');
  const inputCardCaption = document.getElementById('input-card-caption');
  const btnDownloadPolaroidPng = document.getElementById('btn-download-polaroid-png');

  // Secret Note Modal
  const modalSecretNote = document.getElementById('modal-secret-note');
  const btnOpenNote = document.getElementById('btn-open-note');
  const btnCloseNote = document.getElementById('btn-close-note');
  const noteRecipientText = document.getElementById('note-recipient-text');
  const noteCurrentDate = document.getElementById('note-current-date');
  const noteBodyText = document.getElementById('note-body-text');
  const btnNoteTryBloom = document.getElementById('btn-note-try-bloom');

  // Fortune Modal
  const modalFortune = document.getElementById('modal-fortune');
  const btnFlowerFortune = document.getElementById('btn-flower-fortune');
  const btnCloseFortune = document.getElementById('btn-close-fortune');
  const fortuneEmoji = document.getElementById('fortune-emoji');
  const fortuneFlowerName = document.getElementById('fortune-flower-name');
  const fortuneQuoteText = document.getElementById('fortune-quote-text');
  const fortuneLuckyColor = document.getElementById('fortune-lucky-color');
  const fortuneEnergyLevel = document.getElementById('fortune-energy-level');
  const btnApplyFortunePalette = document.getElementById('btn-apply-fortune-palette');

  // Customizer Modal
  const modalCustomize = document.getElementById('modal-customize');
  const btnCloseCustomize = document.getElementById('btn-close-customize');
  const inputCrushName = document.getElementById('input-crush-name');
  const inputAvatarPhoto = document.getElementById('input-avatar-photo');
  const btnTriggerAvatarUpload = document.getElementById('btn-trigger-avatar-upload');
  const btnRemoveAvatar = document.getElementById('btn-remove-avatar');
  const inputGardenTitle = document.getElementById('input-garden-title');
  const btnSaveCustomize = document.getElementById('btn-save-customize');
  const btnResetDefaultText = document.getElementById('btn-reset-default-text');

  // Surprise Bloom Button
  const btnSurpriseBloom = document.getElementById('btn-surprise-bloom');

  // Mode Buttons
  const modeTabs = document.querySelectorAll('.mode-tab');
  
  // Controls
  const inputPetalCount = document.getElementById('input-petal-count');
  const inputLayers = document.getElementById('input-layers');
  const inputPetalSize = document.getElementById('input-petal-size');
  const inputPetalWidth = document.getElementById('input-petal-width');
  const valPetalCount = document.getElementById('val-petal-count');
  const valLayers = document.getElementById('val-layers');
  const valPetalSize = document.getElementById('val-petal-size');
  const valPetalWidth = document.getElementById('val-petal-width');
  const shapeButtons = document.querySelectorAll('.seg-btn');
  const inputColorBase = document.getElementById('input-color-petal-base');
  const inputColorTip = document.getElementById('input-color-petal-tip');
  const inputColorCenter = document.getElementById('input-color-center');
  const paletteChips = document.querySelectorAll('.palette-chip');
  const toggleStem = document.getElementById('toggle-stem');
  const toggleGlow = document.getElementById('toggle-glow');
  const toggleBloomAnim = document.getElementById('toggle-bloom-anim');
  const toggleCuteQuotes = document.getElementById('toggle-cute-quotes');
  const btnDrawCenter = document.getElementById('btn-draw-center');

  // Top action buttons
  const btnToggleBGM = document.getElementById('btn-toggle-bgm');
  const bgmIconOn = document.getElementById('bgm-icon-on');
  const bgmIconOff = document.getElementById('bgm-icon-off');
  const btnTogglePetals = document.getElementById('btn-toggle-petals');
  const btnClearCanvas = document.getElementById('btn-clear-canvas');
  const btnSurpriseBloomMobile = document.getElementById('btn-surprise-bloom-mobile');
  const btnTogglePetalsMobile = document.getElementById('btn-toggle-petals-mobile');
  const btnClearCanvasMobile = document.getElementById('btn-clear-canvas-mobile');

  // HUD
  const hudFlowerCount = document.getElementById('hud-flower-count');
  const hudParticleCount = document.getElementById('hud-particle-count');

  // Tutorial Elements
  const tutStepNum = document.getElementById('tut-step-num');
  const tutStepTitle = document.getElementById('tut-step-title');
  const tutStepDesc = document.getElementById('tut-step-desc');
  const tutProgressFill = document.getElementById('tut-progress-fill');
  const btnTutPrev = document.getElementById('btn-tut-prev');
  const btnTutNext = document.getElementById('btn-tut-next');
  const btnTutPlay = document.getElementById('btn-tut-play');
  const tutPlayIcon = document.getElementById('tut-play-icon');
  const tutPlayText = document.getElementById('tut-play-text');

  // Presets
  const presetCards = document.querySelectorAll('.preset-card');

  // Cute Quotes for Speech Bubbles
  const CUTE_QUOTES = [
    "Đóa hoa này xinh xắn giống cậu ghê! ✨",
    "Gu phối màu của cậu đỉnh thật sự 🎨",
    "Cậu vừa tạo ra một bông hoa độc nhất vô nhị!",
    "Hôm nay có gì vui kể tớ nghe với nhé 🌿",
    "Thiết kế này chấm 10/10 điểm tinh tế 💯",
    "Ngồi vẽ hoa có thấy đỡ mệt mỏi hơn chưa nè? 😊",
    "Bông hoa này tỏa sáng rạng rỡ nhất luôn 🌸",
    "Khéo tay thế này ai làm lại cậu nữa 🌟",
    "Chúc cậu luôn có một ngày thật ngọt ngào 💕"
  ];

  const DEFAULT_NOTE_TEXT = 
`Chào cậu nhé! ✨

Biết cậu thích những thứ xinh xắn và nghệ thuật, nên tớ đã tự tay lập trình một chiếc Flower Studio nhỏ này tặng riêng cho cậu ngồi mày mò, nghịch màu và ngắm hoa lúc rảnh rỗi hoặc sau những giờ học tập/làm việc mệt mỏi.

Ở đây cậu có thể tự do uốn nắn từng cánh hoa, thử các bảng màu theo gu riêng, hoặc bấm nút "Bói Hoa Hôm Nay" để xem một quẻ may mắn vui vẻ nhé!

Mong là góc nhỏ này sẽ mang lại cho cậu một chút niềm vui và sự thư giãn. Chúc cậu luôn mỉm cười rạng rỡ như đóa hoa đẹp nhất do chính tay cậu tạo ra! 🌸`;

  // Persistent User Data
  let crushData = {
    crushName: 'Cậu',
    avatarBase64: '',
    uploadedPhotoBase64: '',
    gardenTitle: 'Góc Sáng Tạo Của Cậu ✨'
  };

  // Polaroid State
  let currentCardLayout = 'dual'; // 'dual' | 'flower_crown' | 'flower_only'
  let uploadedUserImage = null;

  function loadCrushData() {
    try {
      const saved = localStorage.getItem('flower_diy_crush_data_v2');
      if (saved) {
        crushData = { ...crushData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load local data', e);
    }
    updateCrushUI();

    if (crushData.uploadedPhotoBase64) {
      const img = new Image();
      img.onload = () => {
        uploadedUserImage = img;
        previewPhotoThumb.src = crushData.uploadedPhotoBase64;
        uploadedPhotoBox.classList.remove('hidden');
        renderPolaroidCardPreview();
      };
      img.src = crushData.uploadedPhotoBase64;
    }
  }

  function saveCrushData() {
    try {
      localStorage.setItem('flower_diy_crush_data_v2', JSON.stringify(crushData));
    } catch (e) {
      console.warn('Could not save local data', e);
    }
    updateCrushUI();
  }

  function updateCrushUI() {
    headerCrushTitle.textContent = crushData.gardenTitle;
    badgeCrushName.textContent = `Dành Cho ${crushData.crushName}`;
    noteRecipientText.textContent = `Gửi ${crushData.crushName} Nhé ✨`;
    inputCardCaption.value = `Tác phẩm của ${crushData.crushName} ✨`;

    if (crushData.avatarBase64) {
      headerAvatarImg.src = crushData.avatarBase64;
      headerAvatarImg.classList.remove('hidden');
      headerAvatarPlaceholder.classList.add('hidden');
      btnRemoveAvatar.classList.remove('hidden');
    } else {
      headerAvatarImg.classList.add('hidden');
      headerAvatarPlaceholder.classList.remove('hidden');
      btnRemoveAvatar.classList.add('hidden');
    }
  }

  // App State
  let currentMode = 'studio';
  let flowers = [];
  let particles = [];
  let loveBubbles = [];
  let fairyDust = [];
  let fallingPetals = [];
  let isPetalRainActive = true;
  let isPointerDown = false;
  let lastPointerPos = { x: 0, y: 0 };
  let currentPreset = 'cherry_blossom';

  // Live Current Flower Configuration
  const currentConfig = {
    petalCount: 5,
    layers: 1,
    petalLength: 68,
    petalWidth: 44,
    shape: 'heart',
    baseColor: '#fb7185',
    tipColor: '#ffe4e6',
    centerColor: '#fbbf24',
    hasStem: true,
    hasGlow: true,
    isAnimated: true
  };

  const QUICK_PALETTES = {
    sakura: { base: '#fb7185', tip: '#ffe4e6', center: '#fbbf24' },
    sunset: { base: '#ea580c', tip: '#fde047', center: '#78350f' },
    lavender: { base: '#7c3aed', tip: '#e9d5ff', center: '#fde047' },
    mint: { base: '#059669', tip: '#a7f3d0', center: '#fef08a' },
    midnight: { base: '#06b6d4', tip: '#f43f5e', center: '#ffffff' }
  };

  const tutorialSteps = [
    {
      step: 1,
      title: '1. Xác định Tâm hoa & Nhụy hoa',
      desc: 'Điểm gốc (x0, y0) là trung tâm hình học. Nhụy hoa hình tròn được phủ gradient chuyển sắc tạo chiều sâu không gian.'
    },
    {
      step: 2,
      title: '2. Tạo hình Cánh hoa đầu tiên',
      desc: 'Cánh hoa được uốn lượn bằng 2 đường cong Bézier xuất phát từ tâm, mở rộng sang hai bên và khép lại mềm mại.'
    },
    {
      step: 3,
      title: '3. Xoay góc (Δθ = 360° / N) & Vẽ đủ vòng cánh',
      desc: 'Sử dụng vòng lặp xoay hệ trục tọa độ theo góc đều nhau để tạo sự cân xứng tuyệt đối cho lớp cánh hoa bên ngoài.'
    },
    {
      step: 4,
      title: '4. Xếp chồng các tầng cánh bên trong',
      desc: 'Thêm các lớp cánh hoa nhỏ dần vào bên trong với độ lệch góc đan xen, tạo cảm giác bông hoa dày dặn, tự nhiên.'
    },
    {
      step: 5,
      title: '5. Vẽ Thân hoa uốn lượn & Lá cây',
      desc: 'Đường cong mềm mại nối từ đáy lên nâng đỡ bông hoa, kết hợp 2 chiếc lá xanh điểm xuyết gân lá đối xứng.'
    },
    {
      step: 6,
      title: '6. Hoàn thiện với Phấn hoa & Hiệu ứng phát sáng',
      desc: 'Thêm các hạt nhụy hoa li ti, bóng mờ dạ quang và các hạt phấn hoa bay lượn trong gió tạo sự sống động!'
    }
  ];
  let currentTutStep = 1;
  let tutAutoPlayInterval = null;

  const FORTUNE_LIST = [
    {
      emoji: '🌸',
      name: 'Hoa Anh Đào (May Mắn 100%)',
      quote: '"Hôm nay sự ngọt ngào và năng lượng tích cực của cậu sẽ làm bừng sáng mọi nơi cậu bước tới!"',
      colorName: 'Hồng Phấn & Trắng Ngọc Trai',
      energy: 'Dịu dàng & Đáng yêu ✨',
      palette: { base: '#fb7185', tip: '#fff1f2', center: '#fbbf24' }
    },
    {
      emoji: '🌻',
      name: 'Hoa Hướng Dương (Rực Rỡ & May Mắn)',
      quote: '"Mọi điều tốt lành và may mắn đang trên đường bay tới với cậu. Cứ tự tin tỏa sáng nhé!"',
      colorName: 'Vàng Nắng & Cam Mật Ong',
      energy: 'Tràn đầy sức sống ☀️',
      palette: { base: '#f59e0b', tip: '#fef08a', center: '#451a03' }
    },
    {
      emoji: '🪷',
      name: 'Hoa Sen Thanh Khiết (Bình Yên)',
      quote: '"Một ngày êm dịu, nhẹ nhàng và ngập tràn cảm hứng sáng tạo đang chờ đợi cậu."',
      colorName: 'Hồng Sen & Xanh Ngọc',
      energy: 'Thư thái & Thanh lọc tâm hồn 🌿',
      palette: { base: '#ec4899', tip: '#fce7f3', center: '#fde047' }
    },
    {
      emoji: '🌹',
      name: 'Hoa Hồng Đỏ (Kiêu Kỳ & Tự Tin)',
      quote: '"Cậu có một sức hút đặc biệt mà đôi khi chính cậu cũng không nhận ra đâu đấy!"',
      colorName: 'Đỏ Nhung & Hồng Ruby',
      energy: 'Cuốn hút & Tự tin 💖',
      palette: { base: '#be123c', tip: '#fb7185', center: '#facc15' }
    },
    {
      emoji: '🌼',
      name: 'Cúc Họa Mi (Hạnh Phúc Giản Đơn)',
      quote: '"Một niềm vui nho nhỏ, bất ngờ và siêu dễ thương sẽ ghé thăm cậu hôm nay!"',
      colorName: 'Trắng Tinh Khôi & Vàng Chanh',
      energy: 'Trong trẻo & Vui vẻ 🌈',
      palette: { base: '#e2e8f0', tip: '#ffffff', center: '#facc15' }
    }
  ];
  let currentFortuneData = FORTUNE_LIST[0];

  // Setup HiDPI Canvas
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    fallingPetals = [];
    for (let i = 0; i < 26; i++) {
      fallingPetals.push(new FallingPetal(rect.width, rect.height));
    }
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    if (currentMode === 'studio' || currentMode === 'tutorial') {
      recenterStudioFlower();
    }
  });

  function getCanvasLogicalSize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  // Audio Controls
  let bgmPlaying = false;
  btnToggleBGM?.addEventListener('click', () => {
    bgmPlaying = window.soundEngine.toggleBGM();
    if (bgmPlaying) {
      bgmIconOn.classList.remove('hidden');
      bgmIconOff.classList.add('hidden');
      btnToggleBGM.classList.add('active-tint');
    } else {
      bgmIconOn.classList.add('hidden');
      bgmIconOff.classList.remove('hidden');
      btnToggleBGM.classList.remove('active-tint');
    }
  });

  // Petal Rain Toggle
  function togglePetalRain() {
    isPetalRainActive = !isPetalRainActive;
    btnTogglePetals?.classList.toggle('active-tint', isPetalRainActive);
    btnTogglePetalsMobile?.classList.toggle('active-tint', isPetalRainActive);
    window.soundEngine.playSparkle();
  }

  btnTogglePetals?.addEventListener('click', togglePetalRain);
  btnTogglePetalsMobile?.addEventListener('click', togglePetalRain);

  // Clear Canvas Handler
  function handleClearCanvas() {
    flowers = [];
    particles = [];
    loveBubbles = [];
    if (currentMode === 'studio') {
      spawnStudioFlower(true);
    }
    window.soundEngine.playSparkle();
  }

  btnClearCanvas?.addEventListener('click', handleClearCanvas);
  btnClearCanvasMobile?.addEventListener('click', () => {
    toggleMobileSidebar(false);
    handleClearCanvas();
  });

  btnSurpriseBloomMobile?.addEventListener('click', () => {
    toggleMobileSidebar(false);
    bloomSurpriseShow();
  });

  // Switch App Mode
  function setMode(mode) {
    currentMode = mode;
    modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    if (tutAutoPlayInterval) {
      clearInterval(tutAutoPlayInterval);
      tutAutoPlayInterval = null;
      tutPlayText.textContent = 'Tự Động Phát';
    }

    if (mode === 'studio') {
      gardenTip.classList.remove('hidden', 'fade-out');
      gardenTipText.textContent = `Tự do kéo các thanh trượt bên trái để biến hóa ra đóa hoa mang phong cách của ${crushData.crushName} nhé!`;
      tutorialOverlay.classList.add('hidden');
      customControls.style.display = 'flex';
      sectionStudioAction.style.display = 'block';
      flowers = [];
      particles = [];
      loveBubbles = [];
      spawnStudioFlower();
      setTimeout(() => gardenTip.classList.add('fade-out'), 5000);
    } else if (mode === 'garden') {
      gardenTip.classList.remove('hidden', 'fade-out');
      gardenTipText.textContent = `Chạm hoặc kéo chuột để thỏa thích gieo trồng cả một thung lũng hoa rực rỡ!`;
      tutorialOverlay.classList.add('hidden');
      customControls.style.display = 'flex';
      sectionStudioAction.style.display = 'none';
      setTimeout(() => gardenTip.classList.add('fade-out'), 4000);
    } else if (mode === 'brush') {
      gardenTip.classList.remove('hidden', 'fade-out');
      gardenTipText.textContent = 'Kéo chuột để vẽ nên dải hoa lấp lánh như bụi tiên!';
      tutorialOverlay.classList.add('hidden');
      customControls.style.display = 'flex';
      sectionStudioAction.style.display = 'none';
      setTimeout(() => gardenTip.classList.add('fade-out'), 4000);
    } else if (mode === 'tutorial') {
      gardenTip.classList.add('hidden');
      tutorialOverlay.classList.remove('hidden');
      customControls.style.display = 'none';
      sectionStudioAction.style.display = 'none';
      flowers = [];
      particles = [];
      loveBubbles = [];
      setTutorialStep(1);
    }
  }

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => setMode(tab.dataset.mode));
  });

  // Apply Presets
  function applyPreset(presetKey) {
    if (!PRESETS[presetKey]) return;
    const p = PRESETS[presetKey];
    currentPreset = presetKey;

    currentConfig.petalCount = p.petalCount;
    currentConfig.layers = p.layers;
    currentConfig.petalLength = p.petalLength;
    currentConfig.petalWidth = p.petalWidth;
    currentConfig.shape = p.shape;
    currentConfig.baseColor = p.baseColor;
    currentConfig.tipColor = p.tipColor;
    currentConfig.centerColor = p.centerColor;

    inputPetalCount.value = p.petalCount;
    valPetalCount.textContent = p.petalCount;
    inputLayers.value = p.layers;
    valLayers.textContent = p.layers;
    inputPetalSize.value = p.petalLength;
    valPetalSize.textContent = p.petalLength;
    inputPetalWidth.value = p.petalWidth;
    valPetalWidth.textContent = p.petalWidth;
    inputColorBase.value = p.baseColor;
    inputColorTip.value = p.tipColor;
    inputColorCenter.value = p.centerColor;

    shapeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.shape === p.shape);
    });

    presetCards.forEach(card => {
      card.classList.toggle('active', card.dataset.preset === presetKey);
    });

    if (currentMode === 'studio') {
      spawnStudioFlower();
    }
    window.soundEngine.playSparkle();
  }

  presetCards.forEach(card => {
    card.addEventListener('click', () => applyPreset(card.dataset.preset));
  });

  // Palette Chips
  paletteChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const palette = QUICK_PALETTES[chip.dataset.palette];
      if (palette) {
        currentConfig.baseColor = palette.base;
        currentConfig.tipColor = palette.tip;
        currentConfig.centerColor = palette.center;

        inputColorBase.value = palette.base;
        inputColorTip.value = palette.tip;
        inputColorCenter.value = palette.center;

        if (currentMode === 'studio') spawnStudioFlower(false);
        window.soundEngine.playSparkle();
      }
    });
  });

  // UI Event Listeners for Sliders & Colors
  inputPetalCount?.addEventListener('input', (e) => {
    currentConfig.petalCount = parseInt(e.target.value);
    valPetalCount.textContent = currentConfig.petalCount;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  inputLayers?.addEventListener('input', (e) => {
    currentConfig.layers = parseInt(e.target.value);
    valLayers.textContent = currentConfig.layers;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  inputPetalSize?.addEventListener('input', (e) => {
    currentConfig.petalLength = parseInt(e.target.value);
    valPetalSize.textContent = currentConfig.petalLength;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  inputPetalWidth?.addEventListener('input', (e) => {
    currentConfig.petalWidth = parseInt(e.target.value);
    valPetalWidth.textContent = currentConfig.petalWidth;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  shapeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      shapeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentConfig.shape = btn.dataset.shape;
      if (currentMode === 'studio') spawnStudioFlower(false);
    });
  });

  inputColorBase?.addEventListener('input', (e) => {
    currentConfig.baseColor = e.target.value;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  inputColorTip?.addEventListener('input', (e) => {
    currentConfig.tipColor = e.target.value;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  inputColorCenter?.addEventListener('input', (e) => {
    currentConfig.centerColor = e.target.value;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  toggleStem?.addEventListener('change', (e) => {
    currentConfig.hasStem = e.target.checked;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  toggleGlow?.addEventListener('change', (e) => {
    currentConfig.hasGlow = e.target.checked;
    if (currentMode === 'studio') spawnStudioFlower(false);
  });

  toggleBloomAnim?.addEventListener('change', (e) => {
    currentConfig.isAnimated = e.target.checked;
  });

  btnDrawCenter?.addEventListener('click', () => {
    spawnStudioFlower(true);
    window.soundEngine.playBloomChord();
  });

  // Mobile Sidebar Controls
  function toggleMobileSidebar(forceState) {
    const shouldOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('mobile-open');
    if (shouldOpen) {
      sidebar.classList.add('mobile-open');
      sidebarBackdrop?.classList.remove('hidden');
      window.soundEngine.playSparkle();
    } else {
      sidebar.classList.remove('mobile-open');
      sidebarBackdrop?.classList.add('hidden');
    }
  }

  btnMobileControls?.addEventListener('click', () => toggleMobileSidebar());
  btnCloseSidebarMobile?.addEventListener('click', () => toggleMobileSidebar(false));
  sidebarBackdrop?.addEventListener('click', () => toggleMobileSidebar(false));

  // Magic Randomizer Engine (Curated aesthetic palettes for guaranteed beauty)
  const CURATED_RANDOM_PALETTES = [
    { base: '#fb7185', tip: '#ffe4e6', center: '#fbbf24' }, // Sakura Rose
    { base: '#ea580c', tip: '#fde047', center: '#78350f' }, // Sunset Amber
    { base: '#7c3aed', tip: '#e9d5ff', center: '#fde047' }, // Lavender Dream
    { base: '#059669', tip: '#a7f3d0', center: '#fef08a' }, // Mint Emerald
    { base: '#be123c', tip: '#f43f5e', center: '#facc15' }, // Ruby Velvet
    { base: '#06b6d4', tip: '#f43f5e', center: '#ffffff' }, // Midnight Neon
    { base: '#f472b6', tip: '#fed7aa', center: '#fbbf24' }, // Peach Blossom
    { base: '#818cf8', tip: '#c7d2fe', center: '#fef08a' }  // Blue Iris
  ];

  function randomizeFlower() {
    const shapes = ['heart', 'rounded', 'pointed', 'swirl'];
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    currentConfig.petalCount = randInt(5, 18);
    currentConfig.layers = randInt(1, 3);
    currentConfig.petalLength = randInt(55, 95);
    currentConfig.petalWidth = randInt(25, 60);
    currentConfig.shape = shapes[Math.floor(Math.random() * shapes.length)];

    const p = CURATED_RANDOM_PALETTES[Math.floor(Math.random() * CURATED_RANDOM_PALETTES.length)];
    currentConfig.baseColor = p.base;
    currentConfig.tipColor = p.tip;
    currentConfig.centerColor = p.center;

    // Sync UI Sliders & Inputs
    inputPetalCount.value = currentConfig.petalCount;
    valPetalCount.textContent = currentConfig.petalCount;
    inputLayers.value = currentConfig.layers;
    valLayers.textContent = currentConfig.layers;
    inputPetalSize.value = currentConfig.petalLength;
    valPetalSize.textContent = currentConfig.petalLength;
    inputPetalWidth.value = currentConfig.petalWidth;
    valPetalWidth.textContent = currentConfig.petalWidth;
    inputColorBase.value = currentConfig.baseColor;
    inputColorTip.value = currentConfig.tipColor;
    inputColorCenter.value = currentConfig.centerColor;

    shapeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.shape === currentConfig.shape);
    });

    presetCards.forEach(card => card.classList.remove('active'));

    spawnStudioFlower(true);
    window.soundEngine.playBloomChord();
  }

  btnRandomizeFlower?.addEventListener('click', randomizeFlower);

  // ==========================================
  // POLAROID PHOTO CARD STUDIO ENGINE
  // ==========================================

  function openPolaroidStudio() {
    modalPolaroidStudio.classList.remove('hidden');
    inputCardCaption.value = `Tác phẩm của ${crushData.crushName} ✨`;
    renderPolaroidCardPreview();
    window.soundEngine.playSparkle();
  }

  btnOpenPolaroidModal?.addEventListener('click', openPolaroidStudio);
  btnClosePolaroidStudio?.addEventListener('click', () => modalPolaroidStudio.classList.add('hidden'));

  // Layout Buttons
  layoutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      layoutButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCardLayout = btn.dataset.layout;
      renderPolaroidCardPreview();
      window.soundEngine.playSparkle();
    });
  });

  inputCardCaption?.addEventListener('input', () => {
    renderPolaroidCardPreview();
  });

  // Trigger Photo Upload
  btnTriggerUpload?.addEventListener('click', () => inputCardPhoto?.click());

  inputCardPhoto?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      crushData.uploadedPhotoBase64 = dataUrl;
      saveCrushData();

      const img = new Image();
      img.onload = () => {
        uploadedUserImage = img;
        previewPhotoThumb.src = dataUrl;
        uploadedPhotoBox.classList.remove('hidden');
        renderPolaroidCardPreview();
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });

  btnRemovePhoto?.addEventListener('click', () => {
    uploadedUserImage = null;
    crushData.uploadedPhotoBase64 = '';
    inputCardPhoto.value = '';
    uploadedPhotoBox.classList.add('hidden');
    saveCrushData();
    renderPolaroidCardPreview();
  });

  // Avatar in Customizer
  btnTriggerAvatarUpload?.addEventListener('click', () => inputAvatarPhoto?.click());

  inputAvatarPhoto?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      crushData.avatarBase64 = dataUrl;
      saveCrushData();
    };
    reader.readAsDataURL(file);
  });

  btnRemoveAvatar?.addEventListener('click', () => {
    crushData.avatarBase64 = '';
    inputAvatarPhoto.value = '';
    saveCrushData();
  });

  // Render Polaroid Card function (used both for Live Preview & High-Res Export)
  function drawPolaroidCard(targetCtx, width, height) {
    // 1. Background Paper (Clean white with subtle warm texture)
    targetCtx.fillStyle = '#ffffff';
    targetCtx.fillRect(0, 0, width, height);

    // Subtle border
    targetCtx.strokeStyle = '#e2e8f0';
    targetCtx.lineWidth = Math.max(2, width * 0.004);
    targetCtx.strokeRect(1, 1, width - 2, height - 2);

    const pad = width * 0.07;
    const photoWindowWidth = width - pad * 2;
    const photoWindowHeight = height * 0.72;

    // Dark Photo Backdrop
    const grad = targetCtx.createLinearGradient(pad, pad, pad + photoWindowWidth, pad + photoWindowHeight);
    grad.addColorStop(0, '#13182c');
    grad.addColorStop(1, '#090b14');
    targetCtx.fillStyle = grad;
    targetCtx.fillRect(pad, pad, photoWindowWidth, photoWindowHeight);

    // Clip to Photo Window
    targetCtx.save();
    targetCtx.beginPath();
    targetCtx.rect(pad, pad, photoWindowWidth, photoWindowHeight);
    targetCtx.clip();

    // Render based on selected layout
    if (currentCardLayout === 'dual') {
      // DUAL LAYOUT: Photo on left, Flower on right (or top/bottom)
      if (uploadedUserImage) {
        // Draw User Photo in left half
        const halfWidth = photoWindowWidth * 0.48;
        const photoAspect = uploadedUserImage.width / uploadedUserImage.height;
        const targetAspect = halfWidth / (photoWindowHeight - 20);
        
        let sx = 0, sy = 0, sw = uploadedUserImage.width, sh = uploadedUserImage.height;
        if (photoAspect > targetAspect) {
          sw = uploadedUserImage.height * targetAspect;
          sx = (uploadedUserImage.width - sw) / 2;
        } else {
          sh = uploadedUserImage.width / targetAspect;
          sy = (uploadedUserImage.height - sh) / 2;
        }

        targetCtx.drawImage(uploadedUserImage, sx, sy, sw, sh, pad + 10, pad + 10, halfWidth, photoWindowHeight - 20);
        targetCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        targetCtx.strokeRect(pad + 10, pad + 10, halfWidth, photoWindowHeight - 20);

        // Draw Flower on right half
        const flowerCenterX = pad + halfWidth + (photoWindowWidth - halfWidth) / 2 + 5;
        const flowerCenterY = pad + photoWindowHeight * 0.52;
        
        const cardFlower = new Flower({
          ...currentConfig,
          x: flowerCenterX,
          y: flowerCenterY,
          canvasHeight: pad + photoWindowHeight,
          petalLength: Math.min(width, height) * 0.16,
          petalWidth: Math.min(width, height) * 0.09,
          isAnimated: false
        });
        cardFlower.draw(targetCtx);
      } else {
        // Draw full main flower
        const flowerCenterX = pad + photoWindowWidth / 2;
        const flowerCenterY = pad + photoWindowHeight * 0.52;
        const cardFlower = new Flower({
          ...currentConfig,
          x: flowerCenterX,
          y: flowerCenterY,
          canvasHeight: pad + photoWindowHeight,
          petalLength: Math.min(width, height) * 0.22,
          petalWidth: Math.min(width, height) * 0.12,
          isAnimated: false
        });
        cardFlower.draw(targetCtx);

        // Prompt text
        targetCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        targetCtx.font = `500 ${width * 0.026}px "Plus Jakarta Sans", sans-serif`;
        targetCtx.textAlign = 'center';
        targetCtx.fillText('(Tải ảnh của bạn ấy lên để hiện song hành)', flowerCenterX, pad + photoWindowHeight * 0.9);
      }
    } else if (currentCardLayout === 'flower_crown') {
      // FLOWER CROWN LAYOUT: Photo in center framed by blooming blossoms
      if (uploadedUserImage) {
        const photoSize = Math.min(photoWindowWidth, photoWindowHeight) * 0.6;
        const px = pad + (photoWindowWidth - photoSize) / 2;
        const py = pad + (photoWindowHeight - photoSize) / 2;

        targetCtx.drawImage(uploadedUserImage, 0, 0, uploadedUserImage.width, uploadedUserImage.height, px, py, photoSize, photoSize);
        targetCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        targetCtx.lineWidth = 3;
        targetCtx.strokeRect(px, py, photoSize, photoSize);

        // Surrounding mini flowers
        const corners = [
          { x: px - 10, y: py - 10 },
          { x: px + photoSize + 10, y: py - 10 },
          { x: px - 10, y: py + photoSize + 10 },
          { x: px + photoSize + 10, y: py + photoSize + 10 }
        ];

        corners.forEach(c => {
          const miniFlower = new Flower({
            ...currentConfig,
            x: c.x,
            y: c.y,
            hasStem: false,
            petalLength: photoSize * 0.25,
            petalWidth: photoSize * 0.14,
            isAnimated: false
          });
          miniFlower.draw(targetCtx);
        });
      } else {
        const flowerCenterX = pad + photoWindowWidth / 2;
        const flowerCenterY = pad + photoWindowHeight * 0.52;
        const cardFlower = new Flower({
          ...currentConfig,
          x: flowerCenterX,
          y: flowerCenterY,
          canvasHeight: pad + photoWindowHeight,
          petalLength: Math.min(width, height) * 0.22,
          petalWidth: Math.min(width, height) * 0.12,
          isAnimated: false
        });
        cardFlower.draw(targetCtx);
      }
    } else {
      // FLOWER ONLY SOLO LAYOUT
      const flowerCenterX = pad + photoWindowWidth / 2;
      const flowerCenterY = pad + photoWindowHeight * 0.52;
      const cardFlower = new Flower({
        ...currentConfig,
        x: flowerCenterX,
        y: flowerCenterY,
        canvasHeight: pad + photoWindowHeight,
        petalLength: Math.min(width, height) * 0.23,
        petalWidth: Math.min(width, height) * 0.13,
        isAnimated: false
      });
      cardFlower.draw(targetCtx);
    }

    targetCtx.restore();

    // Inner shadow frame on photo window
    targetCtx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    targetCtx.lineWidth = 1;
    targetCtx.strokeRect(pad, pad, photoWindowWidth, photoWindowHeight);

    // Bottom Caption & Meta
    const captionText = inputCardCaption.value.trim() || `Tác phẩm của ${crushData.crushName} ✨`;
    targetCtx.fillStyle = '#0f172a';
    targetCtx.font = `700 ${width * 0.046}px "Plus Jakarta Sans", sans-serif`;
    targetCtx.textAlign = 'center';
    targetCtx.textBaseline = 'middle';
    targetCtx.fillText(captionText, width / 2, height * 0.83);

    // Date & Signature
    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} • Flower Studio`;
    targetCtx.fillStyle = '#94a3b8';
    targetCtx.font = `500 ${width * 0.028}px "Plus Jakarta Sans", sans-serif`;
    targetCtx.fillText(dateStr, width / 2, height * 0.91);
  }

  function renderPolaroidCardPreview() {
    const previewWidth = 560;
    const previewHeight = 700;
    polaroidRenderCanvas.width = previewWidth;
    polaroidRenderCanvas.height = previewHeight;
    drawPolaroidCard(polaroidCtx, previewWidth, previewHeight);
  }

  // BULLETPROOF HD DOWNLOAD VIA BLOB (Guarantees image opens 100% reliably)
  btnDownloadPolaroidPng?.addEventListener('click', async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    const exportCanvas = document.createElement('canvas');
    const expCtx = exportCanvas.getContext('2d');
    
    // Standard High Resolution 1200 x 1500 px
    const expWidth = 1200;
    const expHeight = 1500;
    exportCanvas.width = expWidth;
    exportCanvas.height = expHeight;

    drawPolaroidCard(expCtx, expWidth, expHeight);

    exportCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `thiep-anh-hoa-${crushData.crushName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      window.soundEngine.playBloomChord();
    }, 'image/png', 1.0);
  });

  // ==========================================
  // SECRET NOTE & FORTUNE
  // ==========================================

  let typewriterTimer = null;
  function openSecretNoteModal() {
    modalSecretNote.classList.remove('hidden');
    noteRecipientText.textContent = `Gửi ${crushData.crushName} Nhé ✨`;
    
    const now = new Date();
    noteCurrentDate.textContent = `Ngày ${now.getDate()} tháng ${now.getMonth() + 1}, ${now.getFullYear()} 🌿`;

    noteBodyText.innerHTML = '';
    const fullText = DEFAULT_NOTE_TEXT;
    let charIdx = 0;

    if (typewriterTimer) clearInterval(typewriterTimer);
    
    typewriterTimer = setInterval(() => {
      if (charIdx < fullText.length) {
        noteBodyText.textContent = fullText.slice(0, charIdx + 1);
        charIdx++;
      } else {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
      }
    }, 24);

    window.soundEngine.playSparkle();
  }

  btnOpenNote?.addEventListener('click', openSecretNoteModal);
  btnCloseNote?.addEventListener('click', () => {
    modalSecretNote.classList.add('hidden');
    if (typewriterTimer) clearInterval(typewriterTimer);
  });
  btnNoteTryBloom?.addEventListener('click', () => {
    modalSecretNote.classList.add('hidden');
    setMode('studio');
    spawnStudioFlower(true);
    window.soundEngine.playBloomChord();
  });

  function openFortuneModal() {
    currentFortuneData = FORTUNE_LIST[Math.floor(Math.random() * FORTUNE_LIST.length)];
    fortuneEmoji.textContent = currentFortuneData.emoji;
    fortuneFlowerName.textContent = currentFortuneData.name;
    fortuneQuoteText.textContent = currentFortuneData.quote;
    fortuneLuckyColor.textContent = currentFortuneData.colorName;
    fortuneEnergyLevel.textContent = currentFortuneData.energy;

    modalFortune.classList.remove('hidden');
    window.soundEngine.playBloomChord();
  }

  btnFlowerFortune?.addEventListener('click', openFortuneModal);
  btnCloseFortune?.addEventListener('click', () => modalFortune.classList.add('hidden'));

  btnApplyFortunePalette?.addEventListener('click', () => {
    modalFortune.classList.add('hidden');
    const p = currentFortuneData.palette;
    currentConfig.baseColor = p.base;
    currentConfig.tipColor = p.tip;
    currentConfig.centerColor = p.center;

    inputColorBase.value = p.base;
    inputColorTip.value = p.tip;
    inputColorCenter.value = p.center;

    setMode('studio');
    spawnStudioFlower(true);
    window.soundEngine.playBloomChord();
  });

  // Customizer Modal
  function openCustomizeModal() {
    inputCrushName.value = crushData.crushName;
    inputGardenTitle.value = crushData.gardenTitle;
    modalCustomize.classList.remove('hidden');
  }

  btnOpenNameModal?.addEventListener('click', openCustomizeModal);
  btnBadgeName?.addEventListener('click', openCustomizeModal);

  btnCloseCustomize?.addEventListener('click', () => {
    modalCustomize.classList.add('hidden');
  });

  btnSaveCustomize?.addEventListener('click', () => {
    crushData.crushName = inputCrushName.value.trim() || 'Cậu';
    crushData.gardenTitle = inputGardenTitle.value.trim() || `Góc Sáng Tạo Của ${crushData.crushName} ✨`;
    saveCrushData();
    modalCustomize.classList.add('hidden');
    window.soundEngine.playSparkle();
  });

  btnResetDefaultText?.addEventListener('click', () => {
    inputCrushName.value = 'Cậu';
    inputGardenTitle.value = 'Góc Sáng Tạo Của Cậu ✨';
  });

  // Surprise Bloom Show
  function bloomSurpriseShow() {
    flowers = [];
    particles = [];
    loveBubbles = [];
    const size = getCanvasLogicalSize();
    const centerX = size.width / 2;
    const centerY = size.height * 0.48;
    const scale = Math.min(size.width, size.height) * 0.021;

    const totalSurpriseFlowers = 20;
    let index = 0;

    setTimeout(() => {
      const centerFlower = new Flower({
        ...currentConfig,
        x: centerX,
        y: centerY,
        canvasHeight: size.height,
        petalLength: 85,
        petalWidth: 50,
        layers: 3,
        isAnimated: true
      });
      flowers.push(centerFlower);
      window.soundEngine.playBloomChord();
      loveBubbles.push(new FloatingLoveBubble(centerX, centerY - 50, `Tặng ${crushData.crushName} cả khu vườn hoa rực rỡ này! ✨`));
    }, 150);

    const surpriseInterval = setInterval(() => {
      if (index >= totalSurpriseFlowers) {
        clearInterval(surpriseInterval);
        return;
      }

      const t = (index / totalSurpriseFlowers) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      const flowerX = centerX + hx * scale;
      const flowerY = centerY + hy * scale;

      const flower = new Flower({
        ...PRESETS.cherry_blossom,
        x: flowerX,
        y: flowerY,
        canvasHeight: size.height,
        petalLength: 46 + Math.random() * 12,
        petalWidth: 26 + Math.random() * 8,
        isAnimated: true,
        hasStem: false
      });

      flowers.push(flower);
      window.soundEngine.playSparkle();

      index++;
    }, 90);
  }

  btnSurpriseBloom?.addEventListener('click', bloomSurpriseShow);

  // Tutorial Step Engine
  function setTutorialStep(stepIndex) {
    currentTutStep = Math.max(1, Math.min(6, stepIndex));
    const stepData = tutorialSteps[currentTutStep - 1];

    tutStepNum.textContent = stepData.step;
    tutStepTitle.textContent = stepData.title;
    tutStepDesc.textContent = stepData.desc;
    tutProgressFill.style.width = `${(currentTutStep / 6) * 100}%`;

    btnTutPrev.disabled = (currentTutStep === 1);
    btnTutNext.disabled = (currentTutStep === 6);

    const size = getCanvasLogicalSize();
    flowers = [
      new Flower({
        ...currentConfig,
        x: size.width / 2,
        y: size.height / 2,
        canvasHeight: size.height,
        petalLength: 88,
        petalWidth: 44,
        isAnimated: false
      })
    ];
    window.soundEngine.playSparkle();
  }

  btnTutPrev?.addEventListener('click', () => setTutorialStep(currentTutStep - 1));
  btnTutNext?.addEventListener('click', () => setTutorialStep(currentTutStep + 1));

  btnTutPlay?.addEventListener('click', () => {
    if (tutAutoPlayInterval) {
      clearInterval(tutAutoPlayInterval);
      tutAutoPlayInterval = null;
      tutPlayText.textContent = 'Tự Động Phát';
      tutPlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    } else {
      tutPlayText.textContent = 'Tạm Dừng';
      tutPlayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      tutAutoPlayInterval = setInterval(() => {
        if (currentTutStep >= 6) {
          setTutorialStep(1);
        } else {
          setTutorialStep(currentTutStep + 1);
        }
      }, 2400);
    }
  });

  // Flower Spawning
  function plantFlowerAt(x, y, customScale = 1) {
    const size = getCanvasLogicalSize();
    const stemLength = 80 + Math.random() * 60;
    const flower = new Flower({
      ...currentConfig,
      x: x,
      y: y,
      canvasHeight: size.height,
      stemBaseY: Math.min(size.height, y + stemLength),
      petalLength: currentConfig.petalLength * customScale,
      petalWidth: currentConfig.petalWidth * customScale,
      isAnimated: currentConfig.isAnimated
    });

    flowers.push(flower);
    window.soundEngine.playBloomChord();

    if (toggleCuteQuotes.checked && Math.random() < 0.6) {
      const quote = CUTE_QUOTES[Math.floor(Math.random() * CUTE_QUOTES.length)];
      loveBubbles.push(new FloatingLoveBubble(x, y, quote));
    }

    if (flowers.length > 50) {
      flowers.shift();
    }
  }

  function spawnStudioFlower(animated = true) {
    const size = getCanvasLogicalSize();
    flowers = [
      new Flower({
        ...currentConfig,
        x: size.width / 2,
        y: size.height / 2,
        canvasHeight: size.height,
        petalLength: currentConfig.petalLength * 1.15,
        petalWidth: currentConfig.petalWidth * 1.15,
        isAnimated: animated
      })
    ];
  }

  function recenterStudioFlower() {
    const size = getCanvasLogicalSize();
    if (flowers.length > 0) {
      flowers[0].x = size.width / 2;
      flowers[0].y = size.height / 2;
      flowers[0].stemBaseY = size.height;
      flowers[0].stemBaseX = size.width / 2;
    }
  }

  // Pointer & Touch Events
  function getPointerCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  canvas.parentElement.addEventListener('mousedown', (e) => {
    isPointerDown = true;
    const pos = getPointerCanvasPos(e);
    lastPointerPos = pos;

    if (window.innerWidth <= 900 && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
    }

    if (currentMode === 'garden') {
      plantFlowerAt(pos.x, pos.y, 0.75 + Math.random() * 0.5);
    } else if (currentMode === 'brush') {
      plantFlowerAt(pos.x, pos.y, 0.4 + Math.random() * 0.3);
    }
  });

  window.addEventListener('mouseup', () => {
    isPointerDown = false;
  });

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const pos = getPointerCanvasPos(e);

    if (Math.random() < 0.6) {
      fairyDust.push(new FairyDustParticle(pos.x, pos.y));
    }

    if (isPointerDown) {
      const dx = pos.x - lastPointerPos.x;
      const dy = pos.y - lastPointerPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (currentMode === 'garden' && dist > 110) {
        plantFlowerAt(pos.x, pos.y, 0.65 + Math.random() * 0.45);
        lastPointerPos = pos;
      } else if (currentMode === 'brush' && dist > 35) {
        plantFlowerAt(pos.x, pos.y, 0.3 + Math.random() * 0.3);
        lastPointerPos = pos;
      }
    }
  });

  // Touch Support
  canvas.parentElement.addEventListener('touchstart', (e) => {
    isPointerDown = true;
    const pos = getPointerCanvasPos(e);
    lastPointerPos = pos;

    if (window.innerWidth <= 900 && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
    }

    if (currentMode === 'garden') {
      plantFlowerAt(pos.x, pos.y, 0.7 + Math.random() * 0.4);
    }
  }, { passive: true });

  canvas.parentElement.addEventListener('touchmove', (e) => {
    if (!isPointerDown) return;
    const pos = getPointerCanvasPos(e);
    const dx = pos.x - lastPointerPos.x;
    const dy = pos.y - lastPointerPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > (currentMode === 'brush' ? 35 : 110)) {
      plantFlowerAt(pos.x, pos.y, 0.5 + Math.random() * 0.4);
      lastPointerPos = pos;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isPointerDown = false;
  });

  // Clear Canvas
  btnClearCanvas?.addEventListener('click', () => {
    flowers = [];
    particles = [];
    loveBubbles = [];
    window.soundEngine.playSparkle();
  });

  // Main Render Loop (60 FPS)
  function renderLoop() {
    const size = getCanvasLogicalSize();

    ctx.clearRect(0, 0, size.width, size.height);

    // 1. Falling Petals Rain
    if (isPetalRainActive) {
      for (let i = 0; i < fallingPetals.length; i++) {
        const petal = fallingPetals[i];
        petal.update();
        petal.draw(ctx);
      }
    }

    // 2. Flowers
    for (let i = 0; i < flowers.length; i++) {
      const flower = flowers[i];
      flower.update(particles);
      flower.draw(ctx, currentMode === 'tutorial' ? currentTutStep : null);
    }

    // 3. Pollen Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const isAlive = p.update();
      if (isAlive) {
        p.draw(ctx);
      } else {
        particles.splice(i, 1);
      }
    }

    // 4. Fairy Dust
    for (let i = fairyDust.length - 1; i >= 0; i--) {
      const f = fairyDust[i];
      const isAlive = f.update();
      if (isAlive) {
        f.draw(ctx);
      } else {
        fairyDust.splice(i, 1);
      }
    }

    // 5. Speech Bubbles
    for (let i = loveBubbles.length - 1; i >= 0; i--) {
      const b = loveBubbles[i];
      const isAlive = b.update();
      if (isAlive) {
        b.draw(ctx);
      } else {
        loveBubbles.splice(i, 1);
      }
    }

    // Update Stats HUD
    hudFlowerCount.textContent = flowers.length;
    hudParticleCount.textContent = particles.length + fairyDust.length;

    requestAnimationFrame(renderLoop);
  }

  // Initialization
  loadCrushData();
  resizeCanvas();
  applyPreset('cherry_blossom');
  setMode('studio');

  // Start Animation Engine
  renderLoop();
});
