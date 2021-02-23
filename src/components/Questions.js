
import React,{Component} from 'react';
import '../assets/style.css';
import quizService from '../quizService/index';
import QuestionBox from './QuestionBox';
import Result from './Result';


class Questions extends Component{
	state={
		questionBank:[],
		score:0,
		responces:0

	}
	//--------------------------
	 getQuestion=()=>{
		quizService().then(tarkiblar=>{
		this.setState({
			questionBank:tarkiblar
		});
	})

	}
	//--------------------------
	computeAnswer=(answer,correctAnswer)=>{
		if(answer===correctAnswer){
        this.setState({
        	score:this.state.score+1
        });
		}
		this.setState({
			responces:this.state.responces<6 ? this.state.responces+1: 6
		});
	}
	//----------------------------
	playAgain=()=>{
		this.getQuestion();
		this.setState(
		{
			score:0,
			responces:0
		})
	}
	//------------------------
	componentDidMount(){
		this.getQuestion();
	}

//-----------------------------------------
	render(){
  return (
<div className="container">
<div className="title">
<h3 className="headline">Quizzbee test</h3>
</div>
{this.state.questionBank.length>0 && this.state.responces<6 &&
	this.state.questionBank
.map(({question,answers,correct,questionId})=>(
	<QuestionBox question={question}
	options={answers}
	key={questionId}
	selected={answer=>this.computeAnswer(answer,correct)}
	/>
     )
	)}
{this.state.responces===6 ? 
<Result score={this.state.score}
playAgain={this.playAgain}/>: null}

</div> 

);

	}

}

export default Questions;