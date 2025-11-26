// gallery.js — КРАСИВАЯ И СТАБИЛЬНАЯ ГАЛЕРЕЯ (финальная версия)
document.addEventListener("DOMContentLoaded", () => {
    const photos = [
        "work1.jpg", "work2.jpg", "work3.jpg", "work4.jpg",
        "work5.jpg", "work6.jpg", "work7.jpg", "work8.jpg"
    ];

    const track = document.querySelector(".gallery__track");
    const prevBtn = document.querySelector(".gallery-btn.prev");
    const nextBtn = document.querySelector(".gallery-btn.next");

    let currentIndex = 0;

    photos.forEach((src, i) => {
        const slide = document.createElement("div");
        slide.className = "gallery__item";

        const img = document.createElement("img");
        img.src = src;
        img.alt = `Наши работы ${i + 1}`;
        img.loading = "lazy";

        img.onerror = () => {
            img.src = "https://via.placeholder.com/1200x800/4e8fff/ffffff?text=CleanPro+" + (i + 1);
        };

        slide.addEventListener("click", () => {
            const lightbox = document.getElementById("lightbox");
            const lightboxImg = lightbox.querySelector(".lightbox__img");
            lightboxImg.src = img.src;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        slide.appendChild(img);
        track.appendChild(slide);
    });

    const slides = document.querySelectorAll(".gallery__item");

    const updateSlide = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    }, 6000);

    document.querySelector(".lightbox__close")?.addEventListener("click", () => {
        document.getElementById("lightbox").classList.remove("active");
        document.body.style.overflow = "";
    });

    document.getElementById("lightbox")?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    let touchStartX = 0;
    track.addEventListener("touchstart", e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", e => {
        if (!touchStartX) return;
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextBtn.click();
            else prevBtn.click();
        }
        touchStartX = 0;
    }, { passive: true });

    track.addEventListener("dragstart", e => e.preventDefault());
    track.addEventListener("mousedown", e => e.preventDefault());

    updateSlide();
});