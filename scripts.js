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