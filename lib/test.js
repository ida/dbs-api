const LOG =

1; const log = (...args) => { if(LOG) console.log('\n', ...args) }

const exampleEntry = { 'some': 'field', 'another': 'day' }

let db, entry, result;


async function main() {


  db = require('./db')('pouchdb', 'test-db-api')

  log('Added db named', db.name)

  log('There are', await db.getEntries().then(res=>{return res.length}), 'entries.')



  entry = await db.addEntry(exampleEntry)

  log('Added entry:', entry)

  log('There are', await db.getEntries().then(res=>{return res.length}), 'entries.')



  entry = await db.addEntry(exampleEntry)

  log('Added same entry again:', entry)

  log('There are', await db.getEntries().then(res=>{return res.length}), 'entries.')




  entry = await db.getEntry(entry.id)

  log('Got entry, it has the keys:', Object.keys(entry))



  entry.some = 'shield'

  result = await db.changeEntry(entry)

  log('Changed entry, result is:', result)




  delete exampleEntry._id; try {

    await db.changeEntry(exampleEntry); throw 'Failed test!' } catch(err) {

    log('Changed entry which has no _id, errors correctly.')

  }


  exampleEntry._id = await db.getNextEntryId()

  result = await db.changeEntry(exampleEntry)

  log('Changed an entry with non-existent id, will be added anyways, result is:', result)



  result = await db.getNextEntryId()

  log('Got next available entryId:', result)



  log('There are', await db.getEntries().then(res=>{return res.length}), 'entries.')


  result = await db.entriesToJson()

  log('Ran entriesToJson, result\'s length is:', result.length)



  result = await db.entriesToHtml()

  log('Ran entriesToHtml, result\'s length is:', result.length)



  result = await db.deleteEntry(entry)

  log('Deleted entry, result is:', result)

  log('There are', await db.getEntries().then(res=>{return res.length}), 'entries.')



  result = await db.deleteEntry(entry)

  log('Deleted non-existent entry, result is:', result)



  result = await db.deleteEntries()

  log('Deleted all entries, result is:', result)

  log('There are', await db.getEntries().then(res=>{return res.length}), 'entries.')



  entry._id = 'mickeymouse'

  result = await db.entryExists(entry._id)

  log('Checked, if entry with id "mickeymouse" exists, result is:', result)



  db.destroy()

  log('Deleted db.\n')





} main().catch(e=>{console.log('test.js says error is:', e)})
