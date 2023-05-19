import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <button>Count: 0</button>
`

let count = 0
const button = document.querySelector('#app button')
button.addEventListener('click', () => {
    count++
    button.textContent = `Count: ${count}`
})