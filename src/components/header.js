import React from "react";
//import Select from 'react-dropdown-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TiThMenu} from "react-icons/ti";


export default class header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headertext: props.headerText,
            showmenu: false
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
    
    handleClick = event => {
        let newState;
        if(this.state.showmenu === false){
            newState = true;
        }
        else{
            newState = false;
        }
        this.setState({
            showmenu: newState
        })
    }

    handleSubmit = event => {
        event.preventDefault();
    }


    render(){
        if(this.state.showmenu === false){
            return(
                <div style={{backgroundColor:'#ff5964', width:'100%', height:'60px'}}>
                    <p style={{fontSize: '40px',width:'94%',marginBlockStart:'0px',float:'left',marginBlockEnd: '0px', marginLeft:'40px'}}>{this.state.headertext}</p>
                    <h1 onClick={this.handleClick} style={{float:'right',marginRight:'1%'}}><TiThMenu /></h1>
                </div>
                )       
        }
        else{
            return(
                <div style={{backgroundColor:'#ff5964', width:'100%', height:'60px'}}>
                    <p style={{fontSize: '40px',width:'95%',marginBlockStart:'0px',float:'left',marginBlockEnd: '0px'}}>{this.state.headertext}</p>
                    <h1 onClick={this.handleClick} style={{float:'right',marginRight:'1%'}}><TiThMenu /></h1>
                    <div style={{backgroundColor: 'white',boxSizing: 'border-box',boxShadow:'rgba(0, 0, 0, 0.2) -3px 3px 6px 0px' ,fontSize: '15px', lineHeight: '17.1429px', opacity: '1', position: 'fixed', right: '0px', top: '60px', width: '250px',
                    zIndex: '999', animation: 'fade-in 400ms forwards'}}>
                        {/* <p><b>{translation.title} v:1.0.0</b></p> */}
                        <h2><b>React Ring of Fire</b></h2>
                        <p>Powered by: https://deckofcardsapi.com/</p>
                        <p>Code available: https://github.com/MorganHolmes/React-Ring-of-Fire</p>

                    </div>
                </div>
                
                )   
        }
    }
}