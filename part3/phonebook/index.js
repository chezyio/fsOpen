require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


morgan.token('payload', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))


// let directory = [
// 	{
// 		name: "Arto Hellas",
// 		number: "040-123456",
// 		id: 1,
// 	},
// 	{
// 		name: "Ada Lovelace",
// 		number: "39-44-5323523",
// 		id: 2,
// 	},
// 	{
// 		name: "Dan Abramov",
// 		number: "12-43-234345",
// 		id: 3,
// 	},
// 	{
// 		name: "Mary Poppendieck",
// 		number: "39-23-6423122",
// 		id: 4,
// 	},
// 	{
// 		name: "Edward Tivruski",
// 		number: "021-2142142142",
// 		id: 5,
// 	},
// ]




app.get('/api/persons', (req, res) => {
  // res.json(directory)
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/info', (req, res, next) => {
  const requestTime = new Date(Date.now())
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${requestTime}</p>`)
  }).catch(err => next(err))
})


app.get('/api/persons/:id', (req, res, next) => {
  // const id = Number(req.params.id)
  // const person = directory.find(directory => directory.id == id)
  // console.log(person);
  // if (person) {
  // 	res.json(person)
  // } else {
  // 	res.status(404).end()
  // }

  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})


app.delete('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)
  // directory = directory.filter(person => person.id !== id)
  res.status(204).end()

  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  }).catch(err => next(err))

})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {
    runValidators: true,
    context: 'query',
    new: true,
  })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  // const id = Math.floor(Math.random() * 100000)
  // const nameExists = directory.some((person) => person.name === body.name)
  // if (!body.name || !body.number) {
  // 	return res.status(400).json({
  // 		error: "name or number is missing",
  // 	})
  // }
  // if (nameExists) {
  // 	return res.status(400).json({
  // 		error: "name already exists",
  // 	})
  // }

  // if (!body.name || !body.number) {
  // 	return res.status(400).json({
  // 		error: "name or number is missing",
  // 	})
  // }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    // id,
  })
  newPerson
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => res.json(savedAndFormattedPerson))
    .catch((error) => next(error))
  // directory = directory.concat(newPerson)
  // res.json(newPerson)
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
