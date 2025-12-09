fetch('accessories.json')
    .then(response => response.json())
    .then(items => {
        const container = document.getElementById('cards-container');

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Магазин: ${item.store}</p>
                <p>Цена: ${item.price}</p>
                <label>
                    <input type="checkbox" class="select-item" data-index="${index}">
                    Выбрать
                </label>
            `;

            container.appendChild(card);
        });

        // Кнопка "Заказать"
        const orderButton = document.getElementById('order-button');
        orderButton.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.select-item');
            const selectedItems = [];

            checkboxes.forEach(cb => {
                if(cb.checked){
                    const itemIndex = cb.getAttribute('data-index');
                    selectedItems.push(items[itemIndex].name);
                }
            });

            if(selectedItems.length === 0){
                alert('Вы не выбрали товары!');
                return;
            }

            const searchUrl = `https://yandex.ru/search/?text=${encodeURIComponent(selectedItems.join(', '))}`;
            window.open(searchUrl, '_blank');
        });
    })
    .catch(err => console.error('Ошибка загрузки JSON:', err));
