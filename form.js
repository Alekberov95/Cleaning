// form.js — отправка заявки
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;

        // Показываем лоадер
        submitBtn.innerHTML = '<div class="loader"></div>';
        submitBtn.disabled = true;
        status.innerHTML = "";

        // Собираем данные
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Имитация отправки (замени на свой бэкенд)
        setTimeout(() => {
            console.log("Заявка:", data);

            status.innerHTML = `
                <div class="success">
                    Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время
                </div>
            `;

            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
});