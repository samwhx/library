////////////////////////////////////LIBRARIES////////////////////////////////////
require('dotenv').config() // config files
const express = require('express') // expressjs
const mysql = require("mysql") // database
const cors = require('cors') // cross origin requests
const multer = require('multer') // image upload

////////////////////////////////////METHODS////////////////////////////////////
// express
const app = express()

// api uri to be appended to all api routes.
const API_URI = "/api";

// cors
app.use(cors())

// multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/phangty/Projects/day17-workshop/day17-client/server/uploads')
  },
  filename: function (req, file, cb) {
    console.log(JSON.stringify(file));
    var uploadFileTokens = file.originalname.split('.');
    console.log(uploadFileTokens);
    cb(null, uploadFileTokens[0] + '-' + Date.now() + '.'+ uploadFileTokens[uploadFileTokens.length-1])
  },
  fieldSize: 20 * 1024 * 1024 // 20MB
})
var upload = multer({ storage: storage })

// sql
const sqlFindAllBooks = "SELECT * FROM books"
const sqlFindBookbyId = "SELECT * FROM books WHERE id = ?"
const sqlFindBookbySearchString = "SELECT * FROM books WHERE (author_firstname LIKE ?) || (author_lastname LIKE ?) || (title LIKE ?)"
var pool = mysql.createPool ({ 
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONLIMIT
})

// promise for sql query
var makeQuery = (sql, pool) => {
  console.info('sql >>>>> ', sql)
  return (args) => {
    let queryPromise = new Promise ((resolve, reject) => {
      pool.getConnection ((err, connection) => {
        if (err) {
          reject (err)
          return
        }
        console.info('args >>>>> ', args)
        connection.query(sql, args || [], (err, results) => {
          connection.release();
          if (err) {
            reject (err)
            return
          }
          // console.info('results >>>>> ', results)
          resolve(results)
        })
      })
    })
    return queryPromise
  }
}

// var turned into promise when makeQuery executes
var findAllBooks = makeQuery(sqlFindAllBooks, pool)
var findBookbyId = makeQuery(sqlFindBookbyId, pool)
var findBookbySearchString = makeQuery(sqlFindBookbySearchString, pool)

////////////////////////////////////ROUTES////////////////////////////////////
// GET all films or search string
app.get(API_URI + '/books', (req, res) => {
  console.info('query >>>>>', req.query)
  console.info('name >>>>>', req.query.name)
  console.info('title >>>>>', req.query.title)
  if(!req.query.name.trim() && !req.query.title.trim()){
    findAllBooks().then ((results) => {
      let finalResult = []
      let name = ''
      results.forEach((element) => {
        if (element.author_firstname != '') {
        name = element.author_firstname + ' ' + element.author_lastname
        } else {
        name = element.author_lastname
        }
        let value = { id: "", name: "", title: "", thumbnail: "" }
        value.id = element.id
        value.name = name
        value.title = element.title
        value.thumbnail = element.cover_thumbnail
        finalResult.push(value)
      })
      console.info('query result to be passed back >>>>> ', finalResult)
      res.json(finalResult)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  }
  else {
    findBookbySearchString([req.query.name,
                            req.query.name,
                            req.query.title]).then ((results) => {
      let finalResult = []
      let name = ''
      results.forEach((element) => {
        if (element.author_firstname != '') {
        name = element.author_firstname + ' ' + element.author_lastname
        } else {
        name = element.author_lastname
        }
        let value = { id: "", name: "", title: "", thumbnail: "" }
        value.id = element.id
        value.name = name
        value.title = element.title
        value.thumbnail = element.cover_thumbnail
        finalResult.push(value)
      })
      console.info('query result to be passed back >>>>> ', finalResult)
      res.json(finalResult)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  }
})

// GET one film by Id (params)
app.get(API_URI + '/books/:bookId', (req, res) => {
  console.info('params >>>>>', req.params);
  findBookbyId([parseInt(req.params.bookId)]).then ((results) => {
    let finalResult = []
      let name = ''
      results.forEach((element) => {
        if (element.author_firstname != '') {
        name = element.author_firstname + ' ' + element.author_lastname
        } else {
        name = element.author_lastname
        }
        let value = { id: "", name: "", title: "", thumbnail: "" }
        value.id = element.id
        value.name = name
        value.title = element.title
        value.thumbnail = element.cover_thumbnail
        finalResult.push(value)
      })
      console.info('query result to be passed back >>>>> ', finalResult)
      res.json(finalResult)
  }).catch((error) => {
    console.info(error)
    res.status(500).json(error)
  })
})

// static assets folder
app.use(express.static('public'))

////////////////////////////////////LISTEN////////////////////////////////////
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} on ${new Date()}`)
})