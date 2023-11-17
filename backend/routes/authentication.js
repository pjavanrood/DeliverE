const express = require('express')
const aws = require('aws-sdk')
const jwt = require('jsonwebtoken')

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
})

const dynamodb = new aws.DynamoDB()//.DocumentClient()
const user_table_name = 'user-information'

const router = express.Router()

router.get('/signup', (req, res) => {
    res.json({msg: 'GET sign up page'})
})

router.post('/signup', async (req, res) => {
    // res.json({msg: 'POST sign up page'})

    const name = req.body.name
    const last_name = req.body.last_name
    const email = req.body.email
    const password = req.body.password

    if (
        name === 'undefined'
        || last_name === 'undefined'
        || email === 'undefined'
        || password === 'undefined'
    ) {
        res.json({
            'message': 'Missing Data',
            'success': false
        })

        return
    }


    params = {
        TableName: user_table_name,
        Key: {
            'email': {S: email}
        }
    }

    dynamodb.getItem(params, function(err, data) {
        if (err) {
            console.log("Dynamo DB Error: ", err)
        } else {
            console.log('Get item', data)
            if ( Object.keys(data).length == 0 ) {
                console.log('Not Exist')
            } else {
                res.json({
                    "message": "Email already registered",
                    "success": false
                })

                return
            }
        }
    })

    params = {
        Item: {
            'email': {S: email},
            'name': {S: name},
            'last_name': {S: last_name},
            'password': {S: password}
        }, 
        TableName: user_table_name
    }

    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log('Error PUT user', err)
            
            res.json({
                "message": "Internal Error",
                "success": false
            })

            res.status(500)

            return
        } 
        
    })

    res.json({ "success": true })

    return
})

router.get('/login', (req, res) => {
    res.json({msg: 'GET log in page'})
})

router.post('/login', (req, res) => {
    res.json({msg: 'POST log in page'})
})



module.exports = router
    //params = {
    //     TableName: user_table_name,
    //     Item: {
    //         'email': {S: email},
    //         'name': {S: name},
    //         'last_name': {S: last_name},
    //         'password': {S: password}
    //     }
    // }

    // // console.log(params)

    // dynamodb.putItem(params, function(err, data) {
    //     if (err) {
    //         console.log("Dynamo DB Error: ", err)
    //     } else {
    //         console.log('PUT', data)
    //     }
    // })