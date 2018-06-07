INSERT INTO cabin_users
(auth_id, first_name, last_name)
VALUES ($1, $2, $3);
SELECT * FROM cabin_users
WHERE auth_id = $1