"use strict";
// ブログのカテゴリー背景色変化

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".category-button");

  buttons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault(); // aタグのデフォルト動作を止める

      // すべてのボタンからactiveを削除
      buttons.forEach(b => b.classList.remove("active"));

      // クリックしたボタンにactiveを付与
      this.classList.add("active");
    });
  });
});

