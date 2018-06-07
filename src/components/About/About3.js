import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Abouts.css';

class About3 extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
           <div>
               <Link to='/' style={{textDecoration: 'none'}}><button className='home'> ^ Home</button></Link>
           </div> 
        )
        
    }
}

export default About3 