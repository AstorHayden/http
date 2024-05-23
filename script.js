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

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var form = event.target;
    var formData = new FormData(form);
    var messageContainer = document.getElementById(form.getAttribute('data-message-container'));

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => response.text())
    .then(responseText => {
        messageContainer.style.display = 'block';
        messageContainer.textContent = responseText;

        if (responseText.trim() === "отправлено") {
            form.style.display = 'none';
        }
    })
    .catch(error => {
        messageContainer.style.display = 'block';
        messageContainer.textContent = "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.";
    });
});