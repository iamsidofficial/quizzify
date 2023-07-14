import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { getQueryEls } from "./utils"
import { Ripple } from "react-awesome-spinners"
import ExitGame from "./ExitGame"

export default function Preferences(props) {
  const [queries, setQueries] = useState([])

  const category = queries[0]?.selected || ""
  const difficultyLevel =
    queries[1]?.options.find((count) => count.id === queries[1]?.selected)
      ?.value || ""
  const countOfQuestions =
    queries[2]?.options.find((count) => count.id === queries[2]?.selected)
      ?.value || 0

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        const triviaArray = data.trivia_categories.map((category) => ({
          id: category.id,
          value: category.name.slice(category.name.indexOf(":") + 1).trim()
        }))
        triviaArray.unshift({ id: -1, value: "Any Category" })

        const difficultyArray = ["easy", "medium", "hard"].map(
          (difficulty) => ({
            id: nanoid(),
            value: difficulty
          })
        )

        const countArray = [3, 5, 10].map((count) => ({
          id: nanoid(),
          value: count
        }))
        setQueries([
          {
            id: nanoid(),
            question: "Category",
            options: triviaArray,
            selected: triviaArray[0]?.id
          },
          {
            id: nanoid(),
            question: "Difficulty",
            options: difficultyArray,
            selected: difficultyArray[0].id
          },
          {
            id: nanoid(),
            question: "Number of Questions",
            options: countArray,
            selected: countArray[0].id
          }
        ])
      })
  }, [])

  function handleClick() {
    const url = `https://opentdb.com/api.php?amount=${countOfQuestions}&difficulty=${difficultyLevel}${
      category !== -1 ? "&category=" + category : ""
    }`
    props.nextPage(2)
    props.setUrl(url)
  }

  const queryEls = getQueryEls(queries, setQueries)

  return (
    <div className="Preferences">
      {!queries.length ? (
        <div className="loader">
          <Ripple size="64" color="#5D6BaE" />
          <h2 className="loading-text">Loading Categories...</h2>
        </div>
      ) : (
        <>
          <ExitGame nextPage={props.nextPage} />
          <div>{queryEls}</div>
          <button onClick={handleClick} className="StartGame--button">
            Start Game
          </button>
        </>
      )}
    </div>
  )
}
