const form = document.querySelector("#mail-contact-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const lines = [
      "沖縄お墓まもりサポートへのお問い合わせ",
      "",
      ...Array.from(data.entries()).map(([key, value]) => `${key}: ${value || "未入力"}`),
    ];

    const subject = encodeURIComponent("【お問い合わせ】沖縄お墓まもりサポート");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:wantmustcan@gmail.com?subject=${subject}&body=${body}`;
  });
}
