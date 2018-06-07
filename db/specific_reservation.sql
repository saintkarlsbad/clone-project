-- SELECT cabin_users.id, reservations.date_in, reservations.date_out, reservations.guests, reservations.price, reservations.reservation_id
-- FROM cabin_users LEFT JOIN reservations ON cabin_users.id = reservations.reservation_id
-- WHERE reservation_id = $2

-- SELECT * FROM reservations
-- WHERE user_id = $1 AND reservation_id = $2

-- 

-- SELECT *
-- FROM reservations
-- WHERE reservation_id = $1

SELECT cabin_users.id, reservations.reservation_id, reservations.date_in, reservations.date_out, reservations.guests, reservations.price, reservations.user_id
FROM cabin_users
LEFT JOIN reservations ON cabin_users.id = reservations.user_id
WHERE user_id =$1

