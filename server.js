const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3001

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/Develop/public/index.html")
})



//api routes
app.get("/api/notes",(req,res)=>{
    res.sendFile(__dirname + "/Develop/db/db.json")
})










app.listen(PORT,()=>{
    console.log(`The app is running on ${PORT}.`)
})