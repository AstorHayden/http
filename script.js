document.addEventListener("DOMContentLoaded", function() {
    const featureItems = document.querySelectorAll(".features__item1");
    const slides = document.querySelectorAll(".slide");

    featureItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            const slideId = item.getAttribute("data-slide");

            slides.forEach(slide => {
                if (slide.id === slideId) {
                    slide.classList.add("active");
                } else {
                    slide.classList.remove("active");
                }
            });

            featureItems.forEach(feature => {
                if (feature === item) {
                    feature.classList.add("active");
                } else {
                    feature.classList.remove("active");
                }
            });
        });
    });
});

// document.getElementById('contactForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     var name = document.querySelector('input[name="name"]').value;
//     var email = document.querySelector('input[name="email"]').value;
//     var privacyCheck = document.getElementById('privacyCheck').checked;

//     if (!name || !email || !privacyCheck) {
//         alert('Пожалуйста, заполните все обязательные поля и подтвердите согласие с политикой конфиденциальности.');
//     } else {
//         alert('Форма успешно отправлена!');
//     }
// });