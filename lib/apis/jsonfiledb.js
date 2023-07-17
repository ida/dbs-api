const fs = require('fs')


function addEntry(db, entry={}) {
  if(entry.id) { throw 'addEntry says entry must not contain an id!' }
  entry.id = getNextEntryId(db)
  db.data.push(entry)
  db.write()
  return entry
}


function changeEntry(db, newEntry) {

  if( ! newEntry.id ) throw 'changeEntry says entry must have an id'

  if( ! entryExists(db, newEntry.id) ) throw 'changeEntry says entry does not exist'

  let entry = getEntry(db, newEntry.id)

  for(var key in newEntry) {

    entry[key] = newEntry[key]

  }

  db.write()

  return entry

}


function deleteEntry(db, entryId) {
  let deletedEntry = null
  for(var i in db.data) {
    var entry = db.data[i]
    if(entry.id == entryId) {
      deletedEntry =  db.data.splice(i, 1)[0]
    }
  }
  if(deletedEntry) {
    db.write()
  console.debug('wrote db')

  }
  return deletedEntry
}


function deleteEntries(db) {

  db.data = []

  db.write()

  return true

}


function destroy(db) {

  fs.unlinkSync(db.path)

}


function entriesToHtml(db) {

  const entries = db.data

  if(entries.length < 1) return 'No entries in database to display.'

  let html = ''

  for(let entry of entries) {

    html += '<dl style="border: 1px solid">'

    for(let fieldname in entry) {

      html += '<dt>' + fieldname + '</dt>'

      html += '<dd>' + entry[fieldname] + '</dd>'

    }

    html += '</dl>'

  }

  return html

}


function entryExists(db, entryId) {

  return getEntry(db, entryId)

}


function getEntry(db, entryId) {

  for(let entry of db.data) {

    if(entry.id == entryId) {

      return entry

    }

  }

}


function getEntries(db) {

  return db.data

}


function getNextEntryId(db) {

  let entryId = 1

  while( entryExists( db, String(entryId) )  ) entryId += 1

  return String(entryId)

}


function syncData(db, remoteDbsServerAddress, syncEveryNSeconds=10) {
}


module.exports = {
  addEntry: addEntry,
  changeEntry: changeEntry,
  deleteEntry: deleteEntry,
  deleteEntries: deleteEntries,
  destroy: destroy,
  entriesToHtml: entriesToHtml,
  entryExists: entryExists,
  getEntry: getEntry,
  getEntries: getEntries,
  getNextEntryId: getNextEntryId,
  syncData: syncData
}
