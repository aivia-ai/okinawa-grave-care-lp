const form = document.querySelector("#mail-contact-form");
const contactEmail = "wantmustcan@gmail.com";
const successMessage = document.querySelector("#form-success");
const errorMessage = document.querySelector("#form-error");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.innerHTML : "";
    const data = new FormData(form);
    const honey = String(data.get("_honey") || "");

    successMessage.hidden = true;
    errorMessage.hidden = true;

    if (honey) {
      form.reset();
      successMessage.hidden = false;
      return;
    }

    const payload = Object.fromEntries(data.entries());
    payload["メールアドレス"] = payload.email || "";
    payload._replyto = payload.email || "";
    payload["送信先"] = contactEmail;
    payload["送信元ページ"] = window.location.href;

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="ui-icon icon-mail" aria-hidden="true"></span>送信中です';
      }

      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      successMessage.hidden = false;
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      errorMessage.hidden = false;
      errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    }
  });
}
