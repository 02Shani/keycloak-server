const express = require('express')
var cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const app = express()

app.use(cors({credentials: true}))

let data={"shani@edulab.in":['11111','22222','2222223'],
"manish@edulab.in":['sdfa','fgf','dsdv']}

function auth(req, res, next) {

    const bearerheaders = req.headers['authorizaton'];
    const token=bearerheaders && bearerheaders.split(" ")[1];
    if(token === null) return res.sendStatus(401);
    // console.log(token);
    
    const public_key=`-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;
    // console.log(public_key);
    // console.log(public_key);
    
    const decodetoken=jwt.verify(token,public_key,{algorithms:["RS256"]})
    // console.log(decodetoken);
    const {email}= decodetoken
    req.user=email
    next()
}

app.get('/', auth,async (req, res) => {

console.log('email',req.user);
  try{
    res.status(200).send(data[req.user])
  }catch(err) {
    res.status(500).send(err)
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})