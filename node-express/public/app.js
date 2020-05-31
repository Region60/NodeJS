const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {     //и переберая присваиваем каждому значение
        currency: 'rub',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node => {     //выбираем все элементы price
    node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {              //проверяет если класс js-remove
            const id = event.target.dataset.id                                   //получаем id

            fetch('/card/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())                  //не можем использовать await тк работаем в браузере
                .then(card => {                         // получаем объект card
                    if (card.courses.length) {
                        const html = card.courses.map(c => {
                            return `<tr><td>${c.title}</td><td>${c.count}</td><td><button class="btn btn-small js-remove" data-id="${c.id}">Удалить</button></td></tr>`
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent = toCurrency(card.price)
                    } else {
                        $card.innerHtml = '<p>Корзина пуста</p>'
                    }
                })
        }
    })
}