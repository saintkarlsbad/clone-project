import axios from 'axios';
//import moment from "moment";

const initialState = {
    user: {},
    reservation: [],
    reservations: [],
    dateIn: '',
    dateOut: '',
    numberOfGuests: '',
    calculatedPrice: '',
    cardPayment: ''
}

const GET_USER_RESERVATIONS = "GET_USER_RESERVATIONS"
const GET_RESERVATION = "GET_RESERVATION"
const RESET_RESERVATION = "RESET_RESERVATION"
const UPDATE_RESERVATION = "UPDATE_RESERVATION"
const CREATE_RESERVATION = "CREATE_RESERVATION"
const DELETE_RESERVATION = "DELETE_RESERVATION"

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_USER_RESERVATIONS + '_FULFILLED':
            //console.log(action.payload, 'action payload')
            return Object.assign({}, state, { reservations: action.payload })

        case GET_RESERVATION + '_FULFILLED':
            //console.log(action.payload, 'one reservation payload')
            return Object.assign({}, state, { reservations: action.payload })

        case RESET_RESERVATION + '_FULFILLED':
            return Object.assign({}, state, { reservations: action.payload })

        case UPDATE_RESERVATION + '_FULFILLED':
            console.log(action.payload, 'update payload')
            return Object.assign({}, state, {reservations: action.payload})

        case CREATE_RESERVATION + '_FULFILLED':
            console.log(action.payload, 'create payload')
            return Object.assign({}, state, {reservations: action.payload})

        case DELETE_RESERVATION + '_FULFILLED':
            return Object.assign({}, state, {reservations: action.payload})

        default: return state;
    }
}

export function getUserReservations() {
    let reservations = axios.get('/getUserReservations').then(res => {
        //console.log(res.data, 'reducer reservations')
        return res.data
    }).catch((err) => console.log('no reservations available', err))
    //console.log(reservations, 'return reservations?')
    return {
        type: GET_USER_RESERVATIONS,
        payload: reservations
    }
}

export function getSpecificReservation(reservationId) {
    //console.log(reservationId, 'match stuff')
    let reservations = axios.get(`/editReservation/${reservationId}`).then(res => {
        //console.log(res.data, 'reducer specific reservation')
        return res.data
    })
    //console.log(reservations, 'returning specific reservation?')
    return {
        type: GET_RESERVATION,
        payload: reservations
    }
}

// should updateRes be passing in reservation_id ....??
export function updateReservation(reservationId) {
    let reservations = axios.put(`/updateReservation/${reservationId}`, ).then(res => {
        console.log(res.data, 'update')
        return res.data
    })
    return {
        type: UPDATE_RESERVATION,
        payload: reservations
    }
}

// passing in reservation_id? from req.params or....???
export function createReservation(reservation_id) {
    let reservations = axios.post(`/createReservation/${reservation_id}`).then(res => {
        console.log('create', res.data)
        return res.data
    })
    return {
        type: CREATE_RESERVATION, 
        payload: reservations
    }
}

export function deleteReservation(reservation_id) {
    let reservations = axios.delete(`/cancelUserReservation/${reservation_id}`).then(res => {
        console.log('delete', res.data)
        return res.data
    })
    return {
        type: DELETE_RESERVATION, 
        payload: reservations
    }
}


export function resetReservation(reservations) {
    return {
        type: RESET_RESERVATION,
        payload: reservations
    }
}
