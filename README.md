# ATM

Steps to run this project:

1. Have installed docker/docker-compose/node/npm 
2. Run `npm i` command
3. Run `docker-compose up` command

## Usefull CURLS ##

### Create Client ###

curl --location 'http://localhost:3000/clients' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test123",
    "password": 123
}'

### Login ###

curl --location 'http://localhost:3000/clients/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test123",
    "password": 123
}'

### Transaction ###

curl --location 'http://localhost:3000/transaction' \
--header 'Authorization: eyJhbGciOiJIUzI1NiJ9.MQ.rsvWvotdILs-YCYG3bANtexjjutrWb73gpoIvhsfwuk' \
--header 'Content-Type: application/json' \
--data '{
    "transactionType": "deposit", 
    "amount": 0.80
}'

### See client info ###

curl --location 'http://localhost:3000/clients/1' \
--header 'Authorization: eyJhbGciOiJIUzI1NiJ9.MQ.rsvWvotdILs-YCYG3bANtexjjutrWb73gpoIvhsfwuk'
