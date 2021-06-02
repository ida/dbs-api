function testDB(dbType='./jsonfiledb') {

const LOG =

1; const log = (...args) => { if(LOG) console.log('\n', ...args) }

const exampleEntry = { 'some': 'field', 'another': 'day' }

let db, entry, entries, result;


async function main(dbType) {


  db = require('./db')(dbType, dbType + '-dbs-api-test')

  log('Added db named', db.name)

  

  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')

  if(entries.length !== 0) throw 'expected 0 entries, got: ' + entries.length




  entry = await db.addEntry(exampleEntry)

  log('Added entry:', entry)




  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')

  if(entries.length !== 1) throw 'expected 1 entries, got: ' + entries.length




  entry = await db.addEntry(exampleEntry)

  log('Added same entry again:', entry)



  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')

  if(entries.length !== 2) throw 'expected 2 entries, got: ' + entries.length



  entry = await db.getEntry(entry.id)

  result = Object.keys(entry)

  log('Got entry, it has the keys:', result)



  entry.some = 'shield'

  result = await db.changeEntry(entry)

  log('Changed entry, result is:', result)


  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')

  if(entries.length !== 2) throw 'expected 2 entries, got: ' + entries.length




  delete exampleEntry.id; try {

    await db.changeEntry(exampleEntry); throw 'Failed test!' } catch(err) {

    log('Changed entry which has no id, errors correctly.')

  }


  exampleEntry.id = await db.getNextEntryId()

  result = await db.changeEntry(exampleEntry)

  log('Changed an entry with non-existent id, will be added anyways, result is:', result)



  result = await db.getNextEntryId()

  log('Got next available entryId:', result)


  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')



  result = await db.entriesToHtml()

  log('Ran entriesToHtml, result\'s length is:', result.length)



  result = await db.deleteEntry(entry.id)

  log('Deleted entry, result is:', result)

  if( ! result ) throw 'Could not delete entry!'

  
  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')



  result = await db.deleteEntry(entry)

  log('Deleted non-existent entry, result is:', result)

  if(result) throw 'Got a result: ' + result




  result = await db.deleteEntries()

  log('Deleted all entries, result is:', result)

  if( ! result ) throw 'Could not delte all entries.'
 


  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')

  if( entries.length != 0 ) throw 'Got ' + entries.length + ' entries, expected 0.'



  entry._id = 'mickeymouse'

  result = await db.entryExists(entry._id)

  log('Checked, if entry with id "mickeymouse" exists, result is:', result)

  if(result) throw 'Got a result: ' + result



  db.destroy()

  log('Deleted db.\n')


} main(dbType).catch(e=>{console.log('test_db.js got an error:\n' + e)})


} // testDB


module.exports = testDB
