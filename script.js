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

    document.getElementById('resetCategoryFilter').addEventListener('click', resetFilters);
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

function resetFilters() {
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