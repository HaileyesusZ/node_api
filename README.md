## About the task

This task is developed using express, a nodejs framework. <br />
The libraries I used are: <br />
mocha - for testing <br />
chai - for assertions <br />
jsonpatch - for patching objects <br />
jimp - for image manipulation <br />
jwt - for token based authentication <br />
pino - for logging <br />

## How to run

First run 'npm install' or 'yarn install', <br />
then start the task with 'npm start' or 'yarn start'. <br />
To run the tests, use 'npm test' or 'yarn test' script.
The tests are found in test folder with each api having its own test file.

## Note

The test script will disable pino by setting an environment variable. <br />

A custom jwt token can be set in package.json.<br />
On production, environment variables can be set in an .env file and can be run using dotenv <br />
as a dev dependency, using its preload option.
