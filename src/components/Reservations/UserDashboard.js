import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import moment from "moment";
import { styles } from '../../Styling/Styling';
import Paper from "material-ui/Paper";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import { getUserReservations, deleteReservation } from "../../ducks/reducer";

class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deleteReservation: false,
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
                        Price
                    </TableHeaderColumn>
                    <TableHeaderColumn style={styles.table.tableFont.header}>
                        Edit
                    </TableHeaderColumn>
                    <TableHeaderColumn style={styles.table.tableFont.header}>
                        Delete
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
                <RaisedButton
                    label='Delete'
                    onClick={() => {
                        this.props.deleteReservation(reservation.reservation_id)
                    }}
                />
                console.log(this.props.deleteReservation, 'delete button')
                return (
                    <TableRow key={index}>
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
                            {reservation ? this.paymentOwed() : ''}
                        </TableRowColumn>
                        <TableRowColumn style={styles.table.tableFont.row}>
                            <Link to={`/UserReservations/${reservation.reservation_id}`}><RaisedButton>Edit</RaisedButton></Link>
                        </TableRowColumn>
                        <TableRowColumn style={styles.table.tableFont.row}>
                            <RaisedButton>Delete</RaisedButton>
                        </TableRowColumn>
                    </TableRow>
                )
            })
        }
    }



    render() {
        // console.log(this.props.reservations)
        return (
            <div className='container'>
                <Paper style={styles.table.paper} >
                    <h3>{this.state.userData.first_name}'s Reservations</h3>
                    <Link to='/'><button className='reserve'>Logout</button></Link>
                    <Link to='/NewReservation'><button className='reserve'>Add Trip</button></Link>
                    <Table>
                        {this.showTableHeader()}
                        <TableBody displayRowCheckbox={false}>
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
    getUserReservations, 
    deleteReservation
}

function mapStateToProps(state) {
    const { reservations } = state;
    return {
        reservations
    }
}

export default connect(mapStateToProps, actions)(UserDashboard);