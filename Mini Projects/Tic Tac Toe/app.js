let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset-btn");
let msg = document.querySelector("#msg");
let messageContainer = document.querySelector(".msg-container");

const winPatterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];

let turnX = true;

const enableButtons = () => {
    for (let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o"); // Add this line
    }
}

const resetGame = () => {
    turnX = true;
    enableButtons();
    messageContainer.classList.add("hide");
    resetButton.innerText = "Reset Game";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked.");
        if (turnX) {
            box.innerText = "X";
            box.classList.add("x"); 
            turnX = false;
        }
        else {
            box.innerText = "O";
            box.classList.add("o"); 
            turnX = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const updateWinner = (winner) => {
    msg.innerText = `Congratulations, the winnner is : ${winner}`;
    messageContainer.classList.remove("hide");
    resetButton.innerText = "New Game";

};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;
        if (position1 != "" && position2 != "" && position3 != "")
        {
            if (position1 === position2 && position2 === position3)
            {
                //disabling the boxes to make sure the game isn't tampered with after the game is over.
                boxes.forEach(box => {
                    box.disabled = true;
                })
                updateWinner(position1);
            }
        }
    }
}

resetButton.addEventListener("click", resetGame);