var local_db = new PouchDB('movies_schema_a');
var remote_db = 'http://admin:mtu12345@localhost:5984/movies_schema_a';

function syncNow() {
    PouchDB.sync(local_db, remote_db, { live: true, retry: true })
        .on('change', function (info) {
            console.log('status: sync change', info);
        })
        .on('error', function (err) {
            console.log('status: sync error', err);
        });
}

syncNow();