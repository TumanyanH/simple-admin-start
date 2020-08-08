const os = require('os')
const cluster = require('cluster')


if(cluster.isMaster) {
    const n_cpus = os.cpus().length

    for(let i = 0; i < n_cpus; i++) {
        console.log(cluster.fork())
    }
} else {
    const express = require('express')

    const app = express()

    const pid = process.pid
    app.listen(3000, () => {
        console.log(`Server is working on ${pid}`)
    })

    app.get('/pid', () => {
        for(let i = 0; i < 2e6; i++) {}
        console.log(`request is on ${pid}`)
    })
}