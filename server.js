const express = require(`express`)
const hbs = require('hbs')
const fs = require('fs')
var app = express();

// process.env - is all our envirements verible as key value pers
// so here we assign the heroku port to the verible (or 3000 defult)
const port = process.env.PORT || 3000;
// register the partials path(footer.hbs) to use them in the views(about,index))
hbs.registerPartials(__dirname+'/Views/partials')

// specify the source of html views (not so clear)

app.set('view engine', 'hbs')
app.engine('html', require('hbs').__express);

app.set('views', __dirname+'/Views/');
// specify the path to serverr (this time the help page)

app.use(express.static(__dirname + '/public')); 

// use when we colling some http request (get) and we can exectue 
// things before the call is done(next())
app.use((req,res, next)=>{
    var date = new Date().toString()
    var log=`${date}: ${req.method} ${req.url} ${process.env.PORT || 3000}`

    fs.appendFile('serverLog and port', log +'\n',(err)=>{
        if(err){
            console.log(err)
        }
    })
    next()
})
// because this app.use ise first in the code it execute first
// so the rest of the pathes will not be loaded
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear()
})

// register function helpers to use them in our view.hbs 
hbs.registerHelper('toUpperCase',(text)=>{
    return text.toUpperCase()
})


app.get('/',(req,res) =>{
        res.render('index', {
        "welcome": "Wellcome to Roee's site",
        'pageTitle': 'About page',
        'description': 'On this page you can find all possible informaion you need.'
    })
})
app.get('/help1',(req,res) =>{
    res.render('help.html')
})

app.get('/about',(req,res)=>{
    console.log(`port /about: ${port}`)
    res.render('about',{
        "welcome": "Wellcome to Roee's site",
        'pageTitle': 'About page'
        })
    })

app.get('/bad',(req,res)=>{
    res.render('about.hbs',{
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port =  ${port}...`)
})