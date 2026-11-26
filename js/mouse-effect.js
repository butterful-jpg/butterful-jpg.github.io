// 全局鼠标点击特效
(function () {
  'use strict';

  // ===== 配置区：想改效果就改这里 =====
  const CONFIG = {
    symbols: ['❤', '★', '✿', '♪', '☺', '✨'],  // 点击出现的符号
    colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5cd85c'],
    fontSize: 22,        // 字号 px
    duration: 900,       // 动画时长 ms
    distance: 90,        // 上浮距离 px
    maxCount: 30         // 同时存在的最大元素数，防止卡顿
  };

  let liveCount = 0;

  // 注入动画样式（只注入一次）
  const style = document.createElement('style');
  style.textContent = `
    @keyframes qm-float-up {
      0%   { transform: translate(-50%, -50%) scale(0.4) rotate(0deg); opacity: 0; }
      15%  { transform: translate(-50%, -60%) scale(1.2) rotate(-8deg); opacity: 1; }
      100% { transform: translate(-50%, -${CONFIG.distance}px) scale(0.9) rotate(12deg); opacity: 0; }
    }
    .qm-click-fx {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      user-select: none;
      font-weight: bold;
      text-shadow: 0 0 6px rgba(255,255,255,0.6);
      animation: qm-float-up ${CONFIG.duration}ms ease-out forwards;
      will-change: transform, opacity;
    }
  `;
  document.head.appendChild(style);

  // 点击事件
  document.addEventListener('click', function (e) {
    if (liveCount >= CONFIG.maxCount) return;

    const el = document.createElement('span');
    el.className = 'qm-click-fx';
    el.textContent = CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];

    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    el.style.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    el.style.fontSize = CONFIG.fontSize + 'px';

    document.body.appendChild(el);
    liveCount++;

    setTimeout(function () {
      el.remove();
      liveCount--;
    }, CONFIG.duration);
  });
})();