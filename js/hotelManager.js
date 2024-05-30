// HotelManager.js
// Author: Слободенюк О.А.

class HotelManager {
    constructor() {
        // Ініціалізація функцій після завантаження DOM
        document.addEventListener("DOMContentLoaded", () => {
            console.log("DOM завантажено. Ініціалізація функцій.");
            this.initCheckHotelReservations(); // Ініціалізація перевірки бронювань у готелі
            this.displayRandomReviews(); // Відображення випадкових відгуків
            this.setupChart(); // Налаштування графіка
        });
    }

    // Ініціалізація перевірки бронювань у готелі
    initCheckHotelReservations() {
        console.log("Ініціалізація перевірки бронювань у готелі.");
        // Отримання кнопки перевірки бронювань
        const checkHotelReservationsButton = document.getElementById('checkHotelReservationsButton');
        // Додавання обробника події для перевірки бронювань
        if (checkHotelReservationsButton) {
            checkHotelReservationsButton.addEventListener('click', () => {
                console.log("Натиснута кнопка перевірки бронювань у готелі.");
                this.fetchAndDisplayHotelReservations(); // Виклик функції отримання та відображення бронювань
            });
        }
    }

    // Отримання та відображення бронювань у готелі
    fetchAndDisplayHotelReservations() {
        console.log("Отримання та відображення бронювань у готелі.");
        // Отримання контейнера для відображення бронювань
        const reservationsDisplay = document.getElementById('reservationsDisplay');
        reservationsDisplay.innerHTML = ''; // Очищення контейнера
        let foundReservations = false; // Змінна для зберігання статусу знайденого бронювання
        // Створення таблиці для відображення бронювань
        let table = `<table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Ім'я</th>
                                <th scope="col">Контактна інформація</th>
                                <th scope="col">Кількість людей</th>
                                <th scope="col">Дата заїзду</th>
                                <th scope="col">Дата виїзду</th>
                            </tr>
                        </thead>
                        <tbody>`;
        // Перебір всіх ключів у локальному сховищі
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // Перевірка ключів, які стосуються бронювань готелю
            if (key.startsWith('hotelReservation_')) {
                foundReservations = true; // Встановлення статусу знайденого бронювання
                const reservation = JSON.parse(localStorage.getItem(key)); // Отримання бронювання
                console.log(`Знайдено бронювання: ${JSON.stringify(reservation)}`);
                // Додавання рядка до таблиці з деталями бронювання
                table += `<tr>
                            <td>${reservation.name}</td>
                            <td>${reservation.contactInfo}</td>
                            <td>${reservation.amountOfPeople}</td>
                            <td>${reservation.checkIn}</td>
                            <td>${reservation.checkOut}</td>
                          </tr>`;
            }
        }
        table += '</tbody></table>'; // Закриття таблиці
        // Відображення таблиці або повідомлення про відсутність бронювань
        reservationsDisplay.innerHTML = foundReservations ? table : '<p>Бронювань не знайдено.</p>';
        if (!foundReservations) {
            console.log("Бронювань не знайдено.");
        }
    }

    // Відображення випадкових відгуків
    displayRandomReviews() {
        console.log("Відображення випадкових відгуків.");
        // Масив імен
        const names = ["Олександр", "Марія", "Анна", "Іван", "Вікторія", "Дмитро", "Юлія", "Артем", "Софія", "Олег"];
        // Масив ідентифікаторів
        const ids = [4831, 5921, 1093, 4421, 3150, 2031, 7790, 8662, 5431, 9512];
        // Масив відгуків
        const reviews = [
            "Чудовий ресторан, чудові менеджери.", "Прекрасне обслуговування та атмосфера.", "Їжа була вище всяких похвал.",
            "Незабутній вечір у вашому готелі.", "Завжди чисто та затишно.", "Відмінне місце для відпочинку.",
            "Смачна кухня і доброзичливий персонал.", "Швидке обслуговування та приємні ціни.", "Готель, до якого хочеться повернутися.",
            "Усе на вищому рівні, дякуємо!"
        ];
        // Отримання контейнера для відгуків
        const reviewsDisplay = document.getElementById('reviewsDisplay');
        if (reviewsDisplay) {
            reviewsDisplay.innerHTML = ''; // Очищення контейнера
            // Перебір трьох випадкових відгуків
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * names.length); // Випадковий індекс для імені та ідентифікатора
                const name = names[randomIndex]; // Випадкове ім'я
                const id = ids[randomIndex]; // Випадковий ідентифікатор
                const review = reviews[Math.floor(Math.random() * reviews.length)]; // Випадковий відгук
                const stars = [4, 5][Math.floor(Math.random() * 2)]; // Випадкова кількість зірок (4 або 5)
                const fullStars = Math.floor(stars); // Округлення кількості зірок
                const starIcons = '★'.repeat(fullStars); // Створення рядка зі зірками

                // Створення div для відгуку
                const reviewDiv = document.createElement('div');
                reviewDiv.className = 'review-item'; // Присвоєння класу div
                // Встановлення вмісту div з інформацією про відгук
                reviewDiv.innerHTML = `
                    <p><strong>${name} #${id}</strong></p>
                    <p>${review}</p>
                    <p class="rating">Рейтинг: ${starIcons}</p>
                `;
                // Додавання відгуку до контейнера
                reviewsDisplay.appendChild(reviewDiv);
                console.log(`Додано відгук: Ім'я: ${name}, ID: ${id}, Відгук: ${review}, Рейтинг: ${starIcons}`);
            }
        }
    }

    // Налаштування графіка бронювань
    setupChart() {
        console.log("Налаштування графіка бронювань.");
        // Масив для підрахунку кількості бронювань по місяцях
        const monthCounts = new Array(12).fill(0);
        // Перебір всіх ключів у локальному сховищі
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // Перевірка ключів, які стосуються бронювань готелю
            if (key.startsWith('hotelReservation_')) {
                const reservation = JSON.parse(localStorage.getItem(key)); // Отримання бронювання
                const month = new Date(reservation.checkIn).getMonth(); // Отримання місяця бронювання
                monthCounts[month]++; // Збільшення кількості бронювань для відповідного місяця
                console.log(`Бронювання знайдено: ${JSON.stringify(reservation)}, Місяць: ${month}`);
            }
        }
        // Отримання контексту для графіка
        const ctx = document.getElementById('bookingChart').getContext('2d');
        // Створення графіка
        new Chart(ctx, {
            type: 'line', // Тип графіка - лінійний
            data: {
                labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                datasets: [{
                    label: 'Кількість бронювань по місяцях', // Підпис графіка
                    data: monthCounts, // Дані для графіка
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Колір фону лінії
                    borderColor: 'rgba(255, 99, 132, 1)', // Колір лінії
                    borderWidth: 1, // Ширина лінії
                    fill: false // Відсутність заповнення під лінією
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true // Початок осі Y з нуля
                    }
                }
            }
        });
        console.log("Графік бронювань налаштовано та відображено.");
    }
}

// Ініціалізація класу HotelManager
const hotelManager = new HotelManager();
