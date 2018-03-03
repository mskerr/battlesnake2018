const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game

  // Response data
  const data = {
    color: '#DFFF00',
    head_url: 'http://www.placecage.com/c/200/200', // optional, but encouraged!
    taunt: "Gonna eat you ssssssuckers!", // optional, but encouraged!
  }


  /*
  if (left blocked)	{
	if (forward blocked)	{
		turn right
	}
	else if (right blocked)	{
		turn forward
	}
	else 	{
	"oh no!"
	}
}
else if (right blocked)	{
	if (forward blocked)	{
		turn left
	}
	else if (left blocked)	{
		move forward
	}
	else	{
		pick random
		"oh no!"
	}
}

else if (forward blocked)	{
	if (left blocked)	{
		turn right
	}
	else if (right blocked)	{
		turn left
	}
	else	{
		pick random
		"oh no!"
	}
} */

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move

  // Response data
  const data = {
    move: 'up', // one of: ['up','down','left','right']
    taunt: 'Hiss hiss, motherfuckers!', // optional, but encouraged!
  }

  return response.json(data)
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
