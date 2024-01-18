// Подключение библиотеки mongoose
const mongoose = require("mongoose");

// Асинхронная функция для подключения к MongoDB
const connectDB = async () => {
    try {
        // Подключение к MongoDB с использованием URL из переменной окружения
        const conn = await mongoose.connect(process.env.MONGO_URL);
        // Вывод сообщения при успешном подключении
        console.log(`MongoDB connected to ${conn.connection.host}`);
    } catch (error) {
        // Вывод ошибки в случае неудачного подключения
        console.error(`MongoDB connection error: ${error.message}`);
        // Завершение процесса с ошибкой
        process.exit(1);
    }
};

// Экспорт функции подключения к MongoDB
module.exports = {
    connectDB
};
