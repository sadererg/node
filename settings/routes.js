'use strict'

module.exports = (app) => {
    const ProdajaController = require('../Controller/ProdajaController')
    const RemontController = require('../Controller/RemontController')

    app
        .route('/api/remonts')
        .get(RemontController.getAllRemont)
    app
        .route('/api/remonts')
        .post(RemontController.postRemont)

    app
        .route('/api/remonts/:id')
        .get(RemontController.getId)
    app
        .route('/api/remonts/:id')
        .put(RemontController.putId)
    app
        .route('/api/remonts/:id')
        .delete(RemontController.delId)



    app
        .route('/api/prodajaa')
        .get(ProdajaController.getAllProdajaa)
    app
        .route('/api/prodajaa')
        .post(ProdajaController.postProdajaa)

    app
        .route('/api/prodajaa/:id')
        .get(ProdajaController.getId)
    app
        .route('/api/prodajaa/:id')
        .put(ProdajaController.putId)
    app
        .route('/api/prodajaa/:id')
        .delete(ProdajaController.delId)



}