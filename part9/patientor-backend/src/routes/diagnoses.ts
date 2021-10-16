import express from 'express'
import diagnoseService from '../services/diagnoseService'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(diagnoseService.getDiagnoses())
    console.log(res);
    
})

export default router
