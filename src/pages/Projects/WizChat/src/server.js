const express = require('express')
const Gun = require('gun')
const app = express()

app.use(Gun.serve)

const port = 3030
const server = app.listen(port, ()=>{
    console.log("Server listening at port: ", port)
})

Gun({web:server});