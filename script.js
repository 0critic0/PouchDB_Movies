var local_db = new PouchDB('movies_schema_a');
var remote_db = 'http://admin:mtu12345@localhost:5984/movies_schema_a';

function addMovie() {
    var title = document.getElementById('title').value.trim();
    var actors = document.getElementById('actors').value.trim();
    var genres = document.getElementById('genres').value.trim();

    if (!title) return;

    local_db.allDocs().then(function (all) {
        var max = 0;
        all.rows.forEach(function (row) {
            var n = parseInt(row.id, 10);
            if (n > max) max = n;
        });

        local_db.put({
            _id: String(max + 1),
            title: title,
            actors: actors.split(',').
                map(function (s) {
                    return s.trim(); }).filter(Boolean),
            genres: genres.split(',').
                map(function (s) {
                    return s.trim(); }).filter(Boolean)
        }).then(function () {
            alert('Added');
        });
    });
}



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