import {useEffect, useReducer} from "react";
import './App.css';
import Headers from "./components/Header"
import Main from "./components/Main"
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  point : 0,
  highscore: 0
}
function reducer(state, action){
  switch(action.type){
    case 'dataRecived':
      return {
        ...state,
         questions: action.payload,
         status: "ready"
      }
    case 'dataFailed':
      return {
        ...state,
        status: "error"
      }
    case 'start':
      return {
        ...state,
        status: "active"
      }
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point: action.payload  === question.correctOption ? state.point + question.points: state.point,
      }
    case 'nextQuestion':
      return {
        ...state,
        index : state.index + 1,
        answer: null
      }
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore : state.point > state.highscore ? state.point : state.highscore
      }
    case 'reset':
      return {
        ...initialState,
        questions: state.questions,
        status: "ready"
      }
    default:
      throw new Error ("Unkown action");
  }
}
function App() {
  const [{questions, status, index, answer, point, highscore}, dispatch] = useReducer(reducer, initialState);
  const quizLength = questions.length;
  const maxPoints = questions.reduce((prev,cur)=> prev + cur.points,0)

  useEffect(function(){
    fetch( `https://json-server-vercel-nine-chi.vercel.app/questions`)
    .then((res)=>res.json())
    .then((data)=> dispatch({type: 'dataRecived', payload: data}))
    .catch((err)=> dispatch({type: 'dataFailed'}))  
  },[])
  return (
    <div className="App">
    <Headers/>
    <Main>
    {status === 'loading' && <Loader/>}
    {status === 'error' && <Error/>}
    {status === 'ready' && <StartScreen quizLegth={quizLength} dispatch={dispatch}/>}
    {status === 'active' && (<><Progress index = {index} numQuestions={quizLength} points={point} maxPoints={maxPoints} answer={answer}/><Question question={questions[index]} dispatch={dispatch} answer={answer} /><NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={quizLength} /></>)}
    {status === 'finished' && <FinishScreen points={point} maxPoints={maxPoints} highScore={highscore} dispatch={dispatch}/>}
    
      {/* <p>1/15</p>
      <p>Questions</p> */}
    </Main>
    </div>
  );
}

export default App;
