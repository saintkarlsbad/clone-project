import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Paper from "material-ui/Paper";
import moment from 'moment';
import { styles } from '../../Styling/Styling';
import { Link } from 'react-router-dom';
import { setDateIn, setDateOut, setGuestAmount } from '../../ducks/reducer';
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
        //this.handleChange = this.handleChange.bind(this);
        this.paymentOwed = this.paymentOwed.bind(this)
    }

    // componentDidMount() {
    //     const { reservation_id } = this.props.match.params
    // }

    // handleChange(value) {
    //     console.log(value, 'handle change')
    //     this.setState({
    //         dateIn: value,
    //         dateOut: value,
    //         guestAmount: value
    //     })
    //     this.paymentOwed()
    // }

    paymentOwed() {
        this.setState({
            calculation: Math.floor((Math.random() + 1) * 25) + '.00'
        })
    }

    createReservation() {
        //const { reservation_id } = this.props.match.params
        const { dateIn, dateOut, guestAmount } = this.props

        axios.post('/createReservation', { dateIn, dateOut, guestAmount })
        alert('You must make a payment in order to receive your Door Code')
        this.props.history.push('/UserDashboard')
    }

    render() {
        // console.log(this.props.createReservation, 'createReservation function')
        return (
            <div className='newResBox'>
                <Paper style={styles.userReservation.paper}>
                    <h2 style={styles.userReservation.header}>NEW RESERVATION</h2>
                    <br />
                    <br />
                    <DatePicker
                        autoOk={true}
                        placeholder='Check-In-Date'
                        formatDate={(date) => moment(date).format("YYYY-MM-DD")}
                        onChange={(event, value, index) => this.props.setDateIn(value)}
                        id='uniqueid'
                        shouldDisableDate={
                            function disablePastDates(date) {
                                if (date.getTime() < Date.now()) return true;
                                return false;
                            }}
                    />
                    <br />
                    <DatePicker
                        placeholder='Check-Out-Date'
                        id='uniqueid'
                        formatDate={(date) => moment(date).format("YYYY-MM-DD")}
                        onChange={(event, value, index) => this.props.setDateOut(value)}
                        autoOk={true}
                        shouldDisableDate={
                            function disablePastDates(date) {
                                if (date.getTime() < Date.now()) return true;
                                return false;
                            }}
                    />
                    <br />
                    <br />
                    <br />
                    <select placeholder={this.props.guestAmount} onChange={(e) => { this.props.setGuestAmount(e.target.value), this.paymentOwed() }} style={styles.userReservation.select}>
                        <option disabled=''>Number of Guests</option>
                        <option value='1 guest'>1 guest</option>
                        <option value='2 guests'>2 guests</option>
                        <option value='3 guests'>3 guests</option>
                        <option value='4 guests'>4 guests</option>
                        <option value='5 guests'>5 guests</option>
                        <option value='6 guests'>6 guests</option>
                    </select>
                    <br />
                    <br />
                    <TextField disabled={true} value={this.state.calculation ? this.state.calculation : ''}></TextField>
                    <br />
                    <br />
                    <Link to='/UserDashboard'> <RaisedButton className='reserved' >Cancel</RaisedButton></Link>
                    <br />
                    <br />
                    <RaisedButton onClick={() => this.createReservation()}>Reserve</RaisedButton>
                    <br />
                    <br />
                    <p style={styles.userReservation.p}>***</p>
                    <p style={styles.userReservation.p}> You must cancel or edit your reservation within 48 hours of your scheduled stay in order to receive a full refund </p>
                    <p style={styles.userReservation.p}>***</p>
                    
                </Paper>
                <div>

                </div>

            </div>
        )
    }
}


let actions = {
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

export default connect(mapStateToProps, actions)(NewReservations)




