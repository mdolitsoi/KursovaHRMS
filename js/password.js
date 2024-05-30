// password.js
// Author: Доліцой М.В.

// Додавання обробника події, який виконується після завантаження DOM
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM завантажено. Ініціалізація функцій.");
    document.getElementById("confirmButton").addEventListener("click", validateLogin); // Додавання обробника події для підтвердження логіну
});

// Валідація логіну
function validateLogin() {
    console.log("Валідація логіну.");
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const credentials = JSON.parse(localStorage.getItem('credentials')) || {
        "HMan": "123",
        "RMan": "321",
        "Own": "111"
    };
    const redirects = {
        "HMan": "hotelManager.html",
        "RMan": "restaurantManager.html",
        "Own": "owner.html"
    };

    // Перевірка відповідності логіну та пароля
    if (credentials[login] && credentials[login] === password) {
        console.log(`Логін успішний. Перенаправлення на сторінку: ${redirects[login]}`);
        window.location.href = redirects[login];
    } else {
        alert("Невірний логін або пароль.");
        console.log("Невірний логін або пароль.");
    }

    // Ініціалізація облікових даних у локальному сховищі, якщо їх немає
    if (!localStorage.getItem('credentials')) {
        const initialCredentials = {
           "HMan": "123",
            "RMan": "321",
            "Own": "111"
        };
        localStorage.setItem('credentials', JSON.stringify(initialCredentials));
        console.log("Ініціалізація облікових даних у локальному сховищі.");
    }
}
