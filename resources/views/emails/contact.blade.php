<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            padding: 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            background-color: #d8d8d8;
            color: #000000;
        }

        .header img {
            max-width: 120px;
            margin-bottom: 10px;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }

        .content {
            padding: 20px;
        }

        .content p {
            margin: 0 0 20px;
            line-height: 1.8;
            font-size: 16px;
        }

        .sender-info {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .sender-info strong {
            font-size: 18px;
            font-weight: 700;
            color: #000000;
        }

        .message-section {
            margin-top: 20px;
            padding: 15px;
            padding-left: 0px;
            padding-right: 0px;
            background-color: #f9fafb;
            border-radius: 6px;
            font-size: 16px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            background-color: #f3f4f6;
        }

        a {
            color: #1a73e8;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://img.icons8.com/ios-filled/500/portfolium.png" alt="Portfolio Logo">
            <h1>Nuevo Mensaje</h1>
        </div>
        <div class="content">
            <div class="sender-info">
                <p>Has recibido un correo de <strong>{{ $name }}</strong> cuyo correo es <strong>{{ $email }}</strong>.</p>
            </div>
            <div class="message-section">
                <p>{{ $userMessage }}</p>
            </div>
        </div>
        <div class="footer">
            <p>&copy; 2024 Christian Rodríguez Ponce de León. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
