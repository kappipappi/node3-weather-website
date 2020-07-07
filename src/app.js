const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Define paths for express config with path module
const publicdirectory = path.join(__dirname, "../public")
const viewspath = path.join(__dirname, "../templates/views")
const partialspath = path.join(__dirname, "../templates/partials")

// define handlebars engine and views location, hbs module required
app.set('view engine', 'hbs')
app.set("views", viewspath)
hbs.registerPartials(partialspath)

// setup static directory
app.use(express.static(publicdirectory))

app.get("",(req, res)=>{
    res.render('index', {
        title: "Weather",
        name: "Simon Kappacher"
    })
})

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About ",
        name: "Simon Kappacher"
    })
})

app.get("/help", (req, res)=>{
    res.render("help", {
        title: "Help ",
        name: "Simon Kappacher",
        message: "This is the help message"
    })
})

app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You have to provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res)=>{
    res.render("404", {
        title: "404",
        name: "Simon Kappacher",
        message: "Article not found"
    })
})

app.get("*", (req, res)=>{  //wildcard character * stands for anything, that hasnt been mentioned yet, has to be on last position
    res.render("404", {
        title: "404",
        name: "Simon Kappacher",
        message: "Page not found"
    })
})

app.listen(3000, ()=>{
    console.log("Server is up on Port 3000.")
})