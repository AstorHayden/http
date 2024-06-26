<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Установка кодировки UTF-8 для вывода
header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));
    $timestamp = date("Y-m-d H:i:s"); // Get the current timestamp

    if (!empty($name) && !empty($email) && !empty($message)) {
        $to = "romka08100@yandex.ru";
        $subject = "Новое сообщение с формы обратной связи";

        // Create the HTML message
        $body = "
        <html>
        <head>
            <title>Новое сообщение с формы обратной связи</title>
            <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid black;
                    padding: 5px;
                    word-wrap: break-word;
                }
                td {
                    max-width: 300px; /* Maximum width to ensure it wraps */
                }
            </style>
        </head>
        <body>
            <table>
                <tr>
                    <th>Время отправки</th>
                    <td>$timestamp</td>
                </tr>
                <tr>
                    <th>ФИО</th>
                    <td>$name</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>$email</td>
                </tr>
                <tr>
                    <th>Сообщение</th>
                    <td>$message</td>
                </tr>
            </table>
        </body>
        </html>
        ";

        // Set content-type header for HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: $email\r\n";

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