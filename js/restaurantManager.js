// restaurantManager.js
// Author: Соц. І.І.

class RestaurantManager {
    constructor() {
        // Ініціалізація функцій після завантаження DOM
        document.addEventListener("DOMContentLoaded", () => {
            console.log("DOM завантажено. Ініціалізація функцій.");
            this.initCheckRestaurantReservations(); // Ініціалізація перевірки бронювань у ресторані
            this.displayRandomReviews(); // Відображення випадкових відгуків
            this.displayProducts(); // Відображення продуктів
        });
    }

    // Ініціалізація перевірки бронювань у ресторані
    initCheckRestaurantReservations() {
        console.log("Ініціалізація перевірки бронювань у ресторані.");
        // Отримання кнопки перевірки бронювань
        const checkRestaurantReservationsButton = document.getElementById('checkRestaurantReservationsButton');
        // Додавання обробника події для перевірки бронювань
        if (checkRestaurantReservationsButton) {
            checkRestaurantReservationsButton.addEventListener('click', () => {
                console.log("Натиснута кнопка перевірки бронювань у ресторані.");
                this.fetchAndDisplayRestaurantReservations(); // Виклик функції отримання та відображення бронювань
            });
        }
    }

    // Отримання та відображення бронювань у ресторані
    fetchAndDisplayRestaurantReservations() {
        console.log("Отримання та відображення бронювань у ресторані.");
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
                                <th scope="col">Час</th>
                            </tr>
                        </thead>
                        <tbody>`;

        // Перебір всіх ключів у локальному сховищі
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // Перевірка ключів, які стосуються бронювань ресторану
            if (key.startsWith("reservationRestaurant_")) {
                foundReservations = true; // Встановлення статусу знайденого бронювання
                const reservation = JSON.parse(localStorage.getItem(key)); // Отримання бронювання
                console.log(`Знайдено бронювання: ${JSON.stringify(reservation)}`);
                const slotInfo = key.replace("reservationRestaurant_slotRestaurant-", "");
                const formattedTime = this.formatReservationTime(slotInfo);
                // Додавання рядка до таблиці з деталями бронювання
                table += `<tr>
                            <td>${reservation.name}</td>
                            <td>${reservation.contactInfo}</td>
                            <td>${reservation.amountOfPeople}</td>
                            <td>${formattedTime}</td>
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

    // Форматування часу бронювання
    formatReservationTime(slotInfo) {
        const [day, time] = slotInfo.split('-');
        return `${day}, ${time}`;
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

    // Відображення продуктів
    displayProducts() {
        console.log("Відображення продуктів.");
        // Масив продуктів
        const products = [
            { photo: 'assets/images/moloko.png', name: 'Молоко', price: 25, quantity: this.getRandomQuantity() },
            { photo: 'assets/images/yaiko.png', name: 'Яйця', price: 40, quantity: this.getRandomQuantity() },
            { photo: 'assets/images/bulka.png', name: 'Хліб', price: 20, quantity: this.getRandomQuantity() },
        ];

        // Отримання контейнера для продуктів
        const productsBody = document.getElementById('productsBody');
        productsBody.innerHTML = ''; // Очищення контейнера

        // Перебір всіх продуктів
        products.forEach(product => {
            console.log(`Додано продукт: ${JSON.stringify(product)}`);
            // Створення рядка таблиці для продукту
            const row = `<tr>
                            <td><img src="${product.photo}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.quantity}</td>
                            <td>
                                <input type="number" min="0" id="order-${product.name}" style="width: 60px;">
                                <button onclick="restaurantManager.orderProduct('${product.name}', ${product.price})">Замовити</button>
                            </td>
                         </tr>`;
            productsBody.insertAdjacentHTML('beforeend', row); // Додавання рядка до таблиці
        });

        $('#productsTable').DataTable(); // Ініціалізація DataTable
    }

    // Отримання випадкової кількості
    getRandomQuantity() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Замовлення продукту
    orderProduct(name, price) {
        console.log(`Замовлення продукту: Ім'я: ${name}, Ціна: ${price}`);
        const quantity = document.getElementById(`order-${name}`).value;
        if (quantity && quantity > 0) {
            const order = { name, price, quantity };
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            alert(`Замовлено ${quantity} кг ${name}.`);
            console.log(`Замовлення додано: ${JSON.stringify(order)}`);
        } else {
            alert('Будь ласка, введіть правильну кількість.');
            console.log('Невірна кількість.');
        }
    }

    // Перегляд замовлень
    viewOrders() {
        console.log("Перегляд замовлень.");
        const ordersTableContainer = document.getElementById('ordersTableContainer');
        const ordersBody = document.getElementById('ordersBody');
        ordersBody.innerHTML = ''; // Очищення контейнера

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        console.log(`Отримані замовлення: ${JSON.stringify(orders)}`);

        orders.forEach((order, index) => {
            // Створення рядка таблиці для замовлення
            const row = `<tr>
                            <td>${order.name}</td>
                            <td>${order.price}</td>
                            <td>${order.quantity}</td>
                            <td><button onclick="restaurantManager.deleteOrder(${index})">Видалити</button></td>
                         </tr>`;
            ordersBody.insertAdjacentHTML('beforeend', row); // Додавання рядка до таблиці
        });

        ordersTableContainer.style.display = 'block'; // Відображення таблиці
        $('#ordersTable').DataTable(); // Ініціалізація DataTable
    }

    // Видалення замовлення
    deleteOrder(index) {
        console.log(`Видалення замовлення за індексом: ${index}`);
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.splice(index, 1); // Видалення замовлення
        localStorage.setItem('orders', JSON.stringify(orders));
        this.viewOrders(); // Оновлення відображення замовлень
    }
}

// Ініціалізація класу RestaurantManager
const restaurantManager = new RestaurantManager();
