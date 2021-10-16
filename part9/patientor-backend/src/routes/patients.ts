/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express'
import patientService from '../services/patientService'
import { NonSensitivePatient } from '../types'
import toNewPatient from '../utils'

const router = express.Router()


router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients())
})

router.post('/', (req, res) => {


    try {
        const newPatient = toNewPatient(req.body)

        const addedPatient = patientService.addPatient(newPatient)
        res.json(addedPatient)
    } catch (e) {
        res.status(400)
    }
})

router.get('/:id', (req, res) => {
    try {
        const data: NonSensitivePatient = patientService.getNonSensitivePatient(req.params.id)
        res.json(data)
    } catch (e) {
        res.status(400).send('Patient not found')
    }
})




export default router