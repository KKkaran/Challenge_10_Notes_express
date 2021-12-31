const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3001
let data = require("./db/db.json")
const fs = require("fs")

app.use(express.static(__dirname + "/public"))
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
        if(err) throw err
        console.log("content written successfuly")

    })
    res.send("")
})
//e.target.parentElement.children[0].innerHTML
app.delete("/api/notes/:name",(req,res)=>{
    
    console.log(`The params is : ${req.params.name}`)
    let newData = data.filter(e=>{
        if(e.title === req.params.name) return false
        else return true    
    })
    console.log(data)
    data = newData
    fs.writeFile("./db/db.json",JSON.stringify(newData),err=>{
        if(err) throw err
        console.log("content written successfuly")

    })
    console.log(newData)
    res.send("")
})

app.listen(PORT,()=>{
    console.log(`The app is running on ${PORT}.`)
})