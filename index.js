const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const dboper = require('./operations')

const url = "mongodb://localhost:27017/"
const dbname = "conFusionServer"


MongoClient.connect(url, (err, client) => {
    assert.strictEqual(err,null)

    console.log("Connection established successfully");

    const db = client.db(dbname);
    const collection ="dishes"

    //const collection = db.collection("dishes")

    dboper.insertDocument(db, {"name": "Burger", "description": "test burger"},collection,(result) => {
        console.log("Inserted document: ", result.ops);

        dboper.findDocuments(db, collection, (docs) => {
            console.log("Documents found are: ",docs)

            dboper.updateDocument(db, {name: "burger"}, {description: "test Burger Updated"}, 
                                    collection, (result) => {
                console.log("Updated Documents: ", result.result)
                
                dboper.findDocuments(db, collection, (result) => {
                    console.log("Updated Document: ", result)

                    dboper.deleteDocument(db,{"name": "Burger", "description": "test Burger Updated"},
                                             collection, (result) => {
                        console.log("Document Deleted: ", result.result)
                        
                        db.dropCollection(collection, (err,result) => {
                            assert.strictEqual(err,null)
                            console.log("Collection is deleted: ", result )

                            client.close();
                        });
                    });
                });
            });
        });
    });

})  
