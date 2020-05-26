document.querySelectorAll('.price').forEach(node => {     //выбираем все элементы price
    node.textContent = new Intl.NumberFormat('ru-RU', {     //и переберая присваиваем каждому значение
        currency: 'rub',
        style: 'currency'
    }).format(node.textContent)
})