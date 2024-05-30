// script.js
// Author: Доліцой М.В.

// Додавання обробника події, який виконується після завантаження DOM
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM завантажено. Ініціалізація функцій.");
    initBackButton(); // Ініціалізація кнопки "Назад"
    
    const savedTheme = localStorage.getItem('theme'); // Отримання збереженої теми зі сховища
    const link = document.getElementById('themeStylesheet'); // Отримання елемента посилання на стилі
    if (savedTheme && link) {
        link.href = savedTheme; // Встановлення збереженої теми
        console.log(`Тема встановлена: ${savedTheme}`);
    }

    const clientButton = document.getElementById('clientButton');
    if (clientButton) {
        clientButton.addEventListener('click', function() {
            console.log("Кнопка 'Клієнт' натиснута. Перехід на client.html");
            window.location.href = 'client.html'; 
        });
    }

    const staffButton = document.getElementById('staffButton');
    const staffLogin = document.getElementById('staffLogin'); 
    if (staffButton && staffLogin) {
        staffButton.addEventListener('click', function() {
            console.log("Кнопка 'Персонал' натиснута. Відображення форми логіну.");
            staffLogin.style.display = 'block'; 
        });
    }
    const Res = document.getElementById('Booking123')
    if (Res) {
        $('#restaurantReservationsTable').DataTable();
        $('#hotelReservationsTable').DataTable();
    }
});

// Перемикання теми
function switchTheme() {
    const link = document.getElementById('themeStylesheet');
    if (link) {
        link.href = link.href.includes('css/style.css') ? 'css/styleblack.css' : 'css/style.css'; // Перемикання теми

        localStorage.setItem('theme', link.href); // Збереження вибраної теми у локальному сховищі
        console.log(`Тема перемикнулася на: ${link.href}`);
    }
}    

// Ініціалізація кнопки "Назад"
function initBackButton() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log("Кнопка 'Назад' натиснута.");
            if (window.history.length > 1) {
                window.history.back(); // Повернення на попередню сторінку
                console.log("Повернення на попередню сторінку.");
            } else {
                window.location.href = 'index.html'; // Перехід на index.html, якщо історії немає
                console.log("Перехід на index.html.");
            }
        });
    }
}

// Відкриття вкладки
function openTab(evt, tabName) {
    console.log(`Відкриття вкладки: ${tabName}`);
    var i, tabcontent, tablinks, modals;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"; // Приховування всіх вкладок
    }
    modals = document.getElementsByClassName("modal");
    for (i = 0; i < modals.length; i++) {
        modals[i].style.display = "none"; // Приховування всіх модальних вікон
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", ""); // Видалення класу "active" з усіх вкладок
    }
    document.getElementById(tabName).style.display = "block"; // Відображення обраної вкладки
    evt.currentTarget.className += " active"; // Додавання класу "active" до обраної вкладки
    console.log(`Вкладка ${tabName} відкрита.`);
}
