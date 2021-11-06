const express = require('express');
const path = require('path');
const app = new express();
var fs = require('fs');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const {PythonShell} = require('python-shell');
let options={
    mode:"text",
    //pythonPath: "<my python path>",
    scriptPath: "./public/python/",
    args:["value1", "value2", "value3"],
}
filepaths = 'parsingfile.py';
PythonShell.run(filepaths, options, function(err,data){
    if(err) throw err;
    console.log(data);
    console.log('Python file execute success!');
});
let PORT = process.env.PORT || 4000
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended:false}));
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './public/csv/1.csv',
    header:[
        {id:'FileId', title:'FILEID'},
        {id:'FileName', title:'FILENAME'}
    ],
})
app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});
app.get('/about', function(req,res){
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});
app.get('/post', function(req,res){
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});
app.get('/contact', function(req,res){
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});
app.get('/create', function(req,res){
    res.sendFile(path.resolve(__dirname, 'pages/create.html'));
})
app.get('/upload', function(req,res){
    res.send('<form method="post" enctype="multiparty/form-data">'
        + '<p>Title: <input type="text" name="title" /></p>'
        + '<p>Image: <input type="image" name="image" /></p>'
        + '<p><input type="submit" value="Upload"></p>'
        + '</form>');
});
app.get('/main', function(req,res){
    res.render('main');
});
const txtfilePath = './public/txt/userFiles.txt';
var arrays = fs.readFileSync(txtfilePath).toString().split("\n");
app.listen(PORT, ()=>{
    console.log(`Connected to http://localhost:${PORT}/main`);
});