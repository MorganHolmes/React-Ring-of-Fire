import React from "react";
//import Select from 'react-dropdown-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaPlusCircle, FaMinusCircle} from 'react-icons/fa';



export default class game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            player: '',
            players: [],
            deckID: "",
            remainingCards: "",
            numberOfKings: 4,
            rules: new Map(),
            infoMessage: '',
            inGame: false,
            cardImage: 'https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png'
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
    }
    
    handleClick() {
    }

    handleSubmit = event => {
        event.preventDefault();
        //Adds a player to the array - MWH
        this.state.players.push(this.state.player);
        this.setState({
            infoMessage: this.state.player + ' added to the game',
            player: ''
        })
    }

    handleClearSubmit = event => {
        event.preventDefault();
        this.setState({
            players: [],
            infoMessage: 'All Players Removed'
        })
    }

    handleNewSubmit = async event => {
        event.preventDefault();
        const newDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => response.json());
        this.setState({
            deckID: newDeck.deck_id,
            remainingCards: newDeck.remaining,
            numberOfKings: 4,
            infoMessage: 'New Game Started',
            inGame:true
        })  
    }

    handlePickCard = async event => {
        event.preventDefault();
        if(this.state.inGame == true){
            const pickedCard = await fetch('https://deckofcardsapi.com/api/deck/'+this.state.deckID+'/draw/?count=1').then(res => res.json());
            if(pickedCard.cards[0].code.startsWith('K')){this.setState({numberOfKings: this.state.numberOfKings - 1})};

            if(this.state.numberOfKings == 0){this.setState({infoMessage: 'Game Over! Morgan Pick The Last King',inGame:false,cardImage:pickedCard.cards[0].image,remainingCards: this.state.remainingCards - 1})}
            else if(this.state.remainingCards == 0){this.setState({infoMessage: 'Game Over! All Cards Picked'})}
            else{this.setState({
                remainingCards: this.state.remainingCards - 1,
                cardImage: pickedCard.cards[0].image,
                infoMessage: 'Morgan Picked - ' + pickedCard.cards[0].value + " of " + pickedCard.cards[0].suit + "(" + this.state.remainingCards + ")"
            })} ; 
        }else{
            this.setState({
                infoMessage: 'Start a New Game to Pick a Card!'
            })
        }
    }




    render(){
        return(
            <div style={{backgroundColor:'#fbf5f3', width:'80%', height:'700px', marginLeft:'10%',marginTop:'60px'}}>
                <div style={{backgroundColor:'#ff5964', width:'100%', height:'60px', marginBottom:'1%'}}>
                    <p style={{fontSize: '36px',width:'100%',marginBlockStart:'0px',float:'left',marginBlockEnd: '0px'}}>{this.state.infoMessage}</p>
                </div>
                <centre>
                    <img src={this.state.cardImage} style={{width:'25%',height:'65%'}} />
                </centre>
                <div style={{float:"right"}}>
                    <form onSubmit={this.handleNewSubmit}>
                        <button type="submit" className="btn btn-success" data-dismiss="modal">
                        Start New Game <FaPlusCircle />
                        </button>  
                    </form>
                    <br />
                    <form onSubmit={this.handlePickCard}>
                        <button type="submit" className="btn btn-success" data-dismiss="modal">
                        Pick Card <FaPlusCircle />
                        </button>  
                    </form>
                    <br />
                    <h3>Add New Player</h3>
                    <form onSubmit={this.handleSubmit}>
                        <input type = "text" name="player" value={this.state.player} onChange={this.handleInputChange} style={{width:"100%",fontSize:"20px"}} required/>
                        <br />   
                        <br />
                        <button type="submit" className="btn btn-success" data-dismiss="modal">
                        Add Player <FaPlusCircle />
                        </button>  
                    </form>
                    <br />
                    <h3>List of Players</h3>
                    <ol>
                        {this.state.players.map(player => (
                            <li key={player}>{player}</li>
                        ))}
                    </ol>
                    <form onSubmit={this.handleClearSubmit}>
                        <button type="submit" className="btn btn-danger" data-dismiss="modal">
                        Remove All Players <FaMinusCircle />
                        </button>  
                    </form>
                </div>
            </div>
            )       
    }
}