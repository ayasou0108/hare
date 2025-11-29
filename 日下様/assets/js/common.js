"use strict";

/* ===============================
    共通パーツ読み込み
================================ */
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("header.html").then((res) => res.text()),
    fetch("footer.html").then((res) => res.text()),
  ]).then(([headerHTML, footerHTML]) => {
    document.getElementById("header").innerHTML = headerHTML;
    document.getElementById("footer").innerHTML = footerHTML;

    initHeader(); // ← ここでヘッダースクリプト起動
  });
});

/* ===============================
    ヘッダー機能まとめ（最適化版）
================================ */
function initHeader() {
  const header = document.querySelector(".header");
  const mv = document.querySelector(".mv");

  // MV が無い下層ページも対応
  const mvHeight = mv ? mv.offsetHeight : 0;

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile__nav");
  const closeButton = document.querySelector(".mobile__close");

  if (!hamburger || !mobileNav) return;

  /* -------------------------------
      モバイルメニュー（開閉）
  -------------------------------- */
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  closeButton?.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });

  document.querySelectorAll(".mobile__nav-item a").forEach((link) => {
    link.addEventListener("click", () => mobileNav.classList.remove("active"));
  });

  /* -------------------------------
      ハンバーガー追従（スマホ）
  -------------------------------- */
  // window.addEventListener("scroll", () => {
  //   if (window.innerWidth > 768) return;

  //   const scrollY = window.scrollY;

  //   if (scrollY > mvHeight) {
  //     hamburger.style.position = "fixed";
  //     hamburger.style.top = "15px";
  //     hamburger.style.right = "0px";
  //     hamburger.style.transform = "none";
  //   } else {
  //     hamburger.style.position = "absolute";
  //     hamburger.style.top = "50%";
  //     hamburger.style.right = "0";
  //     hamburger.style.transform = "translateY(-50%)";
  //   }
  // });

  /* -------------------------------
      ヘッダーをスクロール追従（PC ＆ SP 共通）
  -------------------------------- */
  window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > mvHeight - 8) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

/* -------------------------------
      ページトップボタンをスクロールしたら表示
  -------------------------------- */
document.addEventListener("DOMContentLoaded",()=>{
  const returnTop = document.querySelector(".page-top-btn");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  if (scrollY > 200) {
    returnTop.classList.add("active");
  } else {
    returnTop.classList.remove("active");
  }
});
});

/* ===============================
  波形アニメーション
================================ */
let unit = 100,
  waves = [],
  info = { seconds: 0, t: 0 },
  lastTime = performance.now();

function init() {
  const waveCanvas = document.getElementById("waveCanvas");
  if (!waveCanvas) return;

  waves.push({
    canvas: waveCanvas,
    settings: [[1, -1, 0, "#ffffff", "#ffffff"]],
  });

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(update);
}

function resizeCanvas() {
  waves.forEach((wave) => {
    const canvas = wave.canvas;
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 100;
    canvas.contextCache = canvas.getContext("2d");
  });
}

function update(now) {
  let dt = (now - lastTime) / 1000;
  lastTime = now;

  info.seconds += dt;
  info.t = info.seconds * Math.PI * 0.3;

  waves.forEach((wave) => {
    draw(wave.canvas, wave.settings);
  });

  requestAnimationFrame(update);
}

function draw(canvas, settings) {
  const context = canvas.contextCache;
  context.clearRect(0, 0, canvas.width, canvas.height);

  settings.forEach((set) => {
    const [alpha, zoomSetting, delay, top, bottom] = set;

    const zoom =
      zoomSetting === -1 ? (canvas.width <= 768 ? 2 : 3) : zoomSetting;

    drawWave(canvas, top, bottom, alpha, zoom, delay);
  });
}

function drawWave(canvas, topColor, bottomColor, alpha, zoom, delay) {
  const context = canvas.contextCache;

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(1, bottomColor);

  context.fillStyle = gradient;
  context.globalAlpha = alpha;
  context.beginPath();

  drawSine(canvas, info.t, zoom, delay);

  context.lineTo(canvas.width + 10, canvas.height);
  context.lineTo(0, canvas.height);
  context.closePath();
  context.fill();
  context.globalAlpha = 1;
}

function drawSine(canvas, t, zoom, delay) {
  const context = canvas.contextCache;
  const xAxis = Math.floor(canvas.height / 2);

  let x = t;
  let y = Math.sin(x) / zoom;
  context.moveTo(0, unit * y + xAxis);

  for (let i = 0; i <= canvas.width + 10; i += 10) {
    x = t + i / unit / zoom;
    y = Math.sin(x - delay) / 3;
    context.lineTo(i, unit * y + xAxis);
  }
}

init();
