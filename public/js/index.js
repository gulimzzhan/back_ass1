// Функция для переключения между формами регистрации и входа
function toggleForm(formId) {
    // Установка стиля отображения в зависимости от выбранной формы
    document.getElementById('registrationForm').style.display = (formId === 'registrationForm') ? 'block' : 'none';
    document.getElementById('loginForm').style.display = (formId === 'loginForm') ? 'block' : 'none';
}

// Функция для регистрации пользователя
function registerUser() {
    // Получение формы регистрации
    const registerForm = document.getElementById('registerForm');
    // Получение значений полей формы
    const name = registerForm.querySelector('[name="name"]').value;
    const email = registerForm.querySelector('[name="email"]').value;
    const password = registerForm.querySelector('[name="password"]').value;
    const confirmPassword = registerForm.querySelector('[name="confirmPassword"]').value;

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    // Отправка данных на сервер с использованием Fetch API
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
    })
    .then(response => response.json())
    .then(data => {
        // Обработка ответа сервера
        console.log(data);
        alert(data.message);

        // Очистка полей формы
        registerForm.reset();

        // Переключение на форму входа
        toggleForm('loginForm');
    });

    return false;
}

// Функция для входа пользователя
function loginUser() {
    // Получение формы входа
    const loginForm = document.getElementById('loginForm');
    // Получение значений полей формы
    const username = loginForm.querySelector('[name="username"]').value;
    const password = loginForm.querySelector('[name="password"]').value;

    // Отправка данных на сервер с использованием Fetch API
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        // Обработка ответа сервера
        console.log(data);
        if (data.success) {
            alert(data.message);
            
            // Очистка полей формы входа
            loginForm.reset();
        } else {
            alert(data.error);
        }
    });

    return false;
}
