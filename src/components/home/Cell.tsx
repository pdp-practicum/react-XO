import React, { ChangeEvent, Component } from "react";
import Oyin from "./Oyin";
import { Button, Input } from "antd";

interface CellState {
  player1: string;
  player2: string;
  sahifa: boolean;
}

class Cell extends Component<{}, CellState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      sahifa: false,
    };
  }

  handlePlayer1Change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ player1: value });
  };

  handlePlayer2Change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ player2: value });
  };

  handleButtonClick = () => {
    const { player1, player2 } = this.state;

    if (player1.trim() !== "" && player2.trim() !== "") {

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        player1,
        player2
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect,
      };

      fetch("http://localhost:4000/api/games/tic-tac-toe", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      this.setState({ sahifa: true });
    }
  };

  render() {
    const { player1, player2, sahifa } = this.state;

    if (sahifa) {
      return <Oyin player1={player1} player2={player2} />;
    }

    return (
      <div>
        <div className="w-full grid place-items-center">
          <div className="w-[200px] flex flex-col gap-3">
            <h1>1 oyinchi</h1>
            <Input
              className=""
              type="text"
              value={player1}
              onChange={this.handlePlayer1Change}
            />
            <h1>2 oyinchi</h1>
            <Input
              className=""
              type="text"
              value={player2}
              onChange={this.handlePlayer2Change}
            />
            <Button
              onClick={this.handleButtonClick}
              disabled={!player1 || !player2}
            >
              Oyin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cell;
