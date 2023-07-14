import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { getQueryEls } from "./utils"
import { Ripple } from "react-awesome-spinners"

export default function Trivia(props) {
  const [queries, setQueries] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [popUpActive, setPopUpActive] = useState(false)
  function getShuffledOptions(
    correctAnswerId,
    correctAnswer,
    incorrectAnswers
  ) {
    return [{ id: correctAnswerId, value: correctAnswer }]
      .concat(incorrectAnswers.map((ans) => ({ id: nanoid(), value: ans })))
      .sort(() => Math.random() - 0.5)
  }

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => {
        const triviaQuestions = data.results.map((query) => {
          const correctAnswerId = nanoid()
          return {
            id: nanoid(),
            question: query.question,
            selected: "",
            correctAnswer: correctAnswerId,
            options: getShuffledOptions(
              correctAnswerId,
              query.correct_answer,
              query.incorrect_answers
            )
          }
        })

        setQueries(triviaQuestions)
      })
  }, [])

  useEffect(() => {
    if (popUpActive) {
      const timeout = setTimeout(() => {
        setPopUpActive(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [popUpActive])

  const correctAnswerCount = gameOver
    ? queries.reduce(
        (correct, query) => correct + (query.selected === query.correctAnswer),
        0
      )
    : 0

  const queryEls = getQueryEls(queries, setQueries, gameOver)
  const classNames = popUpActive ? "PopUp visible" : "PopUp"
  function endGame() {
    if (gameOver) {
      props.nextPage(1)
      return
    }
    const selectedCount = queries.reduce(
      (selectedCount, query) => selectedCount + (query.selected !== ""),
      0
    )
    if (selectedCount === queries.length) {
      setGameOver(true)
    } else {
      setPopUpActive(true)
    }
  }

  return (
    <div className="Trivia">
      {!queries.length ? (
        <>
          <Ripple size="64" color="#5D6BaE" />
          <h2 className="loading-text">Loading Questions...</h2>
        </>
      ) : (
        <>
          <div className={classNames}>You need to answer all questions!</div>
          {queryEls}

          {gameOver && (
            <div className="Trivia--over">
              {`You scored ${correctAnswerCount}/${queries.length}
                            correct answers`}
            </div>
          )}
          <button onClick={endGame} className="StartGame--button">
            {gameOver ? "Play Again" : "Check Answers"}
          </button>
        </>
      )}
    </div>
  )
}
