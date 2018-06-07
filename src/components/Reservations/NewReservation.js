import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Paper from "material-ui/Paper";
import moment from 'moment';
import { styles } from '../../Styling/Styling';
import { Link } from 'react-router-dom';
import { createReservation } from '../../ducks/reducer';
import DatePicker from 'material-ui/DatePicker/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class NewReservations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateIn: '',
            dateOut: '',
            guestAmount: '',
            calculation: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.paymentOwed = this.paymentOwed.bind(this)
    }

    componentDidMount() {
        const {reservation_id} = this.props.match.params
    }

    handleChange(value) {
        this.setState({
            dateIn: value,
            dateOut: value,
            guestAmount: value
        })
    }

    paymentOwed() {
        this.setState({
            calculation: Math.floor((Math.random() + 1) * 25) + '.00'
        })
    }

    render() {

        return (
            <div className='reservations-container'>
                <Paper style={styles.userReservation.paper}>
                    <h2>New Reservations</h2>
                    <DatePicker
                        autoOk={true}
                        placeholder='Check-In-Date'
                        formatDate={(date) => moment(date).format("YYYY-MM-DD")}
                        onChange={(event, value, index) => this.handleChange(value)}
                        id='uniqueid'
                        shouldDisableDate={
                            function disablePastDates(date) {
                                if (date.getTime() < Date.now()) return true;
                                return false;
                            }}
                    />
                    <DatePicker
                        placeholder='Check-Out-Date'
                        id='uniqueid'
                        formatDate={(date) => moment(date).format("YYYY-MM-DD")}
                        onChange={(event, value, index) => this.handleChange(value)}
                        autoOk={true}
                        shouldDisableDate={
                            function disablePastDates(date) {
                                if (date.getTime() < Date.now()) return true;
                                return false;
                            }}
                    />
                    <select value={this.state.value} onChange={(event, value, index) => { this.handleChange(value, () => { this.paymentOwed() }) }} >
                        <option disabled=''>number of Guests (6 max)</option>
                        <option>1 guest</option>
                        <option>2 guests</option>
                        <option>3 guests</option>
                        <option>4 guests</option>
                        <option>5 guests</option>
                        <option>6 guests</option>
                    </select>
                    <br />
                    <TextField disabled={true} value={this.state.calculation ? this.state.calculation : ''}></TextField>
                    <br />
                    <br />
                    <br />
                    <RaisedButton onClick={() => this.props.createReservation(this.props.match.params.reservation_id, this.state.dateIn, this.state.dateOut, this.state.guestAmount)}>Reserve</RaisedButton>
                </Paper>
                <div>
                    <Link to='/UserDashboard'> <button className='reserve' >Go Back</button> </Link>
                    <Link to='/'> <button className='reserve' >Logout</button> </Link>
                </div>

            </div>
        )
    }
}


let actions = {
    createReservation
}

function mapStateToProps(state) {
    const { reservations } = state;
    return {
        reservations
    }
}

export default connect(mapStateToProps, actions)(NewReservations)




