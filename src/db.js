const {
    Pool
} = require('pg')


const pool = new Pool({
    user: 'postgres.wrfwrdmzmswcbvyyjvvv',
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    password: 'fw4h0IvMUMhNLaCO',
})
module.exports = pool;