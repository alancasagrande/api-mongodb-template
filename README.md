# API MongoDB Template

Code sample with some implemented features to get you going.

## Stack

* Node.js
* ES6 (Babel)
* MongoDB
* Mongoose
* Mocha + Supertest + Expect.js
* Supervisor
* ESLint
* Docker (optional)

## Implemented Features

* Password authentication (no session)
* Token authentication (no session)
* User: signup, reset password, check username

## Configurable Environment Variables

* NODE_ENV (default: development)
* MONGO_URI (default: mongodb://localhost:27017/api_mongodb_template_development)

## Running locally

To install the dependencies required to run:

`npm install`

To seed the database with default data:

`npm run seed`

To start the API at http://localhost:3000

`npm start`

## Running with Docker

`docker-compose run --service-ports local`

You need to start a bash within the container to run the seed script:

`docker exec -ti [container_name] bash`

`npm run seed`

## Contributing

To watch code changes and restart the API automatically:

`npm run watch`

To run the tests automatically on code changes:

`npm test -- --watch`

To lint the source code:

`npm run lint`
