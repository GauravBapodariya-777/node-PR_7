const TableSchema = require('../models/schema');
const BlogSchema = require("../models/blogschema");
const fs = require('fs');

const index = (req,res) =>{
    return res.render('register');
}
const deshboard = (req,res) =>{
    return res.render('dashboard');
}
const login = (req,res) => {
    return res.render('login');
}
const add = (req,res) => {
    return res.render('add');
}
const insertData = async(req,res) =>{
    try {
        const { name, email, password, cpassword } = req.body;
        let Record = await TableSchema.create({
            name: name,
            email: email,
            password: password,
            cpassword: cpassword
        })
        if (password == cpassword) {
            if (Record) {
                console.log("Record Created");
                return res.redirect('/login');
            }
            else {
                console.log("Record Not Created");
                return false;
            }
        }
        else {
            console.log("Password and Confirm password are not Match");
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
const viewData = async(req,res) => {
    try {
        let Record = await BlogSchema.find({});
        if (Record) {
            return res.render('dashboard', {
                Record
            })
        }
        else {
            console.log("Record Not show");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        let oldRecord = await BlogSchema.findById(id);
        if (oldRecord) {
            fs.unlinkSync(oldRecord.image);
            let DeleteRecord = await BlogSchema.findByIdAndDelete(id);
            if (DeleteRecord) {
                console.log("Record Deleted");
                return res.redirect('back');
            }
            else {
                console.log("Record Not deleted");
                return false;
            }
        }
        else {
            console.log("File not Delete");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
const loginData = async (req, res) => {
    try {
        const { email, password } = req.body;
        let userLogin = await TableSchema.findOne({ email: email });
        if (!userLogin || userLogin.password != password) {
            console.log("Check your Password");
            return res.redirect('back');
        }
        console.log("User Login");
        return res.redirect('viewData');
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
const blogData = async (req, res) => {
    try {
        const { title, description } = req.body;
        let image = '';
        if (req.file) {
            image = req.file.path;
        }
        console.log(image);
        let Record = await BlogSchema.create({
            title: title,
            description: description,
            image: image
        })
        if (Record) {
            console.log("record create");
            return res.redirect('back');
        }
        else {
            console.log("record not craete");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    index,
    deshboard,
    login,
    add,
    insertData,
    viewData,
    deleteData,
    loginData,
    blogData
}