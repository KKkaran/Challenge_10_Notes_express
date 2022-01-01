const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const uuid = require("./uuid/uuid")
const PORT = process.env.PORT || 3001
let data = require("./db/db.json")
let uuidList = []
//get the already created uuids and push it to the array
uuidList = data.map((t)=>{
    return t.id
})
//middlewares
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
    uuidList.push(uuid(uuidList))
    req.body.id = uuidList[uuidList.length-1]
    console.log(req.body)
    data.unshift(req.body)
    fs.writeFile("./db/db.json",JSON.stringify(data),err=>{
        if(err) throw err
        console.log("content written successfuly")

    })
    res.send("")
})
//e.target.parentElement.children[0].innerHTML
app.delete("/api/notes/:id",(req,res)=>{
    
    console.log(`The params is : ${req.params.id}`)
    let newData = data.filter(e=>{
        if(e.id === parseInt(req.params.id)) return false
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