'use strict'
var gStartPos
var selectedLine = null

var curr_idx_shape
var mousedown
function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onMove(ev) {
    var terms = getTerms()
    const pos = getEvPos(ev)

    is_mouse_hover_shape(pos.x, pos.y)

    if (!mousedown) return

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    var moveto = { x: dx + gStartPos.x, y: dy + gStartPos.y }

    if (curr_idx_shape != null) {
        selectedLine.x = moveto.x
        selectedLine.y = moveto.y
    }
    else {
        selectedLine = null
        return
    }

    renderChart()
    drawRect(selectedLine)
}

function onUp(ev) {
    mousedown = false
    gCanvas.style.cursor = "default";
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    return pos
}

function onDown(ev) {
    var terms = getTerms()
    mousedown = true
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log((pos.y));
    renderChart()
    gStartPos = pos
    let indexLine = 0

    for (let diagram of terms) {
        var textPosition = getTextPosition(diagram)

        for (const [key, value] of Object.entries(textPosition)) {
            if (is_mouse_on_shape(gStartPos.x, gStartPos.y, value)) {
                curr_idx_shape = indexLine
                selectedLine = value
                drawRect(value)
                changePlaceholder(indexLine, key)
                gCanvas.style.cursor = "grabbing";
                return
            }
            else curr_idx_shape = null
            indexLine++
        }
    }
}

function is_mouse_on_shape(x, y, textPosition) {

    let shape_left = textPosition.center
    let shape_right = textPosition.center + textPosition.width
    var shape_top = textPosition.y - textPosition.height
    var shape_bottom = textPosition.y

    if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
        return true
    }
    return false
}

function is_mouse_hover_shape(x, y) {
    var terms = getTerms()
    for (let diagram of terms) {
        var textPosition = getTextPosition(diagram)
        for (const [key, value] of Object.entries(textPosition)) {
            let shape_left = value.center
            let shape_right = value.center + value.width
            var shape_top = value.y - value.height
            var shape_bottom = value.y

            if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
                gCanvas.style.cursor = "grabbing";
                return true
            }
            else gCanvas.style.cursor = "default";
        }
    }
}

function drawRect(textPosition) {
    let shape_left = textPosition.center - 5
    var shape_top = textPosition.y - textPosition.height

    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'black'
    gCtx.rect(shape_left, shape_top - 10, textPosition.width + 10, textPosition.height + 20);
    gCtx.stroke();
}
