function StartScreen({quizLegth, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to ReactJS Quiz !</h2>
            <h3>{quizLegth} questions will appear to test your ReactJS mastery</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type: "start"})}>Let's start</button>
        </div>
    )
}

export default StartScreen
