class Game {
	constructor(h, w) {
		this.boardData = [];
		this.boardVisuals = [];
		this.winner = "";

		this.boardHeight = h;
		this.boardWidth = w;
		this.player = "";
		for (let i = 0; i < this.boardWidth; i++)
			this.boardData.push([]);
		this.initUI();
	}

	initUI() {
		console.log("Game loaded!");
		this.status = document.querySelector("#status");
		for (let i = 0; i < this.boardWidth; i++) {
			let boardSection = document.createElement("section");
			boardSection.classList.add("section");
			document.querySelector("#gameBox").appendChild(boardSection);
		}
		let section = document.querySelectorAll(".section");
		section.forEach((col, i) => {
			col.setAttribute("id", `sec${i}`);
			for (let i = 0; i < this.boardHeight; i++) {
				let hole = document.createElement("div");
				hole.classList.add("hole");
				col.appendChild(hole);
			}
			this.boardVisuals.push(document.querySelectorAll(`#${col.getAttribute("id")} .hole`));
		});
		this.createEventListeners();
	}

	createEventListeners() {
		// adding event listener on the sections/columns
		let section = document.querySelectorAll(".section");
		section.forEach((col, i) => {
			col.addEventListener("click", (e) => {
				game.takeTurn(i);
			});
		});

		let introBox = document.querySelector("#introBox");
		let nameForm = document.querySelector("form");
		let p1Name = document.querySelector("#p1Name");
		let p2Name = document.querySelector("#p2Name");
		let p1Error = document.querySelector("#p1Error");
		let p2Error = document.querySelector("#p2Error");

		nameForm.addEventListener("submit", (e) => {
			e.preventDefault();
			p1Error.style.opacity = "0";
			p2Error.style.opacity = "0";
			if (p1Name.value == "") {
				p1Error.style.opacity = "1";
				p1Name.focus();
			} else if (p2Name.value == "") {
				p2Error.style.opacity = "1";
				p2Name.focus();
			} else {
				this.p1 = p1Name.value;
				this.p2 = p2Name.value;
				this.player = this.p1;
				this.setStatus(`Next Turn: ${this.player}`);
				introBox.style.opacity = "0";
				setTimeout(() => introBox.style.display = "none", 1000);
			}
		})
	}

	setStatus(msg) {
		this.status.innerHTML = msg;
	}

	// function to display the board on the console
	displayBoard(column, position) {
		let color = this.player == this.p1 ? "linear-gradient(-45deg, #3f75a2, #4b8bc1)" : "linear-gradient(-45deg, #e17367, #ff897a)";
		console.table(this.boardData);
		this.boardVisuals[column][position].classList.add("filled");
		this.boardVisuals[column][position].style.background = color;
	}

	// function to take turn
	takeTurn(column) {
		// check if there is a winner
		if (this.winner == "" && !this.isDraw()) {
			// checking if the column is not full
			if (this.boardData[column].length < this.boardHeight) {
				// inserting the player
				this.boardData[column].push(this.player);

				// checking the rows in both direction
				this.checkRowForward(column, this.player);
				this.checkRowBackward(column, this.player);
				this.checkRowFromBeginning(column, this.player)

				// checking the column
				this.checkColumnForward(column, this.player);

				// checking diagonally
				this.checkDiagonallyTopRightBottomLeft(column, this.player);
				this.checkDiagonallyTopLeftBottomRight(column, this.player);

				// changing player
				this.displayBoard(column, this.boardData[column].length - 1);
				this.player = this.player == this.p1 ? this.p2 : this.p1;
			} else {
				this.setStatus(`Column full. ${this.player} take turn again!`);
			}
		}
		if (this.winner) {
			this.setStatus(`Winner: ${this.winner}`);
		} else if (this.isDraw()) {
			this.setStatus("Board is full. Game Draw.")
		} else {
			this.setStatus(`Next Turn: ${this.player}`);
		}
	}

	isDraw() {
		let draw = true;
		for (let i = 0; i < this.boardData.length; i++) {
			if (this.boardData[i].length < this.boardHeight) {
				draw = false;
				break;
			}
		}
		return draw;
	}

	// function to pickup pins from the positions bottom of the location of the last pin in the column
	checkColumnForward(column, player) {
		let position = this.boardData[column].length - 1;
		let columnToCheck
		if (this.boardData[column].length >= 4) {
			columnToCheck = this.boardData[column].slice(position - 3, position + 1);
			// console.error(columnToCheck);
			this.setWinner(columnToCheck, player);
		}
	}

	// function to pick up pins from the positions right to the location of last pin in the row
	checkRowForward(column, player) {
		let position = this.boardData[column].length - 1;
		let boardToCheck = this.boardData.slice(column, this.boardData.length);
		this.checkRow(boardToCheck, position, player);
		// console.error(boardToCheck);
	}

	// function to pick up pins from the positions left to the location of last pin in the row
	checkRowBackward(column, player) {
		let position = this.boardData[column].length - 1;
		let boardToCheck = this.boardData.slice(0, column + 1);
		this.checkRow(boardToCheck, position, player);
		// console.error(boardToCheck);
	}

	checkRowFromBeginning(column, player) {
		let position = this.boardData[column].length - 1;
		this.boardData.forEach((a, i) => {
			let boardToCheck = this.boardData.slice(i, i + 4);
			if (boardToCheck.length == 4) {
				// console.error(boardToCheck);
				this.checkRow(boardToCheck, position, player);
			}
		});
	}

	checkDiagonallyTopRightBottomLeft(column, player) {
		let position = this.boardData[column].length - 1;
		let matchCount = 1;
		let diagCheck = [];
		diagCheck.push(this.boardData[column][position]);

		// checking bottom-left of the last position
		for (let i = position - 1, j = column - 1, k = 0; k < 3 && i >= 0 && j >= 0; i--, j--, k++) {
			if (player == this.boardData[j][i]) {
				diagCheck.push(this.boardData[j][i]);
				matchCount++;
			} else {
				break;
			}
		}

		// checking top-right of the last position
		for (let i = position + 1, j = column + 1, k = 0; k < 3 && j < this.boardData.length; i++, j++, k++) {
			console.log(i, j);

			if (player == this.boardData[j][i]) {
				diagCheck.push(this.boardData[j][i]);
				matchCount++;
			} else {
				break;
			}
		}
		this.setWinner(diagCheck, player);
	}

	checkDiagonallyTopLeftBottomRight(column, player) {
		let position = this.boardData[column].length - 1;
		let matchCount = 1;
		let diagCheck = [];
		diagCheck.push(this.boardData[column][position]);

		// checking bottom-right of the last position
		for (let i = position - 1, j = column + 1, k = 0; k < 3 && i >= 0 && j < this.boardData.length; i--, j++, k++) {
			console.log(i, j);
			if (player == this.boardData[j][i]) {
				diagCheck.push(this.boardData[j][i]);
				matchCount++;
			} else {
				break;
			}
		}

		// checking top-left of the last position
		for (let i = position + 1, j = column - 1, k = 0; k < 3 && j >= 0; i++, j--, k++) {
			if (player == this.boardData[j][i]) {
				diagCheck.push(this.boardData[j][i]);
				matchCount++;
			} else {
				break;
			}
		}
		this.setWinner(diagCheck, player);
	}

	// check the rows to find the winner
	checkRow(boardToCheck, position, player) {
		let rowToCheck = [];
		if (boardToCheck.length >= 4) {
			for (let i = 0; i < 4; i++) {
				rowToCheck.push(boardToCheck[i][position]);
			}
			this.setWinner(rowToCheck, player);
		}
	}

	// check if there is a winner
	setWinner(connectCheck, player) {
		if (connectCheck.length == 4 && !this.winner) {
			console.error(connectCheck);
			this.winner = connectCheck.every(v => v && v === connectCheck[0]) ? player : "";
			if (this.winner) {
				this.setStatus(`Winner: ${this.winner}`);
			}
		}
	}
}

let h;
let w;
let game = new Game(h ? h : 5, w ? w : 7);