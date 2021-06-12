import express from 'express'
import * as uuid from 'uuid'

import { members } from '../../itzymembers.js'

const router = express.Router()

//READ
// Get all members
router.get('/', (req, res) => {
    res.json(members)
})

// Get single member
router.get('/:nickname', (req, res) => {
    const found = members.some(member => {
        return member.nickname === req.params.nickname
    })

    if(found) {
        res.status(200).json({
            message: `Member info`,
            info: members.filter(member => {
                return member.nickname === req.params.nickname
            })
        })
    }

    if(!found) {
        res.status(404).json({
            message: `Member with stage name ${req.params.nickname} does not exists.`
        })
    }
})

// CREATE
router.post('/', (req, res) => {
    // Create new member
    const newMember = {
        name: req.body.name,
        nickname: req.body.nickname,
        ranking: uuid.v4()
    }

    if(!newMember.name  || !newMember.nickname) {
        return res.json({
            message: `Please include name and stage name`
        })
    }

    members.push(newMember)
    res.redirect('/groups/itzy')
})

// UPDATE
router.put('/:nickname', (req, res) => {
    const found = members.some(member => {
        return member.nickname === req.params.nickname
    })

    if(found) {
        const updateInfo = req.body

        members.forEach(member => {
            if (member.nickname === req.params.nickname) {
                member.name = updateInfo.name ? updateInfo.name : member.name
                member.nickname = updateInfo.nickname ? updateInfo.nickname : member.nickname
            }

            res.json({
                message: `Member ${member.nickname} info updated`,
                info: members
            })
        })
    }

    if(!found) {
        res.status(404).json({
            message: `Member with stage name ${req.params.nickname} does not exists.`
        })
    }
})

// DELETE
router.delete('/:nickname', (req, res) => {
    // Returns boolean
    const found = members.some(member => {
        return member.nickname === req.params.nickname
    })

    if(found) {
        res.status(200).json({
            message: `Member deleted with the stage name ${req.params.nickname}`,
            info: members.filter(member => {
                // Returns all member except deleted
                return member.nickname !== req.params.nickname
            })
        })
    }

    if(!found) {
        res.status(404).json({
            message: `Member with stage name ${req.params.nickname} does not exists.`
        })
    }
})

export { router }