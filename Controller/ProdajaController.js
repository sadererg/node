'use strict'


const response = require('../response')
const db = require('../settings/db')

exports.getAllProdajaa = (req, res) => {

    db.query('SELECT * FROM `prodaja`', (error, rows, fields) => {
        if(error) {
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })

}

exports.postProdajaa = (req, res) => {
    const model = req.body.model;
    const diagonal= req.body.diagonal;
    const rezrech= req.body.rezrech;
    const ves = req.body.ves;
    const urkost = req.body.urkost;
    const kontrastnost = req.body.kontrastnost;
    const garanti = req.body.garanti;
    const cena = req.body.cena;
    const rassrochka = req.body.rassrochka;

    db.query("INSERT INTO `prodaja`(`model`, `diagonal`, `rezrech`, `ves`, `urkost`, `kontrastnost`, `garanti`, `cena`, `rassrochka`) VALUES(NULL, '" + model + "', '" + diagonal + "', '" + rezrech + "', '" + ves + "', '" + urkost + "', '" + kontrastnost + "', '" + garanti + "', '" + cena + "', '" + rassrochka + "')", (error, rows, results) => {
        if(error) {
            response.status(400, error, res)
        } else {

            response.status(200, {message: `Success.`, results}, res)
        }
    })

}
exports.getId = (req, res) => {
    const id = req.params.id

    db.query("SELECT * FROM `prodaja` WHERE `id` = '" + req.params.id + "'", (error, rows, results) => {
        if(error) {
            response.status(400, error, res)
        } else {

            response.status(200, {message: `GetID.`, rows}, res)
        }
    })

}
exports.putId = (req, res) => {
    const id = req.body.id
    const model = req.body.model;
    const diagonal= req.body.diagonal;
    const rezrech= req.body.rezrech;
    const ves = req.body.ves;
    const urkost = req.body.urkost;
    const kontrastnost = req.body.kontrastnost;
    const garanti = req.body.garanti;
    const cena = req.body.cena;
    const rassrochka = req.body.rassrochka;

    db.query("UPDATE`prodaja` SET `model`='" + model + "', `diagonal`='" + diagonal + "', `rezrech`='" + rezrech + "', `ves`='" + ves + "', `urkost`='" + urkost + "', `kontrastnost`= '" + kontrastnost + "', `garanti`='" + garanti + "', `cena`='" + cena + "', `rassrochka`='" + rassrochka + "' WHERE `prodaja`.`id`='" + req.params.id + "'", (error, rows, results) => {
        if(error) {
            response.status(400, error, res)
        } else {

            response.status(200, {message: `Updated.`, results}, res)
        }
    })

}
exports.delId = (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM `prodaja` WHERE `prodaja`.`id` = '" + req.params.id + "'", (error, rows, results) => {
        if(error) {
            response.status(400, error, res)
        } else {

            response.status(200, {message: `Deleted.`, results}, res)
        }
    })

}