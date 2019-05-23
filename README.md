# Dash Backend

## Starting out

Install necessary dependencies with 
```
npm i
```

## Starting the server

The server starts on port 3000. Start the server with 
```
npm start
```

## Writing endpoints

Write minimal code for endpoints in `app.js`. Write more logic in individual files in `src/`.

The generic code for an endpoint is:
```js
app.get('/get-endpoint', (request, response) => {
  /* Simple get request 
    request.body should be in JSON. It is automatically parsed and can be
    accessed like a JS object.
  */
  logic here...
})
app.post('/post-endpoint', (request, response) => {
  /* Simple post request 
    request.body should be in JSON. It is automatically parsed and can be
    accessed like a JS object.
  */
  logic here...
})
```

## Writing logic

Write logic in individual files. Modules are written in the singleton design pattern.

```js
module.exports = {
  object code here...
}
```

Import them as a singleton object as

```js
const mylogic = require('./src/logic-file.js')
```