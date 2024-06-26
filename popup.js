function openProductPopup(button, popupContentId) {
    var card = button.closest('.card');
    var article = card.getAttribute('data-article');
    var title = card.getAttribute('data-title');
    var price = card.getAttribute('data-price');
    var imageSrc = card.getAttribute('data-image');
    var productUrl = window.location.href + '#' + article;

    var popupContent = document.getElementById(popupContentId);
    if (!popupContent) {
        console.error('Popup content with ID ' + popupContentId + ' not found.');
        return;
    }

    var popupHtml = `
        <div class="popup" id="productPopup">
            <div class="popup-content">
                <span class="close" onclick="closePopup('productPopup')">&times;</span>
                <div class="container-top">
                    <div class="container-top-left">
                        <img src="${imageSrc}" alt="Product Image" class="popup-image" id="popupImage" />
                    </div>
                    <div class="container-top-right">
                        <h2 id="popupTitle">${title}</h2>
                        <div class="price-order-container">
                            <div class="popup-price" id="popupPrice">${price}</div>
                            <button class="popup-order" onclick="openContactForm()">Заказать</button>
                        </div>
                    </div>
                </div>
                <div class="container-bottom" id="popupSpecifications">
                    ${popupContent.innerHTML}
                </div>
            </div>
        </div>
    `;

    document.getElementById('popupContainer').innerHTML = popupHtml;
    document.getElementById('productPopup').style.display = 'block';


    document.getElementById('productArticle').value = article;
    document.getElementById('productPrice').value = price;
    document.getElementById('productUrl').value = productUrl;
}


function openContactForm() {
    document.getElementById('contactFormPopup').style.display = 'block';
    document.getElementById('productPopup').style.display = 'none';
}


function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}



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


window.onkeydown = function(event) {
    if (event.key === "Escape") {
        closePopup('productPopup');
        closePopup('contactFormPopup');
    }
}



function submitContactForm() {
    var form = document.getElementById('contactForm');
    var submitButton = form.querySelector('button[type="submit"]');
    var messageContainer = document.getElementById('messageContainer');

    fetch('order.php', {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => response.text())
    .then(data => {
        messageContainer.innerHTML = '<p>' + data + '</p>';
        messageContainer.style.display = 'block';
        submitButton.textContent = 'Отправлено';
        submitButton.style.backgroundColor = 'green';
        submitButton.style.color = 'white';
        submitButton.disabled = true;
    })
    .catch(error => {
        console.error('Ошибка при отправке формы:', error);
        messageContainer.innerHTML = '<p>Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.</p>';
        messageContainer.style.display = 'block';
    });
}
