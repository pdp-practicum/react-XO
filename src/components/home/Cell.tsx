import React, { ChangeEvent, Component } from "react";
import Oyin from "./Oyin";
import { Button, Input } from "antd";
import Bigcell from "./Bigcell";
import { LeftOutlined } from '@ant-design/icons';

interface CellState {
  player1: string;
  player2: string;
  newgames: boolean;
  bigcells: boolean;
}

class Cell extends Component<{}, CellState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      newgames: false,
      bigcells: false,
    };
  }

  handlePlayer1 = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ player1: value });
  };

  handlePlayer2 = (event: ChangeEvent<HTMLInputElement>) => {
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

      // this.setState({ newgames: true });
      window.location.reload();

    }
  };

  handleNextButtonClick = () => {
    this.setState({ bigcells: true });
  };

  render() {
    const { player1, player2, newgames, bigcells } = this.state;

    // if (newgames) {
    //   return <Oyin player1={player1} player2={player2} />;
    // }
     if (bigcells) {
      return <Bigcell />;

    }

    return (
      <div className=" p-8">
        <Button icon={<LeftOutlined />} onClick={this.handleNextButtonClick}>
          Next
        </Button>
        <div className="w-full h-[400px]  grid place-items-center">
          <div className="w-[200px] flex flex-col gap-3">
            <h1>1 oyinchi</h1>
            <Input
              className=""
              type="text"
              value={player1}
              onChange={this.handlePlayer1}
            />
            <h1>2 oyinchi</h1>
            <Input
              className=""
              type="text"
              value={player2}
              onChange={this.handlePlayer2}
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
