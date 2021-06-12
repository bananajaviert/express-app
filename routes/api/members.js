import express from 'express'
import * as uuid from 'uuid'

import { members } from '../../members.js'

const router = express.Router()

//Get all members
router.get('/', (req,res) => {
    res.json(members)
})

// READ Get single member
router.get('/:ranking', (req, res) => {
    // Returns boolean
    const found = members.some(member => {
        return member.ranking === parseInt(req.params.ranking)
    })
 
    if(found) {
        res.status(200).json(members.filter(member => {
            return member.ranking === parseInt(req.params.ranking)
        }))
    }
    if(!found) {
        res.status(404).json({ 
            message: `No IZ*ONE member with the ranking of ${req.params.ranking} exists in the database`
        })
    }
})

// CREATE member
router.post('/', (req, res) => {
    // create an object to push
    const newMember = {
        name: req.body.name,
        age: req.body.age,
        ranking: uuid.v4()
    }

    if(!newMember.name || !newMember.age) {
        return res.status(400).json({ message: `Please include a name and age` })
    }

    members.push(newMember)
    res.json(members)
    // res.redirect('/groups/izone')
})

// UPDATE member
router.put('/:ranking', (req, res) => {
    // Returns boolean
    const found = members.some(member => {
        return member.ranking === parseInt(req.params.ranking)
    })

    if(found) {
        const updateMember = req.body

        members.forEach(member => {
            if(member.ranking === parseInt(req.params.ranking)) {
                member.name = updateMember.name ? updateMember.name : member.name
                member.age = updateMember.age ? updateMember.age : member.age
            }

            res.json({ message: `IZ*ONE member updated`, member})
        })
    }
    if(!found) {
        res.status(404).json({ 
            message: `No IZ*ONE member with the ranking of ${req.params.ranking} exists in the database`
        })
    }
})

// DELETE member
router.delete('/:ranking', (req, res) => {
    // Returns boolean
    const found = members.some(member => {
        return member.ranking === parseInt(req.params.ranking)
    })

    if(found) {
        res.status(200).json({ 
            message: `IZ*ONE member deleted with ranking ${req.params.ranking}`,
            members: members.filter(member => {
            // Returns all members except deleted
            return member.ranking !== parseInt(req.params.ranking)
        })})
    }
    if(!found) {
        res.status(404).json({ 
            message: `No IZ*ONE member with the ranking of ${req.params.ranking} exists in the database`
        })
    }
})


export { router }

// // Get single member
// router.get('/:ranking', (req, res) => {
//     // To check if ranking exists
//     const found = members.some(member => {
//         return member.ranking === parseInt(req.params.ranking)
//     }) 

//     if(found) {
//         res.status(200).json(members.filter(member => {
//             return  member.ranking === parseInt(req.params.ranking)
//         }))
//     }
//     if(!found){
//         res.status(404).json(
//             { msg: `Member with ranking ${req.params.ranking} does not exists` }
//         )
//     }
// })

// // Create member
// router.post('/', (req, res) => {
//     const newMember = {
//         name: req.body.name,
//         age: req.body.age,
//         ranking: uuid.v4()
//     }

//     if(!newMember.name || !newMember.age) {
//         return res.status(400).json({ message: `Please include a name and age` })
//     }

//     members.push(newMember)
//     res.json(members)
// })

// // Update member
// router.put('/:ranking', (req, res) => {
//     // To check if ranking exists
//     const found = members.some(member => {
//         return member.ranking === parseInt(req.params.ranking)
//     }) 

//     if(found) {
//         const updateMember = req.body

//         members.forEach(member => {
//             if(member.ranking === parseInt(req.params.ranking)) {
//                 member.name = updateMember.name ? updateMember.name : member.name
//                 member.age = updateMember.age ? updateMember.age : member.age

//                 res.json({ msg: `Member updated`, members})
//             }
//         })
//     }

//     if(!found){
//         return res.status(404).json(
//             { msg: `Member with ranking ${req.params.ranking} does not exists` }
//         )
//     }
// })


// // Delete member
// router.delete('/:ranking', (req, res) => {
//     // To check if ranking exists
//     const found = members.some(member => {
//         return member.ranking === parseInt(req.params.ranking)
//     }) 

//     if(found) {
//         res.json({ 
//             msg: 'Member deleted',
//             members: members.filter(member => {
//                 // Return all members except deleted
//                 return  member.ranking !== parseInt(req.params.ranking)
//             })
//         })
//     }
//     if(!found){
//         res.status(404).json(
//             { msg: `Member with ranking ${req.params.ranking} does not exists` }
//         )
//     }
// })


