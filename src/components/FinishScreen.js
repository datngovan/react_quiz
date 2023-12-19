function FinishScreen({points,maxPoints, highScore, dispatch}) {
    const percentage = points/maxPoints*100
    let emoji;
    if (percentage === 100) emoji = "🥇";
    else if (percentage > 90) emoji = "🥈";
    else if (percentage > 80) emoji = "🥉";
    else if (percentage > 50) emoji = "👍";
    else if (percentage < 50) emoji = "👎";
    else emoji = "😱";
    
    return (
        <>
            <p className="result">
                Your score <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}% {emoji})
            </p>
            <p className="highscore">
                Highscore : {highScore}
            </p>
            <button className="btn btn-ui" onClick={()=>dispatch({type: "reset"})}>Reset Quiz</button>
        </>
    )
}

export default FinishScreen
