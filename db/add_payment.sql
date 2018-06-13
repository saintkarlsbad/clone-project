UPDATE reservations
SET price = true
WHERE user_id = $1 AND reservation_id = $2;

SELECT * FROM reservations
WHERE user_id = $1;