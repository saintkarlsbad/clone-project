import axios from 'axios';
import moment from "moment";

const initialState = {
    user: {},
    reservations: [],
    dateIn: '',
    dateOut: '',
    guestAmount: ''
}

const DATE_IN = "DATE_IN"
const DATE_OUT = "DATE_OUT"
const GUEST_AMOUNT = "GUEST_AMOUNT"

const GET_USER_RESERVATIONS = "GET_USER_RESERVATIONS"
const GET_RESERVATION = "GET_RESERVATION"

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_USER_RESERVATIONS + '_FULFILLED':
            return Object.assign({}, state, { reservations: action.payload })

        case GET_RESERVATION + '_FULFILLED':
            return Object.assign({}, state, { reservations: action.payload })

        case DATE_IN:
            return Object.assign({}, state, {dateIn: action.payload})

        case DATE_OUT:
            return Object.assign({}, state, {dateOut: action.payload})

        case GUEST_AMOUNT:
            return Object.assign({}, state, {guestAmount: action.payload})

        default: return state;
    }
}
  

export function getUserReservations() {
    let reservations = axios.get('/getUserReservations').then(res => {
        return res.data
    }).catch((err) => console.log('no reservations available', err))
    return {
        type: GET_USER_RESERVATIONS,
        payload: reservations
    }
}

export function getSpecificReservation(reservationId) {
    let reservations = axios.get(`/editReservation/${reservationId}`).then(res => {
        return res.data
    })
    return {
        type: GET_RESERVATION,
        payload: reservations
    }
}

export function setDateIn(date_in) {
    return {
        type: DATE_IN, 
        payload: date_in
    }
}

export function setDateOut(date_out) {
    return {
        type: DATE_OUT, 
        payload: date_out
    } 
} 

export function setGuestAmount(guests) {
    return {
        type: GUEST_AMOUNT, 
        payload: guests
    }
}


