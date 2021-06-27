const fs = require('fs')
const path = require('path')

// local dev setup - create dummy JWT_SECRET

const localDummyKey = 'JWT_SECRET=demo'
fs.appendFile(path.join(__dirname, '.env'), localDummyKey, ()=>console.log('created local JWT_SECRET in .env'))
