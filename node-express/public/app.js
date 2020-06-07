const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {     //и переберая присваиваем каждому значение
        currency: 'rub',
        style: 'currency'
    }).format(price)
}

const toDate = date => {
    return new Intl.DateFormat('ru-RU', {
        day: '2-digit',
        month:'long',
        year:'numeric',
        hour:'2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(node => {     //выбираем все элементы price
    node.textContent = toCurrency(node.textContent)
})

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
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
                    console.log(card.courses.length)

                    if (card.courses.length) {
                        const html = card.courses.map(c => {
                            return `<tr>
<td>${c.title}</td>
<td>${c.count}</td>
<td>
<button class="btn btn-small js-remove" data-id="${c.id}">Удалить!</button>
</td>
</tr>`
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent = toCurrency(card.price)
                    } else {
                        $card.innerHTML = '<p>Корзина пуста!</p>'
                    }
                })
        }
    })
}

M.Tabs.init(document.querySelectorAll('.tabs'))        //подключаем tabs