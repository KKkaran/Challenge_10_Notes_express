const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3001

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
    res.sendFile(__dirname + "/Develop/db/db.json")
})


app.listen(PORT,()=>{
    console.log(`The app is running on ${PORT}.`)
})