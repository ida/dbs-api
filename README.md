dbs-api
=======

One API for all the DBs.


Install
-------

    npm i dbs-api


And the DB you want to use, let's use PouchDB, for now:

    npm i pouchdb


Usage
-----

    async function main() {

        const db = require('db-api')()

        let entry = await db.addEntry({'some': 'data'})

        entry.some = 'other-data'

        await db.changeEntry(entry)

        await db.deleteEntry(entry)

        entry = await db.getEntry('entry-id')

        const entries = await db.getEntries()

        await db.deleteEntries()

    }

    main.catch( error => console.log(error) )


Supported DBs
-------------

Currently only PouchDB.


Contact
-------

Open an issue on https://github.com/ida/dbs-api


License
-------

MIT
