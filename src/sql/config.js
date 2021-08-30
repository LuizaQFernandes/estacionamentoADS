import dotenv from 'dotenv/config'

export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
        max: 10, 
        min: 0, 
        idleTimeoutMillis: 3000
    }, 
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }
    //método de autenticação do sql = gravação 2:14:00
}
