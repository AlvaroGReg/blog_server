const { Schema, model } = require('mongoose')

const ArticleScheme = Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "default.png"
    }
})

module.exports = model("Article", ArticleScheme, "articles")