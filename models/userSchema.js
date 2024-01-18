// Подключение библиотеки mongoose
const mongoose = require("mongoose");

// Создание схемы пользователя (userSchema)
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
}, {
    // Указание имени коллекции в MongoDB
    collection: "login",
    // Автоматическое добавление полей "createdAt" и "updatedAt" с метками времени
    timestamps: true
});

// Создание модели пользователя (User) на основе схемы
module.exports = mongoose.model("User", userSchema);
