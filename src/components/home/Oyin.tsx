import { Button } from "antd";
import React, { Component } from "react";

interface OyinProps {
	id: any;
	player1: string;
	player2: string;
}

interface OyinState {
	cells: (string | null)[];
	currentPlayer: string;
	cela: (string | null)[];
}



class Oyin extends Component<OyinProps, OyinState> {
	constructor(props: OyinProps) {
  super(props);
  this.state = {
    cells: Array(9).fill(null),
    currentPlayer: "X",
    cela: Array(9).fill(null),
  };
}
// X O
	handleClick = (index: number) => {
		const { cells, currentPlayer } = this.state;

		if (cells[index] === null) {
			const newCells = cells.slice();
			newCells[index] = currentPlayer;

			this.setState({
				cells: newCells,
				currentPlayer: currentPlayer === "X" ? "O" : "X",
			});

			this.makeMove(index, currentPlayer);
		}
	};
//  data
	makeMove = (cellIdx: number, player: string) => {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			cellIdx: cellIdx,
			player: player,
		});

		let requestOptions: RequestInit = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(`http://localhost:4000/api/games/tic-tac-toe/move/${this.props.id}`, requestOptions)
			.then((response) => response.json())
			.then((res) => {
				this.setState({cela:res.data.board})
				console.log(res.data.board);
			})
			.catch((error) => console.log("error", error));
	};

//  cell
	renderCell = (value: string | null, index: number) => (
  <div
    key={index}
    className="cell border text-blue-400 grid place-items-center cursor-pointer text-[50px]"
    onClick={() => this.handleClick(index)}
  >
    {value}
  </div>
);

// cel index
renderBoard = () => {
  const { cela } = this.state;

  return cela.map((cell:any, index:number) => this.renderCell(cell, index));
};


// relovut
relovut = () =>{
	let requestOptions: RequestInit = {
  method: 'PUT',
  redirect: 'follow' as RequestRedirect
};

	fetch(`http://localhost:4000/api/games/tic-tac-toe/reset/${this.props.id}`, requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));

}


	render() {
		return (
			<div className="w-full h-[100vh] grid place-items-center">
				<div className="flex items-center gap-6">
					<h1 className="text-[25px]">{this.props.player1}</h1>
					<h1 className="text-[20px]">vs</h1>
					<h1 className="text-[25px]">{this.props.player2}</h1>
				</div>

				<div className="status bg-slate-100 h-[400px] w-[400px] grid grid-cols-3 grid-rows-3">
					{this.renderBoard()}
				</div>

				<Button onClick={this.relovut}>Relout</Button>

			</div>
		);
	}
}

export default Oyin;
