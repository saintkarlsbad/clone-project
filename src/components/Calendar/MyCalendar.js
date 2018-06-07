import React, { Component } from 'react';
//import moment from 'moment';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import './Calendar.css'

class MyCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
        }
    }

    onChange = date => this.setState({ date })

    render() {
        let calendarStyles = {
            position: 'absolute',
            margin: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'relative',
            paddingTop: '50px'
        }

        return (
            <div>
                <Link to='/' style={{textDecoration: 'none'}}><button className='home'> ^ Home</button></Link>
                <div style={calendarStyles}>
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                        selectRange={true}
                    />
                   <Link to='/'> <button className='reserve'>Reserve</button></Link>
                </div>

            </div>

        )
    }
}

export default MyCalendar