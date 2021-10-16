import express from 'express'
import diaryRouter from './routes/diaries'
const app = express()
app.use(express.json())


app.get('/ping', (_req, res) => {
    console.log('sooneone pinged here');
    res.send('pong')
})


app.use('/api/dairies', diaryRouter)










const PORT = 3000

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})