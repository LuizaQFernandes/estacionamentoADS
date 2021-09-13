//api rest de veículos

import express from 'express'
import sql from 'mssql'
import {sqlConfig} from '../sql/config.js'
const router = express.Router()

/***************************************** 
 * GET /veiculos
 * Retornar a lista ded todos os veiculos
 *****************************************/
router.get("/", (req, res) => {
    try{
        sql.connect(sqlConfig).then(pool => {
            return pool.request().execute('SP_S_VEI_VEICULO')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    } catch(err){
        console.error(err)
    }
})



/***************************************** 
 * GET /veiculos/:placa
 * Retornar um veículo através da placa
 *****************************************/
 
router.get("/:placa", (req, res) => {
    const placa = req.params.placa
    try{
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .input('placa', sql.Char(7), placa)
            .execute('SP_S_VEI_VEICULO_PLACA')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    } catch(err){
        console.error(err)
    }
})

/***************************************** 
 * POST /veiculos
 * Insere um novo veículo
 *****************************************/
router.post("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {placa, nome, descricao, fabricacao, preco} = req.body
        return pool.request()
        .input('placa', sql.Char(7), placa)
        .input('nome', sql.VarChar(50), nome)
        .input('descricao', sql.VarChar(200), descricao)
        .input('fabricacao', sql.Date, fabricacao)
        .input('preco', sql.Numeric(7), preco)
        //.output('codigogerado', sql.Int)
        .execute('SP_I_VEI_VEICULO')
    }).then(dados => {
        res.status(200).json(dados.output)

    }).catch(err => {
        res.status(400).json(err.message)
    })
})


/***************************************** 
 * PUT /veiculos
 * altera os dados de um veículo 
 *****************************************/
 router.put("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {placa, nome, descricao, fabricacao, preco} = req.body
        return pool.request()
        .input('placa', sql.Char(7), placa)
        .input('nome', sql.VarChar(50), nome)
        .input('descricao', sql.VarChar(200), descricao)
        .input('fabricacao', sql.Date, fabricacao)
        .input('preco', sql.Numeric(7), preco)
        .execute('SP_U_VEI_VEICULO')
    }).then(dados => {
        res.status(200).json('veiculo alterado com sucesso!')

    }).catch(err => {
        res.status(400).json(err.message)
    })
})


/***************************************** 
 * DELETE /veiculos/:placa
 * Apaga um veículo pela placa
 *****************************************/
router.delete('/:placa',(req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const placa = req.params.placa
        return pool.request()
        .input('placa', sql.Char(7),placa)
        .execute('SP_D_VEI_VEICULO')

    }).then(dados => {
        res.status(200).json('Veiculo excluido com sucesso!')

    }).catch(err => {

        res.status(400).json(err.message)
    })
})


export default router