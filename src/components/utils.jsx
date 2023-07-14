import Query from "./Query"

export function selectOption(queryId, optionId, setQueries, gameOver) {
    if(gameOver) return
    setQueries((prevQueries) => {
        return prevQueries.map((prevQuery) => ({
            ...prevQuery,
            selected: prevQuery.id === queryId ? optionId : prevQuery.selected
        }))
    })
}

export function getQueryEls(queries, setQueries, gameOver) {
    return queries.map((query) => (
        <Query
            gameOver={gameOver}
            correctAnswer={query.correctAnswer}
            key={query.id}
            id={query.id}
            question={query.question}
            options={query.options}
            selected={query.selected}
            selectOption={(optionId) =>
                selectOption(query.id, optionId, setQueries, gameOver)
            }
        />
    ))
}
