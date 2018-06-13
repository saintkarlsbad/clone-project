DELETE FROM reservations
where reservation_id = $1 AND user_id = $2;

SELECT cabin_users.id, reservations.reservation_id, reservations.date_in, reservations.date_out, reservations.guests, reservations.price, reservations.user_id
FROM cabin_users
LEFT JOIN reservations ON cabin_users.id = reservations.user_id
WHERE user_id = $2

