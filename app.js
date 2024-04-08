// initialize variables
let red
let green
let blue
let opacity
let rgba
let hex
let hsl
let rgbList

// timer
timer()

const texts = document.querySelectorAll('input[type="text"]')
const sliders = document.querySelectorAll('input[type="range"]')

// reset input values on load
window.onload = () => texts.forEach((element) => (element.value = 0))
sliders.forEach((element) => (element.value = 0))
sliders[3].value = 1000
texts[3].value = 1000
// converts rgb values to hexcode and adds 0 infront of hex if the value is < 16
const toHex = (hexVal) => Number(hexVal).toString(16).padStart(2, '0')

// window event listeners to make updating the output box smoother
window.onmousemove = updateScreen
window.onclick = updateScreen
window.onmouseover = updateScreen
window.onmouseup = updateScreen
window.onmousedown = updateScreen
window.onchange = updateScreen

function updateScreen() {
	// give variables data
	// values for the r, g, b, and a
	red = document.querySelector('#red').value
	green = document.querySelector('#green').value
	blue = document.querySelector('#blue').value
	opacity = Math.floor(document.querySelector('#opacity').value / 10) / 100
	// place in these variables to make it easier to read
	rgba = `rgba(${red}, ${green}, ${blue}, ${opacity})`
	hex = `#${toHex(red).toUpperCase()}${toHex(green).toUpperCase()}${toHex(blue).toUpperCase()}`
	rgbList = [red, green, blue, opacity]
	// set background to the values given
	document.querySelector('.output').style.background = rgba
	// set text to the color values
	document.querySelector('.rgb').innerText = rgba
	document.querySelector('.hex').innerText = hex
	// set text inputs to said rgb values
	for (let i = 0; i < texts.length; i++) {
		texts[i].value = rgbList[i]
	}
}

// for each text input, set slider value to what the user has input
texts.forEach(
	(elm) =>
		(elm.onkeyup = (inp) => {
			for (let i = 0; i < texts.length - 1; i++) {
				sliders[i].value = texts[i].value
			}
			sliders[3].value = texts[3].value * 1000
			if (inp.key === 'Enter') document.querySelector('.output').style.background = rgba
		})
)

// function to let you know how long you've been on the site for
function timer() {
	// declare time variables
	let minutes = 0
	let seconds = 0
	let hours = 0
	let days = 0

	// interval that updates every second
	setInterval(() => {
		// checks if hours is greater than 23, and turns it into days
		if (hours > 23) {
			// ternary operator to check if days is 1
			document.getElementById('timer').innerText = days === 1 ? `This site has been active for ${days.toString(10).padStart(2, '0')} day}` : `This site has been active for ${days.toString(10).padStart(2, '0')} days}`
			days++
			hours = -1
		}
		// if hours is not 23 keep doing everything normally
		if (hours < 24) {
			if (seconds >= 59) {
				seconds = -1
				minutes++
			}
			if (seconds <= 59) seconds++
			if (minutes >= 59) {
				minutes = -1
				hours++
			}
			document.getElementById('timer').innerText = `This site has been active for ${hours.toString(10).padStart(2, '0')}:${minutes.toString(10).padStart(2, '0')}:${seconds.toString(10).padStart(2, '0')}`
		}
	}, 1000)
}
