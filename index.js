const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = "mongodb://localhost:27017/"
const dbname = "conFusionServer"


MongoClient.connect(url, (err, client) => {
    assert.strictEqual(err,null)

    console.log("Connection established successfully");

    const db = client.db(dbname);

    const collection = db.collection("dishes")

    collection.insertOne({"name": "Burger", "description": "Burger includes tikki"}, (err,result) => {
        assert.strictEqual(err,null)

        console.log("Data inserted Properly\n");

        console.log(result.ops)  //ops tell us how may operations has been taken place on db

        collection.find({}).toArray((err, docs) => {
            assert.strictEqual(err,null)

            console.log("Data found: \n");
            console.log(docs);

            db.dropCollection("dishes", (err,result) => {
                assert.strictEqual(err,null)
                console.log("\nDatabase deleted")

                client.close()
            });
        });

    });
})
