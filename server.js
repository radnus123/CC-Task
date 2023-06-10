const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
app = express()

mongoose.connect('mongodb://localhost/blogs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.set('view engine','ejs')
app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)
app.listen(5000)