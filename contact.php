<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Валидация данных
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Отправка письма
        $to = "romka08100@yandex.ru"; // Замените своим email
        $subject = "Новое сообщение с формы обратной связи";
        $body = "ФИО: $name\nEmail: $email\nСообщение:\n$message";
        $headers = "From: $email\r\n";
        
        if (mail($to, $subject, $body, $headers)) {
            echo "Ваше сообщение было отправлено!";
        } else {
            echo "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.";
        }
    } else {
        echo "Пожалуйста, заполните все поля формы.";
    }
} else {
    echo "Неверный метод отправки данных.";
}
?>
