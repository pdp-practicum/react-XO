import React, { Component } from "react";
import Cell from "./Cell";
import { Button } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import Oyin from "./Oyin";

interface BigcellState {
	cellas: boolean;
	fetchedData: any;
	gamesId: any;
	game: any;
	player1: string;
	player2: string;
}

class Bigcell extends Component<{}, BigcellState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			cellas: false,
			fetchedData: null,
			gamesId: null,
			game: null,
			player1: "",
			player2: "",
		};
	}

	fetchData = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/games/tic-tac-toe");
			const result = await response.json();
			this.setState({ fetchedData: result.data });
			console.log(result);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { cellas, fetchedData, game ,player1,player2 } = this.state;
		if (game) {
			return <Oyin id={game.id} player1={game.player1} player2={game.player2} />;
		}

		if (cellas) {
			return <Cell />;
		}

		return (
			<div className="p-8">
				<Button icon={<RightCircleOutlined />} onClick={() => this.setState({ cellas: true })}>
					New Game
				</Button>

				<div className="w-full h-[100%] grid place-items-center gap-3">
					<div id="bigcell" className="gap-3 grid grid-cols-3 grid-rows-3 ">
						{fetchedData?.map((data: any, idx: number) => (
							<div
								onClick={() => {
									this.setState({ game: data }, () => {
										console.log(`Game ID: ${data.id}, Players: ${data.player1} vs ${data.player2}`);
									});
								}}
								key={idx}
								className="hover:bg-slate-950 hover:text-white flex border bg-slate-300 text-black items-center justify-center gap-2 w-[300px] h-[100px] cursor-pointer"
							>
								<p className="text-[25px]">{data.player1}</p>
								<p className="text-[20px] text-red-400">vs</p>
								<p className="text-[25px]">{data.player2}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Bigcell;
