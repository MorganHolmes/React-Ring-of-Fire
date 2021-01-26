import React from "react"
//import Select from 'react-dropdown-select'
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaPlusCircle, FaMinusCircle} from 'react-icons/fa'
import {Button} from 'react-bootstrap/Button';


export default class game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            player: '',
            players: [],
            deckID: "",
            remainingCards: "",
            numberOfKings: 4,
            rules: new Map()
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
            player: ''
        })
    }

    handleClearSubmit = event => {
        event.preventDefault();
        this.setState({
            players: []
        })
    }

    handleNewSubmit = async event => {
        event.preventDefault();
        const newDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => response.json());
        this.setState({
            deckID: newDeck.deck_id,
            remainingCards: newDeck.remaining
        })  
    }

    handlePickCard = async event => {
        event.preventDefault();
        const pickedCard = await fetch('https://deckofcardsapi.com/api/deck/'+this.state.deckID+'/draw/?count=1').then(res => res.json());
        if(pickedCard.cards[0].code.startsWith('K')){this.setState({numberOfKings: this.state.numberOfKings - 1})};
        this.setState({
            remainingCards: this.state.remainingCards - 1
        })  
    }




    render(){
        return(
            <div style={{backgroundColor:'#fbf5f3', width:'80%', height:'700px', marginLeft:'10%', marginTop:'60px'}}>
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