<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $article = htmlspecialchars(trim($_POST['article']));
    $price = htmlspecialchars(trim($_POST['price']));
    $pickup_date = htmlspecialchars(trim($_POST['pickup_date']));
    $message = htmlspecialchars(trim($_POST['message']));
    $privacy_policy = isset($_POST['privacy_policy']) ? $_POST['privacy_policy'] : '';
    $product_url = isset($_POST['product_url']) ? htmlspecialchars(trim($_POST['product_url'])) : '';
    $timestamp = date("Y-m-d H:i:s");

    if (!empty($name) && !empty($email) && !empty($article) && !empty($price) && !empty($pickup_date) && !empty($message) && !empty($privacy_policy) && !empty($product_url)) {
        $to = "romka08100@yandex.ru";
        $subject = "Заказ товара";

        $body = "
        <html>
        <head>
            <title>Заказ товара</title>
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
                text-align: left; /* Выравнивание текста в ячейках влево */
            }
            td {
                max-width: 200px; /* Уменьшение максимальной ширины ячеек до 200px */
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
                    <th>Артикул товара</th>
                    <td>$article</td>
                </tr>
                <tr>
                    <th>Цена товара</th>
                    <td>$price</td>
                </tr>
                <tr>
                    <th>Дата забора заказа</th>
                    <td>$pickup_date</td>
                </tr>
                <tr>
                    <th>Сообщение</th>
                    <td>$message</td>
                </tr>
                <tr>
                    <th>Ссылка на товар</th>
                    <td><a href=\"$product_url\">$product_url</a></td>
                </tr>
                <tr>
                    <th>Время работы магазина</th>
                    <td>Пн-Пт: 8:00-19:00, Сб-Вс: 10:00-18:00</td>
                </tr>
            </table>
        </body>
        </html>
        ";

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: $email\r\n";
        $headers .= "Cc: $email\r\n";

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


$client_email = isset($_POST['client_email']) ? $_POST['client_email'] : '';


if (!empty($client_email)) {
    $client_subject = "Копия вашего заказа";
    $client_body = "Здравствуйте!\n\nВот копия ваших данных:\n\n";
    $client_body .= "ФИО: $name\n";
    $client_body .= "Email: $email\n";
    $client_body .= "Артикул товара: $article\n";
    $client_body .= "Цена товара: $price\n";
    $client_body .= "Дата забора заказа: $pickup_date\n";
    $client_body .= "Сообщение: $message\n";
    $client_body .= "Ссылка на товар: $product_url\n";

    $client_headers = "From: your_email@example.com\r\n";
    $client_headers .= "Reply-To: your_email@example.com\r\n";
    $client_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($client_email, $client_subject, $client_body, $client_headers);
}
?>