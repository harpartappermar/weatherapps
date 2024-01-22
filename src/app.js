const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require("./utils/forecastapi.js")


// Set path for the express config
const public_path = path.join(__dirname, "../public");
const view_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/elements");

const app = express()

// Set config related to the express 
app.set('view engine', 'hbs');
app.set('views', view_path);
hbs.registerPartials(partial_path)

// When static files needs to use for eg index.html from publick folder
app.use(express.static(public_path))

// Routing of the express
app.get('/', function(req, res) {
    res.render('index', {
        title: "Home",
        body: "Home page Template",
        footercontent: "Weather app"
    })
})

app.get('/help', function(req, res) {
    res.render('static', {
        title: "Help",
        body: "help page s",
        footercontent: "Weather app"
    })
})


app.get('/weather', function(req, res) {
    try {
        if (!req.query.location) {

            return res.send({
                status: "0",
                error: "Please enter location"
            })



        } else {

            forecast(req.query.location, (error, data) => {
                if (error) {
                    return res.send({
                        status: "0",
                        error: error
                    })
                }

                const { location, current } = data
                return res.send({
                    status: "1",
                    location: location,
                    current: current
                })
            })
        }
    } catch (e) {

        res.send({
            status: "0",
            error: "error"
        })
    }

})

app.get('/about', function(req, res) {
    res.render('static', {
        title: "Abput",
        body: "About page",
        footercontent: "Weather app"
    })
})


app.get('/about/*', function(req, res) {
    res.render('static', {
        title: "Articale Not Found",
        body: "Article not found in the application",
        footercontent: "Weather app"
    })
})


app.get('*', function(req, res) {
    res.render('static', {
        title: "404",
        body: "Page not found in the application",
        footercontent: "Weather app"
    })
})

app.listen(3000, () => {

    console.log("Server is running");

})