import React from "react";
import Board from "../molecules/board";


interface Props{
}

interface State{
  history:{squares:(number|string|null)[]}[],
  xIsNext:boolean,
  stepNumber:number
}


class Game extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }


  calculateWinner(squares:(number|string)[]):number|string|null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i:number = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


  handleClick( i:number ){

    const history:any[] = this.state.history;
    const current:any = history[history.length - 1];
    const squares:(number|string)[] = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ //historyに結合
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });

  }


  jumpTo(step:number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


  render() {
    const history:any[] = this.state.history;
    const current:any = history[this.state.stepNumber];
    const winner:number|string|null = this.calculateWinner(current.squares);

    //step = 配列
    //move = index番号
    const moves:JSX.Element[] = history.map((step:any, move:number) => {
      const desc:string = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        //リストをレンダリングする場合keyは必須
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status:string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i:number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


export default Game;