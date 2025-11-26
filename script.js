document.addEventListener("DOMContentLoaded", () => {
    const calcBtn = document.getElementById("calcBtn");
    const areaInput = document.getElementById("area");
    const typeSelect = document.getElementById("type");
    const resultDiv = document.getElementById("calcResult");

    function getCurrentLang() {
        return document.documentElement.lang || "ru";
    }

    function updatePlaceholder() {
        const lang = getCurrentLang();
        const placeholderText = translations[lang]?.calc_area_placeholder || "например, 80";
        areaInput.setAttribute("placeholder", placeholderText);
    }

    function calculatePrice() {
        const area = Number(areaInput.value);
        const lang = getCurrentLang();

        if (!area || area <= 0) {
            resultDiv.innerHTML = `<span style="color: #e74c3c;">${translations[lang]?.calc_error_area || "Введите корректную площадь!"}</span>`;
            return;
        }

        const prices = {
            general: 5,
            regular: 3,
            repair: 7
        };

        const total = area * prices[typeSelect.value];
        const template = translations[lang]?.calc_result_template || "Итоговая стоимость: {price}₾";
        const resultText = template.replace("{price}", `<strong>${total} </strong>`);

        resultDiv.innerHTML = `
            <div style="padding: 18px; background: #f0f8ff; border-radius: 16px; font-size: 24px; color: #2c5eff; text-align: center;">
                ${resultText}
            </div>
        `;
    }

    calcBtn.addEventListener("click", () => {
        const currentText = calcBtn.textContent.trim();
        calcBtn.innerHTML = '<div class="loader"></div>';
        calcBtn.disabled = true;

        setTimeout(() => {
            calculatePrice();
            // Восстанавливаем правильный перевод кнопки
            const translatedBtn = document.querySelector('[data-i18n="calc_btn"]');
            calcBtn.innerHTML = translatedBtn ? translatedBtn.textContent : "Calculate";
            calcBtn.disabled = false;
        }, 1200);
    });

    const observer = new MutationObserver(updatePlaceholder);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    updatePlaceholder();

    areaInput.addEventListener("keypress", e => {
        if (e.key === "Enter") calcBtn.click();
    });
});