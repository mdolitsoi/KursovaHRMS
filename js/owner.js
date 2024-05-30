// owner.js
// Author: Доліцой М.В.

// Додавання обробника події, який виконується після завантаження DOM
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM завантажено. Ініціалізація функцій.");
    initMenuAddition(); // Ініціалізація функції додавання елементів меню
    displayReservationCount(); // Відображення кількості бронювань
    displayRestaurantReservations(); // Відображення бронювань у ресторані
    displayHotelReservations(); // Відображення бронювань у готелі

    // Отримання кнопки для очищення всіх бронювань
    const clearAllReservationsButton = document.getElementById('clearAllReservationsButton');
    if(clearAllReservationsButton) {
        // Додавання обробника події для очищення всіх бронювань
        clearAllReservationsButton.addEventListener('click', clearAllReservations);
    }

    // Отримання кнопки для очищення змін у меню
    const clearMenuChangesButton = document.getElementById('clearMenuChangesButton');
    if(clearMenuChangesButton) {
        // Додавання обробника події для очищення змін у меню
        clearMenuChangesButton.addEventListener('click', clearMenuChanges);
    }

    // Отримання кнопки для очищення змін у паролях
    const clearPasswordChangesButton = document.getElementById('clearPasswordChangesButton');
    if(clearPasswordChangesButton) {
        // Додавання обробника події для очищення змін у паролях
        clearPasswordChangesButton.addEventListener('click', clearPasswordChanges);
    }

    // Отримання кнопки для зміни пароля
    const changePasswordButton = document.getElementById('changePasswordButton');
    if(changePasswordButton) {
        // Додавання обробника події для зміни пароля
        changePasswordButton.addEventListener('click', changePassword);
    }
});

// Ініціалізація функції додавання елементів меню
function initMenuAddition() {
    console.log("Ініціалізація додавання елементів меню.");
    // Отримання кнопки для додавання елементу меню
    const addMenuItemButton = document.getElementById('addMenuItemButton');
    if (addMenuItemButton) {
        // Додавання обробника події для додавання елементу меню
        addMenuItemButton.addEventListener('click', addMenuItem);
    }
}

// Додавання елементу меню
function addMenuItem() {
    console.log("Додавання елементу меню.");
    const name = document.getElementById('menuItemName').value;
    const price = document.getElementById('menuItemPrice').value;
    const photoFile = document.getElementById('menuItemPhoto').files[0];
    if (!name || !price || !photoFile) {
        alert('Please fill in all fields and select a photo.');
        console.log('Не заповнені всі поля або не вибрано фото.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const photoURL = e.target.result;
        saveMenuItem(name, price, photoURL);
    };
    reader.readAsDataURL(photoFile);
}

// Збереження елементу меню
function saveMenuItem(name, price, photoURL) {
    console.log(`Збереження елементу меню: Ім'я: ${name}, Ціна: ${price}, Фото: ${photoURL}`);
    const menuItem = { name, price, photoURL };
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    menuItems.push(menuItem);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    document.getElementById('menuItemName').value = '';
    document.getElementById('menuItemPrice').value = '';
    document.getElementById('menuItemPhoto').value = '';
    alert('Menu item added successfully.');
    console.log('Елемент меню успішно додано.');
}

// Відображення кількості бронювань
function displayReservationCount() {
    console.log("Відображення кількості бронювань.");
    const reservationCount = localStorage.getItem('reservationCount') || '0'; 
    const reservationCountDisplay = document.getElementById('reservationCountDisplay');
    if (reservationCountDisplay) {
        reservationCountDisplay.innerText = reservationCount;
        console.log(`Кількість бронювань: ${reservationCount}`);
    }
}

// Очищення всіх бронювань
function clearAllReservations() {
    console.log("Очищення всіх бронювань.");
    if(confirm('Ви впевнені, що хочете видалити всі бронювання? Цю дію не можна скасувати.')) {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('reservationRestaurant_') || key.startsWith('hotelReservation_')) {
                localStorage.removeItem(key);
                console.log(`Бронювання видалено: ${key}`);
            }
        });
        displayRestaurantReservations();
        displayHotelReservations();
        displayReservationCount();
        alert('Всі бронювання видалено.');
    }
}

// Очищення змін у меню
function clearMenuChanges() {
    console.log("Очищення змін у меню.");
    if(confirm('Ви впевнені, що хочете видалити всі зміни у меню? Цю дію не можна скасувати.')) {
        localStorage.removeItem('menuItems');
        alert('Зміни у меню видалено.');
        console.log('Зміни у меню видалено.');
    }
}

// Очищення змін у паролях
function clearPasswordChanges() {
    console.log("Очищення змін у паролях.");
    if(confirm('Ви впевнені, що хочете видалити всі зміни у паролях? Цю дію не можна скасувати.')) {
        localStorage.removeItem('credentials');
        alert('Зміни у паролях видалено.');
        console.log('Зміни у паролях видалено.');
    }
}

// Зміна пароля
function changePassword() {
    console.log("Зміна пароля.");
    const username = document.getElementById('username').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    if (!username || !newPassword) {
        alert('Заповніть всі поля.');
        console.log('Не заповнені всі поля.');
        return;
    }
    const credentials = JSON.parse(localStorage.getItem('credentials')) || {
        "HMan": "123",
        "RMan": "321",
        "Own": "111"
    };
    if (credentials[username]) {
        credentials[username] = newPassword;
        localStorage.setItem('credentials', JSON.stringify(credentials));
        alert('Пароль змінено успішно.');
        console.log(`Пароль змінено для користувача: ${username}`);
    } else {
        alert('Користувача не знайдено.');
        console.log('Користувача не знайдено.');
    }
}

// Відображення бронювань у ресторані
function displayRestaurantReservations() {
    console.log("Відображення бронювань у ресторані.");
    const reservationsDisplay = document.getElementById('restaurantReservationsBody');
    reservationsDisplay.innerHTML = ''; // Очищення контейнера
    let foundReservations = false; // Змінна для зберігання статусу знайденого бронювання
    // Перебір всіх ключів у локальному сховищі
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Перевірка ключів, які стосуються бронювань ресторану
        if (key.startsWith("reservationRestaurant_")) {
            foundReservations = true; // Встановлення статусу знайденого бронювання
            const reservation = JSON.parse(localStorage.getItem(key)); // Отримання бронювання
            const slotInfo = key.replace("reservationRestaurant_slotRestaurant-", "");
            const formattedTime = formatReservationTime(slotInfo);
            console.log(`Знайдено бронювання: ${JSON.stringify(reservation)}`);
            // Додавання рядка до таблиці з деталями бронювання
            const row = `<tr>
                        <td>${reservation.name}</td>
                        <td>${reservation.contactInfo}</td>
                        <td>${reservation.amountOfPeople}</td>
                        <td>${formattedTime}</td>
                        <td><button onclick="deleteReservation('${key}')">Видалити</button></td>
                      </tr>`;
            reservationsDisplay.insertAdjacentHTML('beforeend', row);
        }
    }

    if (!foundReservations) {
        reservationsDisplay.innerHTML = '<tr><td colspan="5">Бронювань не знайдено.</td></tr>';
        console.log("Бронювань не знайдено.");
    }

    $('#restaurantReservationsTable').DataTable(); // Ініціалізація DataTable
}

// Відображення бронювань у готелі
function displayHotelReservations() {
    console.log("Відображення бронювань у готелі.");
    const reservationsDisplay = document.getElementById('hotelReservationsBody');
    reservationsDisplay.innerHTML = ''; // Очищення контейнера
    let foundReservations = false; // Змінна для зберігання статусу знайденого бронювання
    // Перебір всіх ключів у локальному сховищі
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Перевірка ключів, які стосуються бронювань готелю
        if(key.startsWith('hotelReservation_')) {
            foundReservations = true; // Встановлення статусу знайденого бронювання
            const reservation = JSON.parse(localStorage.getItem(key)); // Отримання бронювання
            console.log(`Знайдено бронювання: ${JSON.stringify(reservation)}`);
            // Додавання рядка до таблиці з деталями бронювання
            const row = `<tr>
                        <td>${reservation.name}</td>
                        <td>${reservation.contactInfo}</td>
                        <td>${reservation.amountOfPeople}</td>
                        <td>${reservation.checkIn}</td>
                        <td>${reservation.checkOut}</td>
                        <td><button onclick="deleteReservation('${key}')">Видалити</button></td>
                      </tr>`;
            reservationsDisplay.insertAdjacentHTML('beforeend', row);
        }
    }

    if (!foundReservations) {
        reservationsDisplay.innerHTML = '<tr><td colspan="6">Бронювань не знайдено.</td></tr>';
        console.log("Бронювань не знайдено.");
    }

    $('#hotelReservationsTable').DataTable(); // Ініціалізація DataTable
}

// Форматування часу бронювання
function formatReservationTime(slotInfo) {
    const [day, time] = slotInfo.split('-');
    return `${day}, ${time}`;
}

// Видалення бронювання
function deleteReservation(key) {
    console.log(`Видалення бронювання: ${key}`);
    if (confirm('Ви впевнені, що хочете видалити це бронювання?')) {
        localStorage.removeItem(key);
        alert('Бронювання видалено.');
        displayRestaurantReservations(); // Оновлення відображення бронювань у ресторані
        displayHotelReservations(); // Оновлення відображення бронювань у готелі
        displayReservationCount(); // Оновлення відображення кількості бронювань
    }
}
