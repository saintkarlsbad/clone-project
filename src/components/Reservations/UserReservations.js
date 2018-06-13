import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Paper from "material-ui/Paper";
import moment from 'moment';
import { styles } from '../../Styling/Styling';
import { Link } from 'react-router-dom';
import { getSpecificReservation, setDateIn, setDateOut, setGuestAmount } from '../../ducks/reducer';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker/DatePicker';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';



class UserReservations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {}
        }
        this.updateReservation = this.updateReservation.bind(this)
        //this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { reservation_id } = this.props.match.params
        //console.log(this.props.match.params, 'didmount id')
        this.props.getSpecificReservation(reservation_id);
    }

    paymentOwed() {
        return '$' + Math.floor((Math.random() + 1) * 25) + '.00';
    }

    updateReservation() {
        const { reservation_id } = this.props.match.params
        const { dateIn, dateOut, guestAmount } = this.props

        axios.put(`/updateReservation/${reservation_id}`, { dateIn, dateOut, guestAmount })
        this.props.history.push('/UserDashboard')
    }

    render() {
        let oneRes = this.props.reservations.length ? this.props.reservations.map((reservation, index) => {
            if (reservation.reservation_id === +this.props.match.params.reservation_id) {
                return (
                    <div key={index} className=''>
                        <Paper style={styles.userReservation.paper} 
                        overlayStyle={{backgroundColor: 'transparent'}}
                        >
                            <h2 style={styles.userReservation.header}> EDIT RESERVATION</h2>
                            <br />
                            <br />
                            <DatePicker
                                autoOk={true}
                                formatDate={(date) => moment(date).format("YYYY-MM-DD")}
                                placeholder={moment(reservation.date_in).format("YYYY-MM-DD")}
                                id='uniqueid'
                                onChange={(event, value, index) => this.props.setDateIn(value)}
                                shouldDisableDate={
                                    function disablePastDates(date) {
                                        if (date.getTime() < Date.now()) return true;
                                        return false;
                                    }}
                            />
                            <br />
                            <DatePicker
                                autoOk={true}
                                placeholder={moment(reservation.date_out).format("YYYY-MM-DD")}
                                id='uniqueid'
                                onChange={(event, value, index) => { this.props.setDateOut(value) }}
                                shouldDisableDate={
                                    function disablePastDates(date) {
                                        if (date.getTime() < Date.now()) return true;
                                        return false;
                                    }}
                            />
                            <br />
                            <br />
                            <br />
                            <select onChange={(e) => { this.props.setGuestAmount(e.target.value) }} style={styles.userReservation.select}>
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
                            <br />
                            <br />
                            <Link to='/UserDashboard'><RaisedButton label='cancel' /></Link>
                            <br />
                            <br />
                            <RaisedButton onClick={() => this.updateReservation()} label='Update'></RaisedButton>
                            <br />
                            <br />
                            <br />
                            <br />
                            <p style={styles.userReservation.p}>***</p>
                            <p style={styles.userReservation.p}> You must cancel or edit your reservation within 48 hours of your scheduled stay in order to receive a full refund </p>
                            <p style={styles.userReservation.p}>***</p>
                        </Paper>
                    </div>
                )
                console.log(reservation.date_in)
            }
        }) : ''
        return (
            <div className='userRexBox'>
                {oneRes}
            </div>
        )
    }
}

let actions = {
    getSpecificReservation,
    setDateIn,
    setDateOut,
    setGuestAmount
}

function mapStateToProps(state) {
    const { reservations, dateIn, dateOut, guestAmount } = state;
    return {
        reservations,
        dateIn,
        dateOut,
        guestAmount
    }
}

export default connect(mapStateToProps, actions)(UserReservations)




