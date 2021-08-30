import sql from 'mssql';
import {sqlConfig} from './sql/config'

sql.on('error', err => {
    console.error(err)
})

sql.connect(sqlConfig).then(pool =>{
    return pool.request()
    .input('placa', sqlChar(7), 'ACB1234')
    .input('nome', sql.VarChar(50), 'fusca')
    .input('descrição', sql.VarChar(200), 'fusca para colecionar')
    .input('fabricação', sql.Date, '19/01/01')
    .input('preco', sql.Numeric, 3000)
    .output('codigogerado', sql.Int)
    .execute('SP_I_VEI_VEICULO')
}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err.message)
})