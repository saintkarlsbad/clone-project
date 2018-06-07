UPDATE reservations
SET date_in = $2,
	date_out = $3,
	guests = $4
WHERE user_id = $1 AND reservation_id = $5