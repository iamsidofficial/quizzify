import { useState } from "react"
import "./App.css"
import StartGame from "./components/StartGame"
import Preferences from "./components/Preferences"
import Trivia from "./components/Trivia"

function App() {
  const [page, setPage] = useState(0)
  const [questionsUrl, setQuestionsUrl] = useState("")

  const pages = [
    <StartGame nextPage={nextPage} />,
    <Preferences nextPage={nextPage} setUrl={setQuestionsUrl} />,
    <Trivia nextPage={nextPage} url={questionsUrl} />
  ]
  function nextPage(pageNo) {
    setPage(pageNo)
  }

  return <>{pages[page]}</>
}

export default App
