var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')
var $result = document.querySelector('#result')

var score = 0

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', showGameTime)

function hideObject(object) {
    object.classList.add('hide')
}

function showObject(object) {
    object.classList.remove('hide')
}

function clearObject(object) {
    object.innerHTML = ''
}

function changeObjectText(object, text) {
    object.textContent = text
}

function startGame() {
    hideObject($start)
    $gameTime.disabled = true
    showGameTime()
    $game.style.backgroundColor = '#fff'

    enableTimer()
    renderCircle()
}

function generateRandomRGB() {
    var randomNumber = (4096*Math.random()).toFixed()
    return `#${'0'.repeat((3-toHex(randomNumber).length)) + toHex(randomNumber)}`
}

function renderCircle() {
    clearObject($game)
    var ball = document.createElement('div')
    ball.classList.add('circle')
    generateRandomCircle(ball)
    ball.style.cursor = 'pointer'
    ball.setAttribute('data-box', 'true')
    $game.insertAdjacentElement('afterbegin', ball)
}

function generateRandomCircle(ball) {
    var side = 20 + Math.random()*100

    ball.style.setProperty('--circle-size', `${side}px`)
    ball.style.setProperty('--circle-color', generateRandomRGB())

    ball.style.top = `${(300 - side)*Math.random()}px`
    ball.style.left = `${(300 - side)*Math.random()}px`
}

function handleBoxClick(event) {
    if (event.target.dataset.box) {
        score++
        renderCircle()
    }
}

function enableTimer() {
    var time = parseFloat($time.textContent)
    var interval = setInterval(function() {
        if (time >= 0) {
            changeObjectText($time, time.toFixed(1))
            time -= 0.1
        } else {
            clearInterval(interval)
            endGame()
        }
    }, 100)
}

function resumeGame() {
    score = 0
    hideObject($resultHeader)
    showObject($timeHeader) 
    startGame()
}

function showScore() {
    changeObjectText($result, score.toString())
    showObject($resultHeader)
}

function showGameTime() {
    changeObjectText($time, parseInt($gameTime.value) ? parseInt($gameTime.value).toFixed(1) : '')
}

function endGame() {
    clearObject($game)
    hideObject($timeHeader)
    $game.style.backgroundColor = '#ccc'
    $gameTime.disabled = false
    changeObjectText($start, 'Попробовать снова')
    $start.addEventListener('click', resumeGame)
    showObject($start)
    showScore()
}

function toHex(number) {
    var hexString = ''
    var char
    while(number !== 0) {
        switch(number%16) {
            case 10:
                char = 'a'
                break
            case 11:
                char = 'b'
                break
            case 12:
                char = 'c'
                break
            case 13:
                char = 'd'
                break
            case 14:
                char = 'e'
                break
            case 15:
                char = 'f'
                break
            default:
                char = (number%16).toString()
        }
        hexString = char + hexString
        number /= 16
        number = Math.floor(number)
    }
    return hexString
}