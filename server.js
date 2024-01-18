// Подключение необходимых библиотек и модулей
const express = require("express"); // Express - фреймворк для создания веб-приложений
const app = express(); // Создание экземпляра приложения Express
const bodyParser = require("body-parser"); // Middleware для обработки данных из тела запроса
const bcrypt = require("bcrypt"); // Библиотека для хеширования паролей
const { connectDB } = require("./config/db"); // Модуль для подключения к базе данных MongoDB
const User = require("./models/userSchema"); // Модель пользователя (определена с использованием Mongoose)

// Подключение файла конфигурации .env
require("dotenv").config();

// Настройка Express для использования middleware
app.use(bodyParser.urlencoded({ extended: true })); // Middleware для обработки данных из тела запроса (формы)
app.use(express.json()); // Middleware для обработки данных из тела запроса в формате JSON
app.use(express.static("public")); // Middleware для обслуживания статических файлов из директории "public"

// Подключение к базе данных MongoDB
connectDB();

// Обработчик GET-запроса для корневого пути
app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html"); // Отправка файла index.html
});

// Обработчик POST-запроса для регистрации нового пользователя
app.post("/register", async (req, res) => {
    // Извлечение данных из тела запроса
    const { name, email, password, confirmPassword } = req.body;

    // Проверка соответствия паролей
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        // Поиск пользователя по email и имени
        const existingUser = await User.findOne({ email });
        const existingEmail = await User.findOne({ name });

        // Если пользователь или email уже существуют, возврат ошибки
        if (existingUser || existingEmail) {
            alert("User is already registered")
            return res.status(400).json({ error: "User is already registered" });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя в базе данных
        await User.create({ name, email, password: hashedPassword });

        // Отправка успешного ответа
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        // Обработка ошибок сервера
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Обработчик POST-запроса для входа пользователя
app.post("/login", async (req, res) => {
    // Извлечение данных из тела запроса
    const { username, password } = req.body;

    try {
        // Поиск пользователя по email (используется как username)
        const user = await User.findOne({ email: username });

        // Если пользователь не найден, возврат ошибки
        if (!user) {
            alert("User exists")
            return res.status(401).json({ success: false, error: "Username not found" });
        }

        // Сравнение хешированного пароля
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Если пароль не совпадает, возврат ошибки
        if (!passwordMatch) {
            return res.status(401).json({ success: false, error: "Username or password does not match" });
        }

        // Отправка успешного ответа
        res.status(200).json({ success: true, message: `Login successful, welcome ${username}` });
    } catch (error) {
        // Обработка ошибок сервера
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Обработчик GET-запроса для получения списка всех пользователей
app.get("/users", async (req, res) => {
    try {
        // Получение всех пользователей из базы данных
        const users = await User.find();
        // Отправка списка пользователей в формате JSON
        res.status(200).json(users);
    } catch (error) {
        // Обработка ошибок сервера
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Обработчик DELETE-запроса для удаления всех пользователей
app.delete("/users/delete", async (req, res) => {
    try {
        // Удаление всех пользователей из базы данных
        await User.deleteMany();
        // Отправка успешного ответа
        res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
        // Обработка ошибок сервера
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Настройка порта для прослушивания запросов
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
