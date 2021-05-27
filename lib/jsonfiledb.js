const fs = require('fs')
const fileExists = path => { return fs.existsSync(path) }
const readFile = path => { return fs.readFileSync(path, 'utf-8') }
const writeFile = (path, content) => { fs.writeFileSync(path, content) }

function jsonFileDB(dbName) {
  var db = {
    name: dbName,
    path: dbName + '.json',
    data: [],
    write: () => writeFile(db.path, JSON.stringify(db.data)),
    read: () => { return JSON.parse(readFile(db.path)) }
  }
  if( ! fileExists(db.path) ) db.write()
  else db.data = db.read()
  return db
}

module.exports = jsonFileDB
