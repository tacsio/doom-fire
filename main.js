const pixelArray = []
const fireWidth = 64
const fireHeight = 45
const FIRE_SOURCE = 36
const debbug = false

const fireColorPallet = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

function main() {
    createDataStructure()
    createFireSource()

    setInterval(propagateFire, 30);
}

function createDataStructure() {
    let pixelArea = size();
    for(let i =0; i < pixelArea; i++) {
        pixelArray[i] = 0
    }    
}

function createFireSource() {
    let startSource = size() - fireWidth
    for (let index = startSource; index < size(); index++) {
        pixelArray[index] = FIRE_SOURCE
    }
}

function propagateFire() {
    let heightWithoutSource = fireHeight - 1;

    for(let row=0; row < heightWithoutSource; row++) {
        for(let column=0; column < fireWidth; column++) {
            let pixelIndex = column + (fireWidth * row)
            updatePixel(pixelIndex)
        }
    }
    render()
}

function updatePixel(pixelIndex) {
    let childIndex = pixelIndex + fireWidth
    let childIntensity = pixelArray[childIndex]

    if(childIntensity <= 0){
        return
    }

    const decay = Math.floor(Math.random() * 3)
    let newIntensity = childIntensity - decay >= 0 ? childIntensity - decay : 0

    pixelArray[pixelIndex + decay] = newIntensity
}

function render() {

    if(debbug){
        renderHtml()
    } else {
        renderPixel()
    }
}

function renderHtml() {
    let html = '<table>'

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'
        
        for (let column = 0; column < fireWidth; column++) {
            let index = column + (fireWidth * row)
            let fireIntensity = pixelArray[index]
            let color = fireColorPallet[fireIntensity]
            let colorString = `${color.r},${color.g},${color.b}`
        
            html += '<td>'
            html += `<div class="pixel-index">${index}</div>`
            html += `<span style="color: rgb(${colorString})">${fireIntensity}</span>`
            html += '</td>'
        }
        
        html += '</tr>'
    }

    html += '</table>'
    let canvas = document.getElementById("fire")
    canvas.innerHTML = html
}

function renderPixel() {
    let html = '<table class="pixel">'

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'
        
        for (let column = 0; column < fireWidth; column++) {
            let index = column + (fireWidth * row)
            let fireIntensity = pixelArray[index]
            let color = fireColorPallet[fireIntensity]
            let colorString = `${color.r},${color.g},${color.b}`
        
            html += `<td class="pixel" style="background-color: rgb(${colorString})">`
            html += '</td>'
        }
        
        html += '</tr>'
    }

    html += '</table>'
    let canvas = document.getElementById("fire")
    canvas.innerHTML = html
}

function size() {
    return fireWidth * fireHeight
}

document.addEventListener('DOMContentLoaded', (e) => {
    main()
});
