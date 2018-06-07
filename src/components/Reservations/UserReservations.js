import React, { Component } from 'react';
import { connect } from 'react-redux';
//import _ from 'lodash';
import axios from 'axios';
import Paper from "material-ui/Paper";
import moment from 'moment';
import { styles } from '../../Styling/Styling';
import { Link } from 'react-router-dom';
import { getSpecificReservation, resetReservation, updateReservation } from '../../ducks/reducer';
import DatePicker from 'material-ui/DatePicker/DatePicker';
import TextField from 'material-ui/TextField';
import 'react-datepicker/dist/react-datepicker.css';

class UserReservations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            soloReservation: [], 
            dateIn: '', 
            dateOut: '', 
            guestAmount: ''
        }
        this.updateReservation = this.updateReservation.bind(this)
        this.resetReservation = this.resetReservation.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const {reservation_id} = this.props.match.params
        //console.log(this.props.match.params, 'didmount id')
        this.props.getSpecificReservation(reservation_id);
    }

    handleChange(value) {
        this.setState({
            dateIn: value, 
            dateOut: value, 
            guestAmount: value
        })
    }

    resetReservation() {
        // const reservationId = this.props.match.params
        // this.props.getSpecificReservation(reservationId)
        this.props.history.push('/UserDashboard')
    }

    paymentOwed() {
        return '$' + Math.floor((Math.random() + 1) * 25) + '.00';
    }

    updateReservation() {
        // do i need to pass reservation_id through here??
        console.log('update handler', this.props.match.params)
        this.props.history.push('/UserDashboard')
    }

    render() {
        let oneRes = this.props.reservations.length ? this.props.reservations.map((reservation, index) => {
            if (reservation.reservation_id === +this.props.match.params.reservation_id) {
                return (
                    <div key={index}>
                        <DatePicker
                            autoOk={true}
                            formatDate={(date) => moment(date).format("YYYY-MM-DD")}
                            placeholder={moment(reservation.date_in).format("YYYY-MM-DD")}
                            id='uniqueid'
                            onChange={(event, value, index) => this.handleChange(value)}
                            shouldDisableDate={
                                function disablePastDates(date) {
                                    if (date.getTime() < Date.now()) return true;
                                    return false;
                                }}
                        />
                        <DatePicker
                            autoOk={true}
                            placeholder={moment(reservation.date_out).format("YYYY-MM-DD")}
                            id='uniqueid'
                            onChange={(event, value, index) => { this.handleChange(value) }}
                            shouldDisableDate={
                                function disablePastDates(date) {
                                    if (date.getTime() < Date.now()) return true;
                                    return false;
                                }}
                        />
                        <select onChange={(event, value, index) => { this.handleChange(value) }}>
                            <option>{reservation.guests}</option>
                            <option disabled=''>number of Guests (6 max)</option>
                            <option>1 guest</option>
                            <option>2 guests</option>
                            <option>3 guests</option>
                            <option>4 guests</option>
                            <option>5 guests</option>
                            <option>6 guests</option>
                        </select>
                        <br />
                    </div>
                )
                console.log(reservation)
            }
        }) : ''
        //console.log(oneRes)
        //console.log(this.props.reservations, 'reservationprop')
        return (
            <div className='reservations-container'>
                <Paper style={styles.userReservation.paper}>
                    <h2>Edit Reservation</h2>
                    {oneRes}
                    <br />
                    <br />
                    <TextField disabled={true} value={this.props.reservations ? this.paymentOwed() : ''} id='uniqueid'></TextField>
                    <br />
                    <button onClick={this.resetReservation}>Reset</button>
                    <br />
                    <br />
                    <button onClick={() => this.props.updateReservation(this.props.match.params.reservation_id, this.state.dateIn, this.state.dateOut, this.state.guestAmount)}>Update</button>
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
    getSpecificReservation,
    resetReservation,
    updateReservation
}

function mapStateToProps(state) {
    const { reservations } = state;
    return {
        reservations
    }
}

export default connect(mapStateToProps, actions)(UserReservations)




