function consoleToJSON() {
    const c ={}

    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i].split('=')
        c[arg[0]] = arg[1] ? arg[1] : true      // проверяем если присутствует arg[1] то присваеваем его, если нет то
    }                                           // присваиваем true
    return c
}

console.log(consoleToJSON())