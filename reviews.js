document.addEventListener("DOMContentLoaded", () => {
    const reviews = [
        {
            text: "Отличная уборка, всё блестит!",
            author: "Анна"
        },
        {
            text: "Очень пунктуальные и вежливые сотрудники.",
            author: "Дмитрий"
        },
        {
            text: "Сделали уборку после ремонта идеально.",
            author: "Мария"
        },
        {
            text: "Работа выполнена быстрее, чем ожидали. Рекомендую!",
            author: "Ольга"
        },
        {
            text: "Лучший сервис, который я когда-либо заказывал.",
            author: "Иван"
        },
        {
            text: "Убрали офис после корпоратива — просто спасение!",
            author: "Сергей"
        }
    ];

    const slider = document.querySelector(".reviews__slider");
    let currentIndex = 0;

    reviews.forEach((review, i) => {
        const card = document.createElement("div");
        card.className = "review-card";
        if (i === 0) card.classList.add("active");

        card.innerHTML = `
            <img src="reviews-image.png" alt="Клиент" class="review-card__photo">
            <div class="review-stars">★★★★★</div>
            <p class="review-card__text">«${review.text}»</p>
            <p class="review-card__author">— ${review.author}</p>
        `;

        slider.appendChild(card);
    });

    const cards = document.querySelectorAll(".review-card");

    function showReview(index) {
        cards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    }

    document.querySelector(".review-btn.next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % reviews.length;
        showReview(currentIndex);
        resetTimer();
    });

    document.querySelector(".review-btn.prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
        showReview(currentIndex);
        resetTimer();
    });

    let timer = setInterval(() => {
        currentIndex = (currentIndex + 1) % reviews.length;
        showReview(currentIndex);
    }, 8000);

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % reviews.length;
            showReview(currentIndex);
        }, 8000);
    }

    let touchStartX = 0;
    slider.addEventListener("touchstart", e => touchStartX = e.touches[0].clientX);
    slider.addEventListener("touchend", e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) document.querySelector(".review-btn.next").click();
            else document.querySelector(".review-btn.prev").click();
        }
    });
});