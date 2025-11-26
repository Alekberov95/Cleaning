
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    const BOT_TOKEN = "7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // ← твой токен
    const CHAT_ID = "-1001234567890"; // ← ID твоей группы

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;

        submitBtn.innerHTML = '<div class="loader"></div>';
        submitBtn.disabled = true;
        status.innerHTML = "";

        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            area: formData.get("area"),
            type: formData.get("type"),
            address: formData.get("address")
        };

        const typeText = {
            general: "Генеральная уборка",
            regular: "Поддерживающая уборка",
            repair: "Уборка после ремонта"
        }[data.type] || data.type;

        const message = `
НОВАЯ ЗАЯВКА НА УБОРКУ

Имя: ${data.name}
Телефон: ${data.phone}
Площадь: ${data.area} м²
Тип уборки: ${typeText}
Адрес: ${data.address}

Дата: ${new Date().toLocaleString("ru-RU")}
        `.trim();

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message,
                        parse_mode: "HTML"
                    })
                }
            );

            if (response.ok) {
                status.innerHTML = `
                    <div class="success">
                        Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время
                    </div>
                `;
                form.reset();
            } else {
                throw new Error("Ошибка Telegram API");
            }
        } catch (err) {
            status.innerHTML = `
                <div class="error">
                    Ошибка отправки. Напишите нам в Telegram
                </div>
            `;
            console.error(err);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});