<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));
    

    if (!empty($name) && !empty($email) && !empty($message)) {

        $to = "romka08100@yandex.ru";
        $subject = "Новое сообщение с формы обратной связи";
        $body = "ФИО: $name\nEmail: $email\nСообщение:\n$message";
        $headers = "From: $email\r\n";
        
        if (mail($to, $subject, $body, $headers)) {
            echo "отправлено";
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