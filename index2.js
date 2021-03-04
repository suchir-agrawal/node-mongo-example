const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const dboper = require('./operations2')

const url = "mongodb://localhost:27017/"
const dbname = "conFusionServer"


MongoClient.connect(url).then((client) => {
    console.log("Connection established successfully");

    const db = client.db(dbname);
    const collection ="dishes"

    //const collection = db.collection("dishes")

    dboper.insertDocument(db, {"name":"Burger", "description":"test burger"},collection)
    .then((result)=>{
        console.log("Inserted document: ", result.ops);

        return dboper.findDocuments(db, collection )
    })
    .then((docs) => {
        console.log("Documents found are: ",docs)

        return dboper.updateDocument(db, {name:"Burger"}, {description:"test Burger Updated"},collection)
    })
    .then((result) => {
        console.log("Updated Documents: ", result.result)
                
        return dboper.findDocuments(db, collection)
    })
    .then((result) => {
        console.log("Updated Document: ", result)
        return dboper.deleteDocument(db,{"name":"Burger", "description":"test Burger Updated"},collection)
    })
    .then((result) => {
        console.log("Document Deleted: ", result.result)                
         return db.dropCollection(collection)
    })
    .then((result) => {
        console.log("Collection is deleted: ", result )
        client.close();
    })
})
.catch((err) => {
    console.log("Couldn't able to complete the task due to following error\n\n",err)
})
