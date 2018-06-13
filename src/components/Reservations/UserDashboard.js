import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import moment from "moment";
import { styles, colors } from '../../Styling/Styling';
import Paper from "material-ui/Paper";
import Chip from "material-ui/Chip";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import { getUserReservations } from "../../ducks/reducer";

class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {}
        }
    }

    componentDidMount() {
        this.props.getUserReservations()
        axios.get('/auth/authenticated').then(user => {
            this.setState({ userData: user.data })
        })
    }

    paymentOwed() {
        return '$' + Math.floor((Math.random() + 1) * 25) + '.00';
    }

    deleteReservation(reservation_id) {

        axios.delete(`/cancelUserReservation/${reservation_id}`).then(res => {
            this.props.getUserReservations()
        })
    }

    showTableHeader() {
        return (
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow >
                    <TableHeaderColumn style={styles.table.tableFont.header}>
                        Start Date
                    </TableHeaderColumn>
                    <TableHeaderColumn style={styles.table.tableFont.header}>
                        End Date
                    </TableHeaderColumn>
                    <TableHeaderColumn style={styles.table.tableFont.header}>
                        # of Guests
                    </TableHeaderColumn>
                    <TableHeaderColumn style={styles.table.tableFont.header}>
                        Edit
                    </TableHeaderColumn>
                    <TableHeaderColumn style={styles.table.tableFont.header}>
                        Delete
                    </TableHeaderColumn>
                    <TableHeaderColumn style={styles.table.tableFont.header}>
                        Payments
                    </TableHeaderColumn>
                </TableRow>
            </TableHeader>
        )
    }

    showReservations(reservations) {
        if (!reservations.length) {
            return (
                <TableRow hoverable={true}>
                    <TableRowColumn>No Reservations To View</TableRowColumn>
                </TableRow>
            )
        } else {
            return reservations.map((reservation, index) => {
                //console.log(this.props.deleteReservation, 'delete button')
                return (
                    <TableRow key={index} >
                        <TableRowColumn style={styles.table.tableFont.row}>
                            {moment(reservation.date_in).format("YYYY-MM-DD")}
                        </TableRowColumn>
                        <TableRowColumn style={styles.table.tableFont.row}>
                            {moment(reservation.date_out).format("YYYY-MM-DD")}
                        </TableRowColumn>
                        <TableRowColumn style={styles.table.tableFont.row}>
                            {reservation.guests}
                        </TableRowColumn>
                        <TableRowColumn style={styles.table.tableFont.row}>
                            <Link to={`/UserReservations/${reservation.reservation_id}`}><RaisedButton label='Edit' /></Link>
                        </TableRowColumn>
                        <TableRowColumn style={styles.table.tableFont.row}>
                            <RaisedButton
                                label='Delete'
                                onClick={() => {
                                    this.deleteReservation(reservation.reservation_id)
                                }}
                            />
                        </TableRowColumn>
                        <TableRowColumn >
                            {reservation.price === true ?
                                <RaisedButton label='paid' disabled={true} />
                                :
                                <Link to={`/Checkout/${reservation.reservation_id}`} ><RaisedButton label='pay now' /></Link>
                            }
                        </TableRowColumn>
                    </TableRow>
                )
            })
        }
    }

    render() {
        console.log('HELLOOOOOO')
        return (
            <div className='container'>
                <Paper style={styles.table.paper} >
                    <h2 style={styles.table.header}>{this.state.userData.first_name}'s Reservations</h2>
                    <Link to='/NewReservation'><button className='reserve'>ADD TRIP</button></Link>
                    <Link to='/Display'><button className='reserve'>ABOUT</button></Link>
                    <a href={`${process.env.REACT_APP_LOGOUT}`}><button className='reserve'>LOGOUT</button></a>
                    <br/>
                    <Table>
                        {this.showTableHeader()}
                        <TableBody displayRowCheckbox={false} >
                            {this.props.reservations ?
                                this.showReservations(this.props.reservations) : ''}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

let actions = {
    getUserReservations
}

function mapStateToProps(state) {
    const { reservations } = state;
    return {
        reservations
    }
}

export default connect(mapStateToProps, actions)(UserDashboard);