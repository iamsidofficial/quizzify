export default function StartGame(props) {
  return (
    <div className="StartGame">
      <h1 className="StartGame--title">Quizzify</h1>
      <h3 className="StartGame--desc">
        Embark on a Journey of Trivia Exploration!
      </h3>
      <button className="StartGame--button" onClick={() => props.nextPage(1)}>
        Start Quiz
      </button>
    </div>
  )
}
