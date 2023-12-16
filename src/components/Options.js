function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;
  return (
    <div className="option">
      <div className="options">
        {question.options.map((option, index) => (
          <button
            disabled={answer!=null}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${ hasAnswered ? index === question.correctOption ? "correct":"wrong": ""}`}
            key={option}
            onClick={() =>
              dispatch({
                type: "newAnswer",
                payload: index,
              })
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
