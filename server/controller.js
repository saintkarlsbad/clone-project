
module.exports = {

    getUser: (req, res, next) => {
        const db = req.app.get('db');

        db.get_user([req.user.id]).then(user => {
            res.status(200).send(user)
        })
    },

    getUserReservations: (req, res, next) => {
        const db = req.app.get('db');

        db.get_user_reservation([req.user.id]).then(reservations => {
            //console.log('user reservations', reservations)
            res.status(200).send(reservations)
        })
    },

    cancelUserReservation: (req, res, next) => {
        const db = req.app.get('db')
        const { reservation_id } = req.params
        console.log(reservation_id, 'res id')

        db.cancel_user_reservation([reservation_id, req.user.id]).then(reservations => {
            res.status(200).send(reservations)
        })
    },

    editReservation: (req, res, next) => {
        const db = req.app.get('db');

        console.log(req.user.id, 'reservation id controller')
        db.specific_reservation([req.user.id]).then(reservations => {
            res.status(200).send(reservations)
        })
    },

    updateReservation: (req, res, next) => {
        const db = req.app.get('db')
        const { dateIn, dateOut, guestAmount } = req.body
        const { reservation_id } = req.params

        db.update_reservation([req.user.id, new Date(dateIn), new Date(dateOut), guestAmount, +reservation_id]).then(reservations => {
            res.status(200).send(reservations)
        })
    },

    createReservation: (req, res, next) => {
        const db = req.app.get('db')
        const { dateIn, dateOut, guestAmount } = req.body

        db.create_reservation([req.user.id, new Date(dateIn), new Date(dateOut), guestAmount]).then(reservations => {
            res.status(200).send(reservations)
        }).catch((err) => console.log(err, 'no res 4 u'))
    },
    payment: (req, res, next) => {
        const db = req.app.get('db')
        const { reservation_id } = req.params

        db.add_payment([req.user.id, reservation_id]).then(reservations => {
            res.status(200).send(reservations)
        })
    }
}