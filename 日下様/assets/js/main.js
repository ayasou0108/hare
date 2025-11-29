"use strict";

/* ===============================
  MV 背景スライドショー
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(".mv__bg");
  if (!imgs.length) return;

  let i = 0;

  const animate = (el) => {
    el.style.animation = "none";
    el.offsetHeight; // リフローでリセット
    el.style.animation = "zoomIn 10s ease-in-out forwards";
  };

  animate(imgs[i]);
  imgs[i].classList.add("active");

  setInterval(() => {
    imgs[i].classList.remove("active");
    i = (i + 1) % imgs.length;
    animate(imgs[i]);
    imgs[i].classList.add("active");
  }, 4000);
});

/* ===============================
  お客様の声スワイパー
================================ */
const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  spaceBetween: 32,

  // Navigation arrows
  navigation: {
    nextEl: ".arrow-btn.next",
    prevEl: ".arrow-btn.prev",
  },
  breakpoints: {
    // スライドの表示枚数：500px以上の場合
    1325: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

