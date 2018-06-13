
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { getSpecificReservation } from '../../ducks/reducer';
import swal from 'sweetalert2';
import './Checkout.css'

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: 0
        }
    }

    componentDidMount() {
        const { reservation_id } = this.props.match.params
        this.props.getSpecificReservation(reservation_id);

        let payment = Math.floor((Math.random() + 1) * 25).toFixed(2)

        this.setState({
            price: payment
        })

    }

    onPurchaseConfirmation() {
        axios.put(`/Checkout/${this.props.match.params.reservation_id}`)
        console.log(this.props.match.params.reservation_id)
        this.props.history.push('/UserDashboard')
    }

    onToken = token => {
        token.card = void 0;
        console.log('token', token);
        axios.post("/api/payment", { token, amount: this.state.price })
        this.onPurchaseConfirmation();
    }

    render() {
        console.log(this.state.price)
        return (
            <div className='cart'>
                <div className='cart_body'>
                    <Link to='/UserDashboard' style={{ textDecoration: 'none' }}><button className='home'> Cancel</button></Link>
                    <h2>Your total is ${this.state.price}</h2>
                    <div>
                        <StripeCheckout
                            token={this.onToken}
                            stripeKey={
                                'pk_test_iwpa7pGz4uncE3zUUOeUt7E9'}
                            amount={Math.round(this.state.price).toFixed(2) * 100}
                        />

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { getSpecificReservation })(Checkout)