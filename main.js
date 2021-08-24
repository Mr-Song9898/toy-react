import { createElement, render, Component } from './react';

// class MyComponment extends Component {
//   constructor (props) {
//     super();

//     this.state = {
//       a: 1,
//       b: 'b',
//     }
//   }

//   render () {
//     const { a, b } = this.state;
//     return (
//      <div>
//         <div>my component</div>
//         <button onClick={() => { this.setState({ a: a + 1 }) }}>add</button><br />
//         <span>{a.toString()}</span>
//         <span>{b}</span>
//         {this.children}
//      </div>
//     )
//   }
// };

// render(<MyComponment id="id" className="c">
//   <h1>title</h1>
//   <span>content</span>
//   <div></div>
// </MyComponment>, document.body);


class Square extends Component {
  // constructor (props) {
  //   super(props);
  // }
  render () {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

render(
  <Game />,
  document.getElementById('root')
);

