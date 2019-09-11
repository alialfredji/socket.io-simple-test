const path = require('path')
const fs = require('fs')
const env = require('node-env-file')

const file2root = fileName => path.join(__dirname, '..', fileName)

const fileExists = fileName => new Promise((resolve, reject) => {
    fs.exists(file2root(fileName), exists => exists ? resolve(true) : resolve(false))
})

const loadEnv = async (fileName) => {
    const exists = await fileExists(fileName)
    if (exists) {
        env(file2root(fileName))
    }
}

module.exports = Promise.all([
    loadEnv('.env'),
    loadEnv('.env.local'),
    loadEnv('.env.override'),
])