require('dotenv').config() 
const request = require('supertest/')
const express = require('express')
const router = require('../routes/authentication')

const app = new express()
app.use(express.json())
app.use('/', router)

describe('Authentication Routes', () => {
    test('should get /signup', async () => {
        const res = await request(app).get('/signup')
        expect(res.body.message).toBe('GET sign up page')
    })

    test('should post new user /signup', async () => {
        const res = await request(app).post('/signup').send({
            name: 'Parshan',
            last_name: 'Javanrood',
            email: 'pj@gmail1.com30'.concat(Math.random(1)),
            password: 'abcdefgh'
        })

        expect(res.body.success).toBe(true)
        expect(res.body.message).toBe('User Added Successfully')
    })

    test('should post existing user /signup', async () => {
        const res = await request(app).post('/signup').send({
            name: 'Parshan22',
            last_name: 'Javanrood22',
            email: 'pj@gmail.com',
            password: 'abcdefgh33'
        })

        expect(res.body.success).toBe(false)
        expect(res.body.message).toBe('Email already registered')
    })

    test('should post /login', async () => {
        const res = await request(app).post('/login').send({
            email: 'pj@gmail1.com',
            password: 'abcdefgh'
        })

        expect(res.body.success).toBe(true)
        expect(res.body.message).toBe('Login Successful')
    })
    
    test('should post new /login', async () => {
        const res = await request(app).post('/login').send({
            email: 'hi@gmai.com',
            password: 'abcdefgh'
        })

        expect(res.body.success).toBe(false)
        expect(res.body.message).toBe('User Not Found')
    })

    test('should post worng password /login', async () => {
        const res = await request(app).post('/login').send({
            email: 'pj@gmail1.com',
            password: 'bbcdefgh'
        })

        expect(res.body.success).toBe(false)
        expect(res.body.message).toBe('Wrong Password')
    })

})

