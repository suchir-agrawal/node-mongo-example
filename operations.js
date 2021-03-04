const assert = require('assert')

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err,result) => {
        assert.strictEqual(err, null)

        console.log("Inserted "+ result.result.n+" document into the collection "+ collection);

        callback(result);
    })
}

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);

    coll.find({}).toArray((err,docs) => {
        assert.strictEqual(err, null)
        console.log("Found: \n");
        callback(docs);

    });

}

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set: update}, null, (err,result) => {
        assert.strictEqual(err, null)

        console.log("Document Updated with: "+ update)
        callback(result);
    })

}

exports.deleteDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);

    coll.deleteOne(document, (err,result) => {
        assert.strictEqual(err, null)
        console.log("Document Deleted ", document)
        callback(result);
    })
}