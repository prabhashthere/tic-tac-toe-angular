import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  squares: any[] = [];
  xHasMove = true;
  winner: any;
  stepCount = 0;

  constructor() { }

  ngOnInit(): void {
    this.setInitValues();
  }

  setInitValues() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xHasMove = true;
    this.stepCount = 0;
  }

  get nextPlayer() {
    return this.xHasMove ? 'X' : 'O';
  }

  clickSquare(index: number) {
    if ( !this.squares[index] && !this.winner ) {
      this.squares.splice(index, 1, this.nextPlayer);
      this.xHasMove = !this.xHasMove;
      this.stepCount++;
    }
    this.winner = this.checkWinner();
  }

  checkWinner() {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];
    for (let line = 0; line < combinations.length; line++) {
      const [a, b, c] = combinations[line];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

}
