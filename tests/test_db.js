function testDB(dbType='./jsonfiledb') {

const LOG =

1; const log = (...args) => { if(LOG) console.log('\n', ...args) }


let db, entry, entries, result;


async function main(dbType) {


  db = require('./../lib/db')(dbType, dbType + '-dbs-api-test')

  log('Added db named', db.name)

  if( ! db.name ) throw 'db must have a name'



  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')

  if(entries.length !== 0) throw 'expected 0 entries, got: ' + entries.length



  entry = await db.addEntry({'some': 'entry'})

  log('Added entry:', entry)

  if ( ! entry.id ) throw 'entry must have an id'



  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')

  if(entries.length !== 1) throw 'expected 1 entries, got: ' + entries.length




  entry = await db.addEntry({'another': 'entry'})

  log('Added another entry:', entry)



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




  try {
  
    result = await db.changeEntry({'no': 'id'})

  }

  catch(e) {

    result = false

  }

  log('Changed entry which has no id, result is:', result)

  if(result) throw 'changing entry without id should not give a result'




  result = await db.getNextEntryId()
  
  log('Got next available entry-id, it is:', result)

  if(result != 3) throw 'expected next id to be 3, got: ' + result




  try {
  
    result = await db.changeEntry({'no': 'idea', 'id': result})

  }

  catch(e) {

    result = false

  }


  log('Changed an entry with non-existent id, result is:', result)

  if(result) throw 'changing entry with non-existing id should not give a result'





  result = await db.getNextEntryId()

  log('Got next available entryId:', result)

  if(result != 3) throw 'expected next id to be 3, got: ' + result



  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')
  
  if(entries.length !== 2) throw 'expected 2 entries, got: ' + entries.length






  result = await db.entriesToHtml()

  log('Ran entriesToHtml, result\'s length is:', result.length)

  if(typeof result !== 'string' | result.length < 9) throw 'something is wrong with entriesToHtml'



  result = await db.deleteEntry(entry.id)

  log('Deleted entry, result is:', result)

  if( ! result ) throw 'Could not delete entry!'




  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')
  
  if(entries.length !== 1) throw 'expected 1 entries, got: ' + entries.length





  result = await db.deleteEntry(entry)

  log('Deleted non-existent entry, result is:', result)

  if(result) throw 'deleting non-existent entry should not give a result, we got: ' + result




  result = await db.deleteEntries()

  log('Deleted all entries, result is:', result)

  if( ! result ) throw 'Could not delte all entries.'
 


  entries = await db.getEntries()
  
  log('There are', entries.length, 'entries.')

  if( entries.length != 0 ) throw 'Got ' + entries.length + ' entries, expected 0.'



  entry._id = 'mickeymouse'

  result = await db.entryExists(entry._id)

  log('Checked, if entry with id "mickeymouse" exists, result is:', result)

  if(result) throw 'should not give a result, got: ' + result



  db.destroy()

  log('Deleted db.\n')


} main(dbType).catch(e=>{console.log('\nError:', e, '\n')})


} // testDB


module.exports = testDB
