async function addEntry(db, entryObject={}) {

  let entry = null

  let entryId = null

  let entryIdNumber = 0

  let notAddedEntry = true
  
  while( notAddedEntry ) {
  
    entryIdNumber += 1
    
    entryId = String(entryIdNumber)
    
    notAddedEntry = await db.get(entryId).catch(e=>{
    
      entryObject._id = entryId
      
      entry = db.put(entryObject).then(result=>{return result})
      
      return false
    
    });

  }

  return entry

}


async function changeEntry(db, newEntry) {

  if( ! newEntry._id ) {

    throw "Error: changeEntry says newEntry must contain prop '_id'"

  }

  let entry = await getEntry(db, newEntry._id)

  newEntry._rev = entry._rev

  return db.put(newEntry)

    .then ( res => { return true  } )

    .catch( err => { return false } )

}


async function deleteEntry(db, entry) {

  if( ! entry._id || ! entry._rev ) {

    throw "Error: deleteEntry says entry must contain props '_id' and '_rev'"

  }

  try {

    await db.remove(entry)

    return true

  }

  catch(error) {

    return false

  }

}


async function deleteEntries(db) {

  const entries = await getEntries(db)

  for(let entry of entries) {

    let result = await deleteEntry(db, entry)

    if( ! result ) return false

  }

  return true

}


async function entriesToHtml(db) {

  const entries = await getEntries(db)

  if(entries.length < 1) return 'No entries in database to display.'

  let html = ''

  for(let entry of entries) {

    entry = await getEntry(db, entry._id)

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


async function entryExists(db, entryId) {

  return await getEntry(db, entryId)

}


async function getEntry(db, entryId) {
  
  return await db.get(entryId).catch(e=>{ return false })

}


async function getEntries(db) {

  return await db.allDocs().then(async result => {

    const entries = []

    for(entry of result.rows) {

      entry = await getEntry(db, entry.id)

      entries.push(entry)

    }

    return entries

  });

}


async function getNextEntryId(db) {

  let exists = false

  let entryId = null

  let entryIdNumber = 0

  while( ! entryId ) {
  
    entryIdNumber += 1
    
    exists = await entryExists(db, String(entryIdNumber))
    
    if( ! exists ) entryId = String(entryIdNumber)

  }

  return entryId

}


async function syncData(db, remoteDbsServerAddress, syncEveryNSeconds=10) {

  const dbServerAddress = remoteDbsServerAddress + db.dbType

  setInterval(() => {

    db.replicate.from(dbServerAddress)
  
    db.replicate.to(  dbServerAddress)

  }, 1000*syncEveryNSeconds);

  
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
