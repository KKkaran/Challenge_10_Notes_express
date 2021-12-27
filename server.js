const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3001
const data = require("./db/db.json")
const fs = require("fs")

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//html routes
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})
app.get("/notes",(req,res)=>{
    res.sendFile(__dirname + "/public/notes.html")
})


//api routes
app.get("/api/notes",(req,res)=>{
    res.sendFile(__dirname + "/db/db.json")
})
app.post("/api/notes",(req,res)=>{
    data.unshift(req.body)
    fs.writeFile("./db/db.json",JSON.stringify(data),err=>{
        return console.log("error")
    })
    console.log("content written successfuly")
    //res.redirect("/notes")
})


app.listen(PORT,()=>{
    console.log(`The app is running on ${PORT}.`)
})