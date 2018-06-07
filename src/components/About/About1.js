import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Abouts.css';

class About1 extends Component {
    constructor() {
        super()
        this.state = {
            selected: true
        }
        this.selectedCabin = this.selectedCabin.bind(this);
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
            return (this.props.history.push('/Cabin/Five'))
        }
    }

    render() {
        let styles = {
            height: '100px',

        }
        return (
            <div style={styles}>
                <header style={styles}>
                    <div >
                        <Link to='/'> <button >Home</button> </Link>

                        <Link to='/UserReservations'>  <button>Reservations</button></Link>
                        <Link to='/UserDashboard'>  <button>UserPage</button></Link>
                        <select onChange={this.selectedCabin}>
                            <option disabled=''> -- Cabin Availability -- </option>
                            <option>Cabin One</option>
                            <option>Cabin Two</option>
                            <option>Cabin Three</option>
                            <option>Cabin Four</option>
                            <option>Cabin Five</option>
                        </select>

                    </div>
                </header>
            </div> // ^^ make conditional rendering that checks if they are logged in to reserve a cabin
        )
    }
}
export default About1;   