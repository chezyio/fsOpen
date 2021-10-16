/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'
import diagnosesRouter from './src/routes/diagnoses'
import patientsRouter from './src/routes/patients'

const cors = require('cors')
const app = express()



app.use(cors())
app.use(express.json())




// app.get('/api/ping', (_req, res) => {
//     console.log('somone fired')
//     res.send('pong')
// })



app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

const PORT = 3001


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})