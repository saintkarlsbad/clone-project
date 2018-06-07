
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
            console.log('user reservations', reservations)
            res.status(200).send(reservations)
        })
    },

    cancelUserReservation: (req, res, next) => {
        const db = req.app.get('db');
        const { reservation_id } = req.params
        console.log('reservation id cancel controller', req.params)

        db.cancel_user_reservation([req.user.id, reservation_id]).then(res => {
            console.log('deleted data controller', res.data)
            res.status(200).send(res)
        })
    },

    editReservation: (req, res, next) => {
        const db = req.app.get('db');

        console.log(req.user.id, 'reservation id controller')
        db.specific_reservation([req.user.id]).then(reservations => {
            console.log('specific reservation', reservations)
            res.status(200).send(reservations)
        })
    },

    updateReservation: (req, res, next) => {
        const db = req.app.get('db')
        console.log('update reservations controller', req.body)
        const { dateIn, dateOut, guestAmount } = req.body
        const { reservation_id } = req.params

        db.update_reservation([req.user.id, new Date(dateIn), new Date(dateOut), guestAmount, +reservation_id]).then(reservations => {
            console.log('update reservation', reservations)
            res.status(200).send(reservations)
        })
    },

    createReservation: (req, res, next) => {
        const db = req.app.get('db')
        console.log('create res controller', req.body)
        const { dateIn, dateOut, guestAmount } = req.body
        const { reservation_id } = req.params

        db.create_reservation([req.user.id, new Date(dateIn), new Date(dateOut), guestAmount, +reservation_id]).then(reservations => {
            console.log('create res controller', reservations)
            res.status(200).send(reservations)
        })
    }
}