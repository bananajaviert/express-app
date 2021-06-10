import express from 'express'
const router = express.Router()

import members from '../../members.js'

//Get all members
router.get('/', (req,res) => {
    res.json(members)
    console.log('Stan IZ*ONE')
})

// Get single member
router.get('/:ranking', (req, res) => {
    // To check if ranking exists
    const found = members.some(member => member.ranking === parseInt(req.params.ranking)) 

    if(found) {
        res.json(members.filter(member => {
            return member.ranking === parseInt(req.params.ranking)
        }))
    } else {
        res.status(404).json({ msg: `Member ranking ${req.params.ranking} cannot be found` })
    }
})

export default router