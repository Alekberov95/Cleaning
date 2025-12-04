const translations = {
    ru: {
        meta_title: "Клининговая компания",
        logo: "CleanPro",
        nav_services: "Услуги",
        nav_calc: "Калькулятор",
        nav_reviews: "Отзывы",
        nav_contact: "Контакты",
        hero_title: "Профессиональная уборка квартир и офисов",
        hero_sub: "Быстро, аккуратно, с гарантией качества",
        hero_btn: "Рассчитать стоимость",
        services_title: "Наши услуги",
        service1_title: "Генеральная уборка",
        service1_text: "Глубокая и детальная уборка всех помещений.",
        service2_title: "Поддерживающая уборка",
        service2_text: "Регулярная уборка, чтобы дом всегда был в порядке.",
        service3_title: "Уборка после ремонта",
        service3_text: "Удаление строительной пыли, пятен и мусора.",
        calc_title: "Калькулятор стоимости",
        calc_area_label: "Площадь (м²):",
        calc_type_label: "Тип уборки:",
        opt_general: "Генеральная",
        opt_regular: "Поддерживающая",
        opt_repair: "После ремонта",
        calc_btn: "Рассчитать",
        calc_area_placeholder: "например, 80",
        calc_result_default: "Введите данные и нажмите «Рассчитать»",
        calc_result_template: "Итоговая стоимость: {price}₾",
        calc_error_area: "Введите корректную площадь!",
        reviews_title: "Отзывы клиентов",
        gallery_title: "Наши работы",
        contact_title: "Связаться с нами",
        contact_sub: "Оставьте заявку или напишите нам в Telegram",
        contact_btn: "Написать в Telegram",
        form_name: "Ваше имя",
        form_name_placeholder: "Джон Дой",
        form_phone: "Телефон",
        form_phone_placeholder: "+995...",
        form_area: "Площадь (м²)",
        form_area_placeholder: "80",
        form_type: "Тип уборки",
        form_type_default: "Выберите тип",
        form_address: "Адрес",
        form_address_placeholder: "г. Тбилиси, ул. Абащидзе, д. 10, кв. 25",
        form_submit: "Отправить заявку",
        contact_or: "или",
        footer_text: "© 2025 CleanPro. Все права защищены."
    },
    en: {
        meta_title: "Cleaning Company",
        logo: "CleanPro",
        nav_services: "Services",
        nav_calc: "Calculator",
        nav_reviews: "Reviews",
        nav_contact: "Contact",
        hero_title: "Professional apartment and office cleaning",
        hero_sub: "Fast, accurate, high-quality",
        hero_btn: "Calculate price",
        services_title: "Our Services",
        service1_title: "Deep Cleaning",
        service1_text: "Thorough cleaning of all rooms.",
        service2_title: "Regular Cleaning",
        service2_text: "Scheduled cleaning to keep your home tidy.",
        service3_title: "Post-Repair Cleaning",
        service3_text: "Removing dust, paint stains and debris.",
        calc_title: "Price Calculator",
        calc_area_label: "Area (m²):",
        calc_type_label: "Cleaning type:",
        opt_general: "Deep Cleaning",
        opt_regular: "Regular Cleaning",
        opt_repair: "Post-Repair",
        calc_btn: "Calculate",
        calc_area_placeholder: "e.g., 80",
        calc_result_default: "Enter data and click «Calculate»",
        calc_result_template: "Total cost: {price}₾",
        calc_error_area: "Please enter a valid area!",
        reviews_title: "Customer Reviews",
        gallery_title: "Our Works",
        contact_title: "Contact Us",
        contact_sub: "Send a request or write to us on Telegram",
        contact_btn: "Write in Telegram",
        form_name: "Your Name",
        form_name_placeholder: "John Doe",
        form_phone: "Phone",
        form_phone_placeholder: "+995...",
        form_area: "Area (m²)",
        form_area_placeholder: "80",
        form_type: "Cleaning Type",
        form_type_default: "Select type",
        form_address: "Address",
        form_address_placeholder: "Tbilisi, Abashidze st. 10, apt. 25",
        form_submit: "Send Request",
        contact_or: "or",
        footer_text: "© 2025 CleanPro. All rights reserved."
    }
};

function getBrowserLang() {
    const languages = navigator.languages || [navigator.language || navigator.userLanguage || 'ru'];
    for (const lang of languages) {
        const short = lang.split('-')[0].toLowerCase();
        if (translations[short]) return short;
    }
    return null;
}

function applyLang(lang) {
    if (!translations[lang]) lang = 'ru';

    const titleEl = document.querySelector("title");
    if (titleEl && translations[lang].meta_title) {
        titleEl.textContent = translations[lang].meta_title;
    }

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key] !== undefined) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key] !== undefined) {
            el.placeholder = translations[lang][key];
        }
    });

    document.documentElement.lang = lang;
    localStorage.setItem("userLang", lang);

    document.querySelectorAll(".lang-switch button").forEach(b => {
        b.classList.toggle("active", b.dataset.lang === lang);
    });

    document.dispatchEvent(new CustomEvent("langChanged", { detail: lang }));
}

document.addEventListener("DOMContentLoaded", () => {
    let lang = localStorage.getItem("userLang");

    if (!lang) {
        lang = getBrowserLang();
    }

    if (!lang || !translations[lang]) {
        lang = "ru";
    }

    applyLang(lang);

    document.querySelectorAll(".lang-switch button").forEach(btn => {
        btn.addEventListener("click", () => {
            applyLang(btn.dataset.lang);
        });
    });
});
