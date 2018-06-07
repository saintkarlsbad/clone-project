import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
//import DropMenu from '../Cabins/DropMenu';
//import { connect } from 'react-redux';
//import { cabin1Res, getUser } from '../../ducks/reducer';


class Cabins extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            cabinReservations: []
        }
        this.selectedCabin = this.selectedCabin.bind(this);
    }

    componentDidMount() {
        console.log('CabinDidMount')
        axios.get(`/cabinReservationDates/${this.props.match.params.cabin_id}`).then(res => {
            console.log(res.data, 'cabinreservations')
            this.setState({ cabinReservations: res.data })
        })
    }

    selectedCabin(event) {
        if (event.target.value === 'Cabin One') {
            return (this.props.history.push('/Cabins/One'))
        }
        if (event.target.value === 'Cabin Two') {
            return (this.props.history.push('/Cabins/Two'))
        }
        if (event.target.value === 'Cabin Three') {
            return (this.props.history.push('/Cabins/Three'))
        }
        if (event.target.value === 'Cabin Four') {
            return (this.props.history.push('/Cabins/Four'))
        }
        if (event.target.value === 'Cabin Five') {
            return (this.props.history.push('/Cabins/Five'))
        }
    }

    onChange = date => this.setState({ date })

    render() {
        console.log(this.state.cabinReservations)

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
                <Link to='/' style={{ textDecoration: 'none' }}><button className='home'> ^ Home</button></Link>
                <Link to='/About1'> <button >About</button> </Link>
                <select onChange={this.selectedCabin}>
                            <option disabled=''> -- Cabin Availability -- </option>
                            <option>Cabin One</option>
                            <option>Cabin Two</option>
                            <option>Cabin Three</option>
                            <option>Cabin Four</option>
                            <option>Cabin Five</option>
                        </select>
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

// let actions = {
//     cabin1Res
// }

// function mapStateToProps(state) {
//     const { cabinOneReservation } = state;
//     return {
//         cabinOneReservation
//     }
// }

// export default connect(mapStateToProps, { cabin1Res })(Cabin1)
export default Cabins