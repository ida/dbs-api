function addEntry(db, entry={}) {
  entry._id = getNextEntryId(db)
  db.data.push(entry)
  db.write()
  return entry
}


function changeEntry(db, newEntry) {
}


function deleteEntry(db, entry) {
}


function deleteEntries(db) {
}


function entriesToHtml(db) {

  const entries = entriesToJson(db)

  if(entries.length < 1) return 'No entries in database to display.'

  let html = ''

  for(let entry of entries) {

    entry = getEntry(db, entry._id)

    html += '<dl style="border: 1px solid">'

    for(let fieldname in entry) {

      if(fieldname != '_rev') {

        html += '<dt>' + fieldname + '</dt>'

        html += '<dd>' + entry[fieldname] + '</dd>'

      }

    }

    html += '</dl>'

  }

  return html

}


function entriesToJson(db) {
}


function entryExists(db, entryId) {
  
  return getEntry(db, entryId)

}


function getEntry(db, entryId) {
  for(let entry of db.data) {
    if(entry._id == entryId) {
      return entry
    }
  }
}


function getEntries(db) {
  return db.data
}


function getNextEntryId(db) {
  let entryId = 0
  let max = getEntries(db).length
console.debug('getNextEntryId says max is',max)

  while( ! entryExists( db, String(entryId) )  ) {
    entryId += 1
    max -= 1
    if(max < 1) break
  }
  return String(entryId)
}


function syncData(db, remoteDbsServerAddress, syncEveryNSeconds=10) {
}


module.exports = {
  addEntry: addEntry,
  changeEntry: changeEntry,
  deleteEntry: deleteEntry,
  deleteEntries: deleteEntries,
  entriesToHtml: entriesToHtml,
  entriesToJson: entriesToJson,
  entryExists: entryExists,
  getEntry: getEntry,
  getEntries: getEntries,
  getNextEntryId: getNextEntryId,
  syncData: syncData
}
