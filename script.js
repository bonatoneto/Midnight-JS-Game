const cars = document.querySelectorAll('.car')
const selectCars = document.getElementById('cars')
const selectItems = document.getElementById('item-list')
const bet = document.getElementById('bet-list')
const cashView = document.getElementById('cash')
const track = document.getElementById('track')
let cash = 100

function betTime() {
  const selectedCar = selectCars.value
  const selectedItem = selectItems.id
  console.log(selectedItem)
  const betValue = parseInt(bet.value, 10) 
  if (cash < betValue) { 
    alert('Você não tem toda essa grana....')
    return
  }
  cash -= betValue
  cashView.textContent = `$${cash},00`
  startRace(selectedCar, betValue)
}

function startRace(selectedCar, betValue) {
  let winner = null

  const trackLength = track.offsetWidth - 124

  function moveCars() {
    Array.from(cars).forEach(car => {
      const move = Math.random() * 10
      car.style.marginLeft = parseInt(car.style.marginLeft || 0) + move + "px"
      if (parseInt(car.style.marginLeft) >= trackLength) {
        winner = car.id;
        finishRace(winner, selectedCar, betValue, cash)
      }
    })
  }

  const replaceCarName = {
    Ferrari: 'Ferrari 360 Challenge Stradale',
    Skyline: 'Nissan Skyline GT-R',
    Porsche: 'Porsche 911 Carrera Turbo S',
    Lamborghini: 'Lamborghini Gallardo',
    Civic: 'Honda Civic Type-R'
  }

  function finishRace(winnerCar, selectedCar, betValue, totalCash) {
    const winnerCarNameReplaced = replaceCarName[winnerCar] || winnerCar
    const selectedCarNameReplaced = replaceCarName[selectedCar] || selectedCar

    if (selectedCarNameReplaced != winnerCarNameReplaced) {
      alert(`Tomou uma benga da(o) ${winnerCarNameReplaced}..`)
      return
    }
    cashView.textContent = `$${totalCash + betValue * 2},00`
    alert(`Voce ganhou o racha com a(o) ${winnerCarNameReplaced}`)
  }

  const raceInterval = setInterval(() => {
    moveCars();
    if (winner !== null) {
      clearInterval(raceInterval);
      Array.from(cars).forEach(car => {
        car.style.marginLeft = "0"
      })
    }
  }, 10);
}