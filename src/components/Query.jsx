import { decode } from "html-entities"

export default function Query(props) {
  function getClassNames(id) {
    let classNames = "Query--option "
    if (props.gameOver) {
      classNames +=
        props.correctAnswer === id ? "correct-option " : "disabled-option "
      classNames += "disabled-cursor "
      classNames +=
        props.selected === id && props.correctAnswer != id
          ? "incorrect-option"
          : ""
    } else {
      classNames += props.selected === id ? "selected" : ""
    }

    return classNames
  }

  const options = props.options.map((option) => (
    <div
      key={option.id}
      onClick={() => props.selectOption(option.id)}
      className={getClassNames(option.id)}
    >
      {decode(option.value)}
    </div>
  ))

  return (
    <div className="Query">
      <div className="Query--question">{decode(props.question)}</div>
      <div className="Query--options">{options}</div>
    </div>
  )
}
