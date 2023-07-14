import { RxExit } from "react-icons/rx"

export default function ExitGame(props) {
  function exitGame() {
    props.nextPage(0)
  }

  return <RxExit onClick={exitGame} className="exit-game-button" />
}
