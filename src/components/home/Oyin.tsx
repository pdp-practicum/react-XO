import React, { Component } from "react";

interface OyinProps {
	player1: string;
	player2: string;
}

interface OyinState {
	cells: (string | null)[];
	currentPlayer: string;
}

class Oyin extends Component<OyinProps, OyinState> {
	constructor(props: OyinProps) {
		super(props);
		this.state = {
			cells: Array(9).fill(null),
			currentPlayer: "X",
		};
	}

	handleClick = (index: number) => {
		const { cells, currentPlayer } = this.state;

		if (cells[index] === null) {
			const newCells = cells.slice();
			newCells[index] = currentPlayer;
			this.setState({ cells: newCells, currentPlayer: currentPlayer === "X" ? "O" : "X" });
		}
	};

	renderCell = (value: string | null, index: number) => (
		<div key={index} className="cell border text-blue-400 grid place-items-center cursor-pointer text-[50px]" onClick={() => this.handleClick(index)}>
			{value}
		</div>
	);

	renderBoard = () => {
		const { cells } = this.state;

		return cells.map((cell, index) => this.renderCell(cell, index));
	};

 
	render() {
		return (
			<div className="w-full grid place-items-center">
				<div>
					<h1>{this.props.player1}</h1>
					<h1>{this.props.player2}</h1>
				</div>
				<div className="status bg-slate-100 h-[400px] w-[400px] grid grid-cols-3 grid-rows-3">{this.renderBoard()}</div>
			</div>
		);
	}
}

export default Oyin;
