'use strict'


function makeId(length = 6) {
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    const digits = '0123456789'

    let txt = letters.charAt(Math.floor(Math.random() * letters.length))

    for (let i = 0; i < length - 1; i++) {
        txt += digits.charAt(Math.floor(Math.random() * digits.length))
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
