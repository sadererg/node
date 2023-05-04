'use strict'


const response = require('../response')
const db = require('../settings/db')

exports.getAllRemont = (req, res) => {

    db.query('SELECT * FROM `remont`', (error, rows, fields) => {
        if(error) {
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })

}
exports.postRemont = (req, res) => {
    const model = req.body.model;
    const diagonal= req.body.diagonal;
    const rezrech= req.body.rezrech;
    const ves = req.body.ves;
    const urkost = req.body.urkost;
    const kontrastnost = req.body.kontrastnost;
    const garanti = req.body.garanti;
    const cena = req.body.cena;
    const vremyaremont = req.body.vremyaremont;

    db.query("INSERT INTO `remont`(`Id`, `model`, `diagonal`, `razrech`, `ves`, `urkost`, `kontrasnost`, `garanti`, `cena`, `vremyaremont`) VALUES(NULL, '" + model + "', '" + diagonal + "', '" + rezrech + "', '" + ves + "', '" + urkost + "', '" + kontrastnost + "', '" + garanti + "', '" + cena + "', '" + vremyaremont + "')", (error, rows, results) => {
        if(error) {
            response.status(400, error, res)
        } else {

            response.status(200, {message: `Posted.`, results}, res)
        }
    })

}

exports.getId = (req, res) => {
    const id = req.params.id

    db.query("SELECT * FROM `remont` WHERE `id` = '" + req.params.id + "'", (error, rows, results) => {
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
    const vremyaremont = req.body.vremyaremont;

    db.query("UPDATE`remont` SET `model`='" + model + "', `diagonal`='" + diagonal + "', `rezrech`='" + rezrech + "', `ves`='" + ves + "', `urkost`='" + urkost + "', `kontrastnost`='" + kontrastnost + "', `garanti`= '" + garanti + "', `cena`='" + cena + "', `vremyaremont`='" + vremyaremont + "' WHERE `remont`.`id`='" + req.params.id + "'", (error, rows, results) => {
        if(error) {
            response.status(400, error, res)
        } else {

            response.status(200, {message: `Updated.`, results}, res)
        }
    })

}

exports.delId = (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM `remont` WHERE `remont`.`id` = '" + req.params.id + "'", (error, rows, results) => {
        if(error) {
            response.status(400, error, res)
        } else {

            response.status(200, {message: `Deleted.`, results}, res)
        }
    })

}
