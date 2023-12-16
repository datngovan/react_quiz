import {useEffect, useReducer} from "react";
import './App.css';
import Headers from "./components/Header"
import Main from "./components/Main"
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  point : 0,
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
        index : state.index + 1
      }

    default:
      throw new Error ("Unkown action");
  }
}
function App() {
  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);
  const quizLength = questions.length;

  useEffect(function(){
    fetch("http://localhost:8000/questions")
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
    {status === 'active' && <Question question={questions[index]} dispatch={dispatch} answer={answer}/>}
    
      {/* <p>1/15</p>
      <p>Questions</p> */}
    </Main>
    </div>
  );
}

export default App;
