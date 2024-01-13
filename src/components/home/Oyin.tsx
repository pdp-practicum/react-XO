import { Button } from "antd";
import React, { Component } from "react";
import { toast, Toaster } from "react-hot-toast";
import Bigcell from "./Bigcell";

interface OyinProps {
	id: any;
	player1: string;
	player2: string;
}

interface OyinState {
	cells: (string | null)[];
	XO: string;
	cela: (string | null)[];
	Winner: null;
	BigCell: boolean;
	GameOver: boolean;
}

class Oyin extends Component<OyinProps, OyinState> {
	constructor(props: OyinProps) {
		super(props);
		this.state = {
			cells: Array(9).fill(null),
			XO: "X",
			cela: Array(9).fill(null),
			Winner: null,
			BigCell: false,
			GameOver: false,
		};
	}

	// X O
	handleClick = (index: number) => {
		const { cells, XO } = this.state;

		if (cells[index] === null) {
			const newCells = cells.slice();
			newCells[index] = XO;

			this.setState({
				cells: newCells,
				XO: XO === "X" ? "O" : "X",
			});

			this.makeMove(index, XO);
		}
		//
		// if (cells.map((a: any) => a !== null && a === 9)) {
		// 	this.setState({ GameOver: true });
		// }
		
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
				this.setState({ cela: res.data.board, Winner: res.data.winner });
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

		return cela.map((cell: any, index: number) => this.renderCell(cell, index));
	};

	// relovut
	relovut = () => {
		let requestOptions: RequestInit = {
			method: "PUT",
			redirect: "follow" as RequestRedirect,
		};

		fetch(`http://localhost:4000/api/games/tic-tac-toe/reset/${this.props.id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
		window.location.reload();

		toast.success("Game reset successfully!");
	};

	render() {
		const { Winner, XO, BigCell, GameOver } = this.state;
		const { player1, player2 } = this.props;
		if (BigCell) {
			return <Bigcell />;
		}
		// game over
		if (GameOver) {
			return (
				<div className="w-full h-[100vh] grid place-items-center  bg-gray-100">
					<div className="flex min-h-screen items-center justify-center ">
						<div className="rounded-lg bg-gray-600 px-16 py-14">
							<div className="flex justify-center">
								<div className="rounded-full bg-green-200 p-6">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="h-8 w-8 text-white"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M4.5 12.75l6 6 9-13.5"
											/>
										</svg>
									</div>
								</div>
							</div>
							<h3 className="my-4 text-center text-3xl font-semibold text-gray-100">Game Overe</h3>

							<button
								className="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300"
								onClick={() => this.setState({ BigCell: true })}
							>
								Track Order
							</button>
						</div>
					</div>
				</div>
			);
		}
		// winner
		if (Winner) {
			return (
				<div className="w-full h-[100vh] grid place-items-center  bg-gray-100">
					<div className="flex min-h-screen items-center justify-center ">
						<div className="rounded-lg bg-gray-600 px-16 py-14">
							<div className="flex justify-center">
								<div className="rounded-full bg-green-200 p-6">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="h-8 w-8 text-white"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M4.5 12.75l6 6 9-13.5"
											/>
										</svg>
									</div>
								</div>
							</div>
							<h3 className="my-4 text-center text-3xl font-semibold text-gray-100">Winner!!!</h3>
							<p className="w-[230px] text-center text-2xl font-normal text-gray-100">{Winner}</p>
							<button
								className="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300"
								onClick={() => this.setState({ BigCell: true })}
							>
								Track Order
							</button>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="w-full h-[100vh] grid place-items-center">
				<div className="w-full h-[100vh] grid place-items-center">
					<div className=" flex items-center gap-3">
						<div className="flex items-center gap-3">
							<h1 className="text-[25px]">{this.props.player1}</h1>
							<h1 className="text-[20px]">vs</h1>
							<h1 className="text-[25px]">{this.props.player2}</h1>
						</div>
						<span className=" ml-11 flex items-center gap-2">
							<p className="text-[30px]">{XO === "X" ? player1 : player2} Now</p>
							<p className="text-[30px]">{XO}</p>
						</span>
					</div>
					<div className="status bg-slate-100 h-[400px] w-[400px] grid grid-cols-3 grid-rows-3">
						{this.renderBoard()}
					</div>

					<Button onClick={this.relovut}>{}Relout</Button>
				</div>
			</div>
		);
	}
}

export default Oyin;
