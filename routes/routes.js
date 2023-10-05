const express = require('express');
const routes = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

adminController = require('../controller/adminController')

const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const imageuploads = multer({ storage: file }).single('image');

routes.get('/',adminController.index);
routes.get('/deshboard',adminController.deshboard);
routes.get('/login',adminController.login);
routes.get('/add',adminController.add);
routes.post('/insertData',adminController.insertData);
routes.get('/viewData',adminController.viewData);
routes.get('/deleteData',adminController.deleteData);
routes.post('/loginData',adminController.loginData);
routes.post('/blogData',imageuploads,adminController.blogData)

module.exports = routes;