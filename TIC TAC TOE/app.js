const grille = document.getElementById("grille");
const statut = document.getElementById("statut");
const reset = document.getElementById("reset");
const scorePlayerone = document.getElementById("scoreX")
const scorePlayertwo = document.getElementById("scoreO")
const matchNull = document.getElementById("scoreNull")
let joueur = "X";
let joueurCourant = true;
let cells = Array(9).fill("");
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
let scoreX = 0
let scoreO = 0
let scoreNull = 0


function createBoard() {
  grille.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", clickCase);
    grille.appendChild(cell);
  });
}
function clickCase(e) {
  const index = e.target.dataset.index;

  if (cells[index] !== "" || !joueurCourant) return;

  cells[index] = joueur;
  e.target.textContent = joueur;

  const victoire = checkWin();

  if (victoire) {
    statut.textContent = `Le joueur ${joueur} a gagné !`;

    if (joueur === "X") {
      scoreX++;
      scorePlayerone.textContent = scoreX;
    } else {
      scoreO++;
      scorePlayertwo.textContent = scoreO;
    }

    joueurCourant = false;

  } else if (cells.every(cell => cell !== "")) {
    statut.textContent = "Match Nul !";
    scoreNull++;
    matchNull.textContent = scoreNull;
    joueurCourant = false;

  } else {
    joueur = joueur === "X" ? "O" : "X";
    statut.textContent = `C'est au tour du joueur ${joueur}`;
  }
}


function checkWin() {
  return winCombos.some(combo => {
    return combo.every(i => cells[i] === joueur);

  });
}

reset.addEventListener("click", () => {
  joueur = "X";
  joueurCourant = true;
  cells = Array(9).fill("");
  statut.textContent = `Au Tour du Joueur ${joueur} de jouer`;
  createBoard();
});

createBoard();
