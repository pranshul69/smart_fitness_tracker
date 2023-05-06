var express=require("express");
var bodyParse=require("body-parser");
var mongoose=require("mongoose");


const app= express()
app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended:true

}))
