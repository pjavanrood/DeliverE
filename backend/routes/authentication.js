const express = require('express')
const aws = require('aws-sdk')
const jwt = require('jsonwebtoken')

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
})

const dynamodb = new aws.DynamoDB.DocumentClient()

const user_table_name = 'user-information'

const router = express.Router()

async function check_user_exist(email) {
    const params = {
        TableName: user_table_name,
        Key: {
            email
        }
    }

    const response = await dynamodb.get(params).promise()

    console.log('Checking User Exist:', email, response)

    if ( Object.keys(response).length == 0 ) {
        return {exist: false}
    } else {
        return {exist: true, data: response.Item}
    }
}

async function add_user(user) {
    const params = {
        TableName: user_table_name,
        Item: user
    }

    const response = await dynamodb.put(params).promise()

    console.log('Adding User:', user, response)

    if ( Object.keys(response).length == 0 ) {
        return true
    } else {
        return false
    }
}

function match_password(actual, expected) {
    console.log(actual, expected, actual === expected)
    return actual === expected
}

router.get('/signup', (req, res) => {
    res.json({message: 'GET sign up page'})
})

router.post('/signup', async (req, res) => {
    const name = req.body.name
    const last_name = req.body.last_name
    const email = req.body.email
    const password = req.body.password

    if (
        name === undefined
        || last_name === undefined
        || email === undefined
        || password === undefined
    ) {
        res.json({
            message: 'Missing Data',
            success: false
        })

        return
    }

    const user_exist = await check_user_exist(email)

    if (user_exist.exist) {
        res.json({
            success: false,
            message: 'Email already registered'
        })

        return
    }

    console.log(user_exist)

    user = {
        name: name,
        last_name: last_name,
        email: email,
        password: password
    }

    const user_added = await add_user(user)

    if (user_added) {
        res.json({
            success: true,
            message: 'User Added Successfully'
        })

        return
    } else {
        res.json({
            success: false,
            message: 'Failed to update db'
        })
    }
})

router.get('/login', (req, res) => {
    res.json({message: 'GET log in page'})
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if ( email === undefined || password === undefined) {
        res.json({
            message: 'Missing Data',
            success: false
        })

        return
    }

    const user_exist = await check_user_exist(email)

    if (!user_exist.exist) {
        res.json({
            success: false,
            message: 'User Not Found'
        })

        return
    }

    if ( match_password(password, user_exist.data.password) ) {
        res.json({
            success: true,
            message: 'Login Successful'
        })

    } else {
        res.json({
            success: false,
            message: 'Wrong Password'
        })
    }

})

module.exports = router