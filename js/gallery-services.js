'use strict'

var gGallery
var galleryType =
{
    sport: ['Soccer', 'Basketball', 'Tenis', 'Hoki', 'Running', 'Swiming'],
    food: ['Pizza', 'Burger', 'Salat', 'Meat', 'Chips', 'Fish'],
    coins: ['Shekel', 'USD', 'Earo', 'Cent', 'Crypto', 'Bitcoins'],
    politician: ['Trump', 'Bibi', 'Benet', 'Lapid', 'Obama', 'Potin']
}
function createGallery() {
    if (loadFromStorage("gallery")) {
        gGallery = loadFromStorage("gallery")
        return
    }
    else gGallery = []

    for (let i = 0; i < 18; i++) {
        var randomIdx = getRandomIntInclusive(0, 3)
        var type
        var title
        var term1
        var term2
        var value1 = getRandomIntInclusive(1, 99)
        var value2 = 100 - value1
        var randomNum = getRandomIntInclusive(0, 2)
        var theme

        if (randomNum === 0) theme = 'circle'
        else if (randomNum === 1) theme = 'rect'
        else theme = "diagram"

        switch (randomIdx) {
            case 0: {
                type = 'sport'
                title = 'Favorite Sport'
                term1 = galleryType.sport[getRandomIntInclusive(0, 5)]
                term2 = galleryType.sport[getRandomIntInclusive(0, 5)]
                while (term1 === term2) {
                    term2 = galleryType.sport[getRandomIntInclusive(0, 5)]
                }
            }
                break
            case 1: {
                type = 'food'
                title = 'Favorite Food'
                term1 = galleryType.food[getRandomIntInclusive(0, 5)]
                term2 = galleryType.food[getRandomIntInclusive(0, 5)]
                while (term1 === term2) {
                    term2 = galleryType.food[getRandomIntInclusive(0, 5)]
                }
            }
                break
            case 2: {
                type = 'coins'
                title = 'Most used coins'
                term1 = galleryType.coins[getRandomIntInclusive(0, 5)]
                term2 = galleryType.coins[getRandomIntInclusive(0, 5)]
                while (term1 === term2) {
                    term2 = galleryType.coins[getRandomIntInclusive(0, 5)]
                }
            }
                break
            case 3: {
                type = 'politician'
                title = 'Most loved politician'
                term1 = galleryType.politician[getRandomIntInclusive(0, 5)]
                term2 = galleryType.politician[getRandomIntInclusive(0, 5)]
                while (term1 === term2) {
                    term2 = galleryType.politician[getRandomIntInclusive(0, 5)]
                }
            }
                break

        }

        gGallery.push(
            {
                id: makeId(6),
                type: type,
                theme: theme,
                title: {
                    name: title,
                    x: canvas_width,
                    y: 40,
                    fontsize: 34
                },
                style: {
                    font: 'Arial',
                    fontSize: '45px',
                    backgroundColor: 'transparent',
                },
                valueType: 'percent/value',
                terms:
                    [{
                        label: term1,
                        value: value1,
                        percentage: 50,
                        color: colors.gray.regular,
                        brightColor: colors.gray.bright,
                        width: gCanvas.width / 3,
                        textPosition: {
                            value: { x: null, y: 275, width: null, height: null, fontsize: 30 },
                            label: { x: null, y: 290, width: null, height: null, fontsize: 30 }
                        },
                        startPosition: null,
                        endPostion: null
                    },
                    {
                        label: term2,
                        value: value2,
                        color: colors.pink.regular,
                        brightColor: colors.pink.bright,
                        percentage: 50,
                        width: (gCanvas.width / 3) * 2,
                        textPosition: {
                            value: { x: null, y: 275, width: null, height: null, fontsize: 30 },
                            label: { x: null, y: 290, width: null, height: null, fontsize: 30 }
                        },
                        startPosition: null,
                        endPostion: null
                    }
                    ]
            })
    }
    saveToStorage("gallery", gGallery)
}

function renderGallery(gallery = gGallery) {
    var strHtml = ''
    var elGallery = document.querySelector('.gallery-context')
    var idx = 0
    gallery.forEach(graph => {

        gChart = graph
        caculateStatistcs()
        setPostion()
        renderChart()

        var imageUrl = gCanvas.toDataURL("image/jpg");
        strHtml += `<img class="graph-img" onclick="loadFromGallry('${graph.id}')" src="${imageUrl}">`
        idx++
    })
    elGallery.innerHTML = strHtml
}

function loadFromGallry(id) {
    openEditor()
    gChart = getGraphById(id)
    renderChart()
    renderEditor()
}

function onSearch(text) {
    var textFromUser = text.value
    var graphToDisplay = searchGraph(textFromUser)
    renderGallery(graphToDisplay)
}

function searchGraph(text) {
    var graphToDisplay = []
    gGallery.map(book => {
        if (book.type.includes(text)) graphToDisplay.push(book)
    }
    )
    return graphToDisplay
}

