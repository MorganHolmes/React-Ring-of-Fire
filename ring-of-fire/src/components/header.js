import React from "react"
//import Select from 'react-dropdown-select'
import 'bootstrap/dist/css/bootstrap.min.css'


export default class header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headertext: props.headerText
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
    }


    render(){
        return(
            <div style={{backgroundColor:'#ff5964', width:'100%', height:'60px'}}>
                <p style={{fontSize: '40px',width:'100%',marginBlockStart:'0px',float:'left',marginBlockEnd: '0px'}}>{this.state.headertext}</p>
            </div>
            )       
    }
}