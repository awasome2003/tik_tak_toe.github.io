let boxes = document.querySelectorAll(".box")
let resetbtn = document.querySelector("#reset-btn")
let newGamebtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turn_O = true

const winpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const resetGame = () => {
  turn_O = true
  enablesBoxes()
  msgContainer.classList.add("hide")
  msg.innerText = ""
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.disabled || box.innerText) return

    if (turn_O) {
      box.innerText = "O"
    } else {
      box.innerText = "X"
    }

    turn_O = !turn_O
    box.disabled = true

    checkWinner()
  })
})

const disablesBoxes = () => {
  for (let box of boxes) {
    box.disabled = true
  }
}

const enablesBoxes = () => {
  for (let box of boxes) {
    box.disabled = false
    box.innerText = ""
  }
}

const showWinner = (result) => {
    if (result == "Draw!"){
        msg.innerText = `Well Played! ${result}`
    }else{
        msg.innerText = `Congratulations! ${result} wins!`
    }  
  msgContainer.classList.remove("hide")
  disablesBoxes()
}

const checkWinner = () => {
  for (let pattern of winpatterns) {
    let pos1 = boxes[pattern[0]]
    let pos2 = boxes[pattern[1]]
    let pos3 = boxes[pattern[2]]

    if (pos1.innerText && pos2.innerText && pos3.innerText) {
      if (pos1.innerText === pos2.innerText && pos2.innerText === pos3.innerText) {
        showWinner(pos1.innerText)
        return
      }else{
        let filled_boxes = 0
        for (let box of boxes) {
          if (box.innerText) {
            filled_boxes++
          }
        }
        if (filled_boxes === boxes.length) {
          showWinner("Draw!")
        }
      }
    }
  }

}

newGamebtn.addEventListener("click", resetGame)
resetbtn.addEventListener("click", resetGame)