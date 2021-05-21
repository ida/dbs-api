const dbsDirectoryPath = process.env.HOME + '/.data/db-api/'

const fs = require('fs')



module.exports = (dbType='pouchdb', dbName=dbType) => {
//
// Usage:
//
// var db = require('./this_script')('pouchdb')
//
//
// Optionally give db a name:
//
// var db = require('./this_script')('pouchdb', 'a-name')
//
//
// If you don't care about which type of db is used, use the default:
//
// var db = require('./this_script')()


  // Create directory for dbs:
  fs.mkdirSync(dbsDirectoryPath, { recursive: true })

  // Create db:
  const db = new require(dbType)(dbsDirectoryPath + dbName)

  // Save dbType (needed in db.sync):
  db.dbType = dbType

  // Get corresponding api of dbType:
  const api = require('./apis/' + dbType)

  // For each function of corresponding api:
  for(let functionName in api) {

    // Attach api-function to db:
    db[functionName] = (...args) => { return api[functionName](db, ...args) }

  }

  // Export db:
  return db

}
