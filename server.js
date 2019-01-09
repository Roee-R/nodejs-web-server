const express = require(`express`)
const hbs = require('hbs')
const fs = require('fs')
var app = express();

// register the partials path(footer.hbs) to use them in the views(about,index))
hbs.registerPartials(__dirname+'/views/partials')

// specify the path to serverr (this time the help page)
app.set('express view engine', 'hbs')

// specify the source of html views (not so clear)
app.use(express.static(__dirname + '/public')); 

// use when we colling some http request (get) and we can exectue 
// things before the call is done(next())
app.use((req,res, next)=>{
    var date = new Date().toString()
    var log=`${date}: ${req.method} ${req.url}`

    fs.appendFile('serverLog', log +'\n',(err)=>{
        if(err){
            console.log(err)
        }
    })
    next()
})
// because this app.use ise first in the code it execute first
// so the rest of the pathes will not be loaded
app.use((req,res,next)=>{
    res.render('maintenance.hbs')
})

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear()
})

// register function helpers to use them in our view.hbs 
hbs.registerHelper('toUpperCase',(text)=>{
    return text.toUpperCase()
})


app.get('/',(req,res) =>{
    res.render('index.hbs', {
        "welcome": "Wellcome to Roee's site",
        'pageTitle': 'about page',
        'description': 'On this page you can find all possible informaion you need.'
    })
})

app.get('/about',(req,res)=>{
res.render('about.hbs',{
    "welcome": "Wellcome to Roee's site",
    'pageTitle': 'about page'
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        "error": `error your action`
    })
})

app.listen(3000, ()=>{
    console.log("Server is up on port 3000...")
})