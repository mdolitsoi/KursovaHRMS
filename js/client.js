// Додавання обробника події, який виконується після завантаження DOM
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM повністю завантажений. Ініціалізація функцій.");
    // Виклик функції для генерації таблиці бронювань ресторану
    generateReservationTableRestaurant();
    // Ініціалізація модального вікна для ресторану
    initModalRestaurant();
    // Ініціалізація модального вікна для готелю
    initModalHotel();
    // Відображення елементів меню
    displayMenuItems();
    // Ініціалізація кнопки "Назад"
    initBackButton();
});

// Генерація таблиці бронювань для ресторану
// Author: Соц. І.І.
function generateReservationTableRestaurant() {
    console.log("Генерація таблиці бронювань для ресторану.");
    // Отримання контейнера для таблиці бронювань
    const tableContainer = document.getElementById("reservationTable");
    // Перевірка наявності контейнера
    if (!tableContainer) {
        console.log("Контейнер для таблиці бронювань не знайдено.");
        return; // Вихід з функції, якщо контейнер не знайдено
    }
    // Очищення вмісту контейнера
    tableContainer.innerHTML = '';
    // Визначення часу для бронювання
    const times = ["12:00", "14:00", "16:00", "18:00"];
    // Визначення днів для бронювання
    const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"];
    // Створення таблиці
    const table = document.createElement('table');
    table.className = 'reservation-table'; // Присвоєння класу таблиці
    // Створення рядків таблиці для кожного часу
    times.forEach(time => {
        const row = table.insertRow(); // Вставка нового рядка
        // Створення комірок таблиці для кожного дня
        days.forEach(day => {
            const cell = row.insertCell(); // Вставка нової комірки
            const slotId = `slotRestaurant-${day}-${time}`; // Визначення ідентифікатора комірки
            cell.id = slotId; // Присвоєння ідентифікатора комірці
            cell.textContent = `${day} ${time}`; // Встановлення тексту комірки
            cell.className = 'reservation-slot'; // Присвоєння класу комірці
            // Перевірка наявності бронювання у локальному сховищі
            if(localStorage.getItem(`reservationRestaurant_${slotId}`)) {
                cell.classList.add('reserved'); // Додавання класу, якщо комірка зарезервована
                console.log(`Комірка зарезервована: ${slotId}`);
            } else {
                // Додавання обробника події для відкриття модального вікна
                cell.addEventListener('click', () => openModalRestaurant(slotId));
            }
        });
    });
    // Додавання таблиці до контейнера
    tableContainer.appendChild(table);
    console.log("Таблиця бронювань згенерована і додана до контейнера.");
}

// Ініціалізація модального вікна для ресторану
// Author: Соц. І.І.
function initModalRestaurant() {
    console.log("Ініціалізація модального вікна для ресторану.");
    // Отримання кнопки перевірки бронювань
    const checkReservationsButton = document.getElementById("checkReservationsRestaurant");
    // Додавання обробника події для перевірки бронювань
    if (checkReservationsButton) {
        checkReservationsButton.addEventListener("click", initRestaurantReservationSearch);
        console.log("Додавання обробника події для кнопки перевірки бронювань в ресторані.");
    }
    // Отримання кнопки закриття модального вікна
    const closeModalButton = document.querySelector(".modal .close-button");
    // Додавання обробника події для закриття модального вікна
    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeModalRestaurant);
        console.log("Додавання обробника події для кнопки закриття модального вікна ресторану.");
    }
    // Отримання кнопки підтвердження бронювання
    const submitButton = document.getElementById("submitReservationRestaurant"); 
    // Додавання обробника події для підтвердження бронювання
    if (submitButton) {
        submitButton.addEventListener("click", submitReservationRestaurant);
        console.log("Додавання обробника події для кнопки підтвердження бронювання в ресторані.");
    }
}

// Ініціалізація пошуку бронювань в ресторані
// Author: Соц. І.І.
function initRestaurantReservationSearch() {
    console.log("Ініціалізація пошуку бронювань в ресторані.");
    // Отримання введеного імені
    const name = document.getElementById("searchName").value.trim();
    // Отримання введеної контактної інформації
    const contactInfo = document.getElementById("searchContactInfo").value.trim();
    console.log(`Пошук бронювань для імені: ${name}, контактної інформації: ${contactInfo}`);
    let found = false; // Змінна для зберігання статусу знайденого бронювання
    // Перебір всіх ключів у локальному сховищі
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Пропуск ключів, які не стосуються бронювань ресторану
        if (!key.startsWith("reservationRestaurant_")) continue;
        const reservation = JSON.parse(localStorage.getItem(key)); // Отримання бронювання
        console.log(`Перевірка бронювання: ${key}`);
        // Перевірка відповідності імені та контактної інформації
        if (reservation.name === name && reservation.contactInfo === contactInfo) {
            const slotInfo = key.replace("reservationRestaurant_slotRestaurant-", "");
            const [day, time] = slotInfo.split('-');
            const formattedSlot = `${day}, ${time}`; // Форматування дати та часу
            // Виведення деталей бронювання
            document.getElementById("reservationDetails").innerHTML = `
                <p>Ім'я: ${reservation.name}</p>
                <p>Контактна інформація: ${reservation.contactInfo}</p>
                <p>Кількість людей: ${reservation.amountOfPeople}</p>
                <p>Дата та час: ${formattedSlot}</p>
            `;
            found = true; // Встановлення статусу знайденого бронювання
            console.log("Бронювання знайдено та відображено.");
            break;
        }
    }
    // Виведення повідомлення, якщо бронювання не знайдено
    if (!found) {
        document.getElementById("reservationDetails").innerHTML = `<p>Не знайдено бронювань на ім'я: ${name} та контактною інформацією: ${contactInfo}</p>`;
        console.log("Бронювання не знайдено.");
    }
}

// Відкриття модального вікна для ресторану
// Author: Соц. І.І.
function openModalRestaurant(slotId) {
    console.log(`Відкриття модального вікна для слоту: ${slotId}`);
    // Отримання модального вікна
    const modal = document.getElementById("reservationRestaurantModal");
    // Отримання елемента для відображення імені слоту
    const slotNameElement = modal.querySelector('#modalSlotName');

    // Форматування назви слоту для відображення
    const readableSlotName = slotId.replace('slotRestaurant-', '').replace('-', ' ');
    slotNameElement.textContent = `День та час: ${readableSlotName}`; // Встановлення тексту для відображення
    modal.style.display = "block"; // Відкриття модального вікна
    modal.dataset.slotId = slotId; // Збереження ідентифікатора слоту в атрибуті модального вікна
    console.log(`Модальне вікно відкрито для слоту: ${slotId}`);
}

// Закриття модального вікна для ресторану
// Author: Соц. І.І.
function closeModalRestaurant() {
    console.log("Закриття модального вікна для ресторану.");
    // Отримання модального вікна
    const modal = document.getElementById("reservationRestaurantModal");
    modal.style.display = "none"; // Закриття модального вікна
}

// Підтвердження бронювання в ресторані
// Author: Соц. І.І.
function submitReservationRestaurant() {
    console.log("Підтвердження бронювання в ресторані.");
    // Отримання ідентифікатора слоту
    const slotId = document.getElementById("reservationRestaurantModal").dataset.slotId;
    // Отримання введеного імені
    const name = document.getElementById("modalName").value.trim();
    // Отримання введеної контактної інформації
    const contactInfo = document.getElementById("modalContactInfo").value.trim();
    // Отримання введеної кількості людей
    const amountOfPeople = document.getElementById("modalAmountOfPeople").value.trim();
    console.log(`Деталі бронювання: Ім'я: ${name}, Контактна інформація: ${contactInfo}, Кількість людей: ${amountOfPeople}, Слот: ${slotId}`);
    // Перевірка на заповненість всіх полів
    if (!name || !contactInfo || !amountOfPeople) {
        alert("Заповніть всі поля."); // Виведення повідомлення, якщо деякі поля не заповнені
        console.log("Бронювання не підтверджено. Деякі поля не заповнені.");
        return; // Вихід з функції, якщо поля не заповнені
    }
    // Формування об'єкта з деталями бронювання
    const reservationDetails = { name, contactInfo, amountOfPeople };
    // Збереження бронювання у локальному сховищі
    localStorage.setItem(`reservationRestaurant_${slotId}`, JSON.stringify(reservationDetails));
    closeModalRestaurant(); // Закриття модального вікна після підтвердження бронювання
    alert("Бронювання в ресторані зареєстровано."); // Виведення повідомлення про успішну реєстрацію бронювання
    console.log("Бронювання в ресторані зареєстровано та збережено у локальному сховищі.");
    incrementReservationCount(); // Збільшення кількості бронювань
    generateReservationTableRestaurant(); // Оновлення таблиці бронювань
}

// Ініціалізація модального вікна для готелю
// Author: Слободенюк О.А.
function initModalHotel() {
    console.log("Ініціалізація модального вікна для готелю.");
    // Отримання кнопки перевірки бронювань
    const checkHotelReservationsButton = document.getElementById("checkHotelReservations");
    // Додавання обробника події для перевірки бронювань
    if (checkHotelReservationsButton) {
        checkHotelReservationsButton.addEventListener("click", initHotelReservationSearch);
        console.log("Додавання обробника події для кнопки перевірки бронювань в готелі.");
    }
    // Отримання кнопки закриття модального вікна
    const closeModalButton = document.querySelector(".modal .close-button");
    // Додавання обробника події для закриття модального вікна
    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeModalHotel);
        console.log("Додавання обробника події для кнопки закриття модального вікна готелю.");
    }
    // Отримання кнопки підтвердження бронювання
    const submitButton = document.getElementById("submitHotelReservation");
    // Додавання обробника події для підтвердження бронювання
    if (submitButton) {
        submitButton.addEventListener("click", submitHotelReservation);
        console.log("Додавання обробника події для кнопки підтвердження бронювання в готелі.");
    }
}

// Ініціалізація пошуку бронювань в готелі
// Author: Слободенюк О.А.
function initHotelReservationSearch() {
    console.log("Ініціалізація пошуку бронювань в готелі.");
    // Отримання введеного імені
    const name = document.getElementById("searchHotelName").value.trim();
    // Отримання введеної контактної інформації
    const contactInfo = document.getElementById("searchHotelContactInfo").value.trim();
    console.log(`Пошук бронювань для імені: ${name}, контактної інформації: ${contactInfo}`);
    let found = false; // Змінна для зберігання статусу знайденого бронювання
    // Перебір всіх ключів у локальному сховищі
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Пропуск ключів, які не стосуються бронювань готелю
        if (!key.startsWith("hotelReservation_")) continue;
        const reservation = JSON.parse(localStorage.getItem(key)); // Отримання бронювання
        console.log(`Перевірка бронювання: ${key}`);
        // Перевірка відповідності імені та контактної інформації
        if (reservation.name === name && reservation.contactInfo === contactInfo) {
            const formattedSlot = `${reservation.checkIn}, ${reservation.checkOut}`; // Форматування дати заїзду та виїзду
            // Виведення деталей бронювання
            document.getElementById("hotelReservationDetails").innerHTML = `
                <p>Ім'я: ${reservation.name}</p>
                <p>Контактна інформація: ${reservation.contactInfo}</p>
                <p>Кількість людей: ${reservation.amountOfPeople}</p>
                <p>Дата заїзду та виїзду: ${formattedSlot}</p>
            `;
            found = true; // Встановлення статусу знайденого бронювання
            console.log("Бронювання знайдено та відображено.");
            break;
        }
    }
    // Виведення повідомлення, якщо бронювання не знайдено
    if (!found) {
        document.getElementById("hotelReservationDetails").innerHTML = `<p>Не знайдено бронювань на ім'я: ${name} та контактною інформацією: ${contactInfo}</p>`;
        console.log("Бронювання не знайдено.");
    }
}

// Відкриття модального вікна для готелю
// Author: Слободенюк О.А.
function openModalHotel(slotId) {
    console.log(`Відкриття модального вікна для слоту: ${slotId}`);
    // Отримання модального вікна
    const modal = document.getElementById("hotelReservationModal");
    modal.style.display = "block"; // Відкриття модального вікна
    modal.dataset.slotId = slotId; // Збереження ідентифікатора слоту в атрибуті модального вікна
    console.log(`Модальне вікно відкрито для слоту: ${slotId}`);
}

// Закриття модального вікна для готелю
// Author: Слободенюк О.А.
function closeModalHotel() {
    console.log("Закриття модального вікна для готелю.");
    // Отримання модального вікна
    const modal = document.getElementById("hotelReservationModal");
    modal.style.display = "none"; // Закриття модального вікна
}

// Підтвердження бронювання в готелі
// Author: Слободенюк О.А.
function submitHotelReservation() {
    console.log("Підтвердження бронювання в готелі.");
    // Отримання введеного імені
    const name = document.getElementById("modalHotelName").value.trim();
    // Отримання введеної контактної інформації
    const contactInfo = document.getElementById("modalHotelContactInfo").value.trim();
    // Отримання введеної кількості людей
    const amountOfPeople = document.getElementById("modalHotelAmountOfPeople").value.trim();
    // Отримання дати заїзду
    const checkIn = document.getElementById("modalHotelCheckIn").value;
    // Отримання дати виїзду
    const checkOut = document.getElementById("modalHotelCheckOut").value;
    // Перевірка на заповненість всіх полів
    if (!name || !contactInfo || !amountOfPeople || !checkIn || !checkOut) {
        alert("Заповніть всі поля."); // Виведення повідомлення, якщо деякі поля не заповнені
        console.log("Бронювання не підтверджено. Деякі поля не заповнені.");
        return; // Вихід з функції, якщо поля не заповнені
    }
    console.log(`Деталі бронювання: Ім'я: ${name}, Контактна інформація: ${contactInfo}, Кількість людей: ${amountOfPeople}, Дата заїзду: ${checkIn}, Дата виїзду: ${checkOut}`);
    // Генерація унікального ключа для бронювання
    const reservationKey = `hotelReservation_${new Date().getTime()}`;
    // Формування об'єкта з деталями бронювання
    const reservationDetails = {name, contactInfo, amountOfPeople, checkIn, checkOut};
    // Збереження бронювання у локальному сховищі
    localStorage.setItem(reservationKey, JSON.stringify(reservationDetails));
    alert("Бронювання в готелі зареєстровано."); // Виведення повідомлення про успішну реєстрацію бронювання
    console.log("Бронювання в готелі зареєстровано та збережено у локальному сховищі.");
    incrementReservationCount(); // Збільшення кількості бронювань
    document.getElementById("BookRoom").style.display = "none"; // Закриття модального вікна після підтвердження бронювання
    // Очищення полів форми після успішного бронювання
    document.getElementById("modalHotelName").value = '';
    document.getElementById("modalHotelContactInfo").value = '';
    document.getElementById("modalHotelAmountOfPeople").value = '';
    document.getElementById("modalHotelCheckIn").value = '';
    document.getElementById("modalHotelCheckOut").value = '';
    console.log("Форма бронювання готелю очищена.");
}

// Відображення елементів меню
// Author: Доліцой М.В.
function displayMenuItems() {
    console.log("Відображення елементів меню.");
    // Отримання елементів меню з локального сховища або порожнього масиву, якщо їх немає
    const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    // Отримання контейнера для меню
    const menuSection = document.getElementById('Menu');
    // Перевірка наявності контейнера
    if (!menuSection) {
        console.log("Контейнер для меню не знайдено.");
        return;
    }
    // Перебір всіх елементів меню
    menuItems.forEach(item => {
        // Створення div для кожного елемента меню
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'menu-item'; // Присвоєння класу div
        // Встановлення вмісту div з інформацією про елемент меню
        menuItemDiv.innerHTML = `
            <img src="${item.photoURL}" alt="Menu Item">
            <h3>${item.name} - ${item.price} UAH</h3>
        `;
        // Додавання елемента меню до контейнера
        menuSection.appendChild(menuItemDiv);
        console.log(`Додано елемент меню: ${item.name}`);
    });
}

// Збільшення кількості бронювань
// Author: Доліцой М.В.
function incrementReservationCount() {
    console.log("Збільшення кількості бронювань.");
    // Отримання кількості бронювань з локального сховища або нуля, якщо їх немає
    let reservationCount = parseInt(localStorage.getItem('reservationCount') || '0');
    reservationCount++; // Збільшення кількості бронювань на 1
    // Збереження нової кількості бронювань у локальному сховищі
    localStorage.setItem('reservationCount', reservationCount.toString());
    console.log(`Нова кількість бронювань: ${reservationCount}`);
}