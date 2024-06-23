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



function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('.card__title').textContent.toLowerCase();
        const category = card.getAttribute('data-category');

        const matchesSearch = title.includes(searchInput);
        const matchesCategory = categoryFilter === 'all' || category === categoryFilter;

        if (matchesSearch && matchesCategory) {
            card.classList.add('visible');
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
        }
    });

    // Ensure layout changes are triggered after the animations
    setTimeout(() => {
        cards.forEach(card => {
            if (card.classList.contains('hidden')) {
                card.style.display = 'none';
            } else {
                card.style.display = 'flex';
            }
        });
    }, 300); // Match the duration of the CSS transition
}

function resetCategory() {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    filterProducts();
}

document.querySelectorAll('.catalog__link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('categoryFilter').value = link.getAttribute('data-category');
        filterProducts();
    });
});




function openProductPopup() {
    document.getElementById('productPopup').style.display = 'block';
}

function openContactForm() {
    document.getElementById('contactFormPopup').style.display = 'block';
    document.getElementById('productPopup').style.display = 'none';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Закрытие поп-ап меню при клике вне его области
window.onclick = function(event) {
    const productPopup = document.getElementById('productPopup');
    const contactFormPopup = document.getElementById('contactFormPopup');
    if (event.target === productPopup) {
        productPopup.style.display = 'none';
    }
    if (event.target === contactFormPopup) {
        contactFormPopup.style.display = 'none';
    }
}

// Закрытие поп-ап меню при нажатии на клавишу "Esc"
window.onkeydown = function(event) {
    if (event.key === "Escape") {
        closePopup('productPopup');
        closePopup('contactFormPopup');
    }
}
