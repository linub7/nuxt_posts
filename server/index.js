const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const fs = require('fs')
const path = require('path')
const filePath = '../store/initial_data.json'
const initialData = require(filePath)



module.exports = {
  path: '/api',
  handler: app
}