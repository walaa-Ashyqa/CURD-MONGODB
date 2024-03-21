console.log("hello");
const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;
const url =
    "mongodb+srv://walaa:Qj0aHvADeUJcFyk3@mycluster.bgqicch.mongodb.net/";
const database = "gettingStarted";
const userDocuments = [
    {
        "name": "Denise Hardin",
        "phone": "(265) 164-8965",
        "email": "aliquam.eu@protonmail.edu",
        "age": 28,
        "country": "United Kingdom",
        "numberrange": 1,
        "address": "240-2448 Tincidunt Av."
    },
    {
        "name": "Anthony Logan",
        "phone": "1-859-988-8191",
        "email": "sed@outlook.com",
        "age": 25,
        "country": "Mexico",
        "numberrange": 7,
        "address": "4176 Ut Avenue"
    },
    {
        "name": "Rina Sawyer",
        "phone": "(747) 404-2445",
        "email": "iaculis.lacus@hotmail.edu",
        "age": 22,
        "country": "Pakistan",
        "numberrange": 9,
        "address": "5412 Adipiscing. Road"
    },
    {
        "name": "Giacomo Robbins",
        "phone": "(754) 648-5878",
        "email": "augue.eu.tempor@protonmail.com",
        "age": 24,
        "country": "Spain",
        "numberrange": 4,
        "address": "8795 Tincidunt Ave"
    },
    {
        "name": "Jerry Bird",
        "phone": "1-372-123-2888",
        "email": "nunc@outlook.org",
        "age": 25,
        "country": "United States",
        "numberrange": 9,
        "address": "322-1659 Semper, St."
    },
    {
        "name": "Theodore Sanchez",
        "phone": "(570) 351-8860",
        "email": "consectetuer.adipiscing@hotmail.couk",
        "age": 27,
        "address": "Ap #690-3189 Scelerisque, Rd.",
        "country": "Australia",
        "region": "Renfrewshire",
        "numberrange": 5
    },
    {
        "name": "Fay Mason",
        "phone": "1-635-784-2272",
        "email": "libero@google.couk",
        "age": 27,
        "address": "Ap #275-6490 Ac St.",
        "country": "Brazil",
        "region": "Brandenburg",
        "numberrange": 8
    },
    {
        "name": "Rhona Mccarty",
        "phone": "1-845-226-9322",
        "email": "tellus.sem.mollis@yahoo.edu",
        "age": 27,
        "address": "549-4125 Placerat, Avenue",
        "country": "Spain",
        "region": "Pará",
        "numberrange": 5
    },
    {
        "name": "Rama Beard",
        "phone": "1-175-528-2865",
        "email": "vitae.sodales.at@hotmail.edu",
        "age": 27,
        "address": "4827 Ut, Rd.",
        "country": "Sweden",
        "region": "Western Visayas",
        "numberrange": 4
    },
    {
        "name": "Idona Brady",
        "phone": "1-722-686-7952",
        "email": "primis.in.faucibus@google.com",
        "age": 27,
        "address": "620-817 Maecenas Ave",
        "country": "New Zealand",
        "region": "Viken",
        "numberrange": 1
    }




]
mongoClient.connect(url, (error, result) => {
    if (error) { console.log("error has an occured") }
    console.log("database is successfully connect")
    // Get the database and collection on which to run the operation
    const db = result.db(database);
    const col = db.collection("users");

    //CRUD APP

    //Creat

    col.insertOne({
        "name": "Chiquita West",
        "phone": "(578) 619-2679",
        "email": "sed.facilisis@yahoo.ca",
        "age": 28,
        "address": "7863 Sodales. Street",
        "country": "Austria",
        "region": "Odessa oblast",
        "numberrange": 8
    }, (error, res) => {
        if (error) { console.log("faild insert user 1", error) }
        console.log("user 1 has been inserted successfully.")
    })

    col.insertOne({
        "name": "Odysseus Hall",
        "phone": "(334) 332-2236",
        "email": "eu.arcu@protonmail.ca",
        "age": 29,
        "address": "204-7123 In Rd.",
        "country": "Pakistan",
        "region": "O'Higgins",
        "numberrange": 6
    }, (error, res) => {
        if (error) { console.log("faild insert user 2") }
        console.log("user 2 has been inserted successfully.")
    })

    col.insertMany(userDocuments, (error, res) => {
        if (error) { console.log("faild inserted user Documents") }
        if (res) {
            console.log("inserted user Documents successfully.")
            result.close()
        }
    })

    ///Read
    const filter = { age: 27 }
    col.find(filter).toArray((error, users) => {
        if (error) { console.log("faild find user@age:27 Documents") }
        console.log(users)

    })
    col.find(filter).limit(3).toArray((error, users) => {
        if (error) { console.log("faild find user@age:27 Documents") }
        console.log("Get just 3 users \n", users)

    })

    col.find(filter).count((error, users) => {
        if (error) { console.log("faild find user@age:27 Documents") }
        console.log("Get count of users: ", users)
        result.close()
    })

    //update

    //update fisrt 4 decomnts name
    col.find(filter).limit(4).forEach((e) => {
        col.updateOne({ _id: e._id }, {
            $set: { name: "WALAA" }
        }).then((data) => { console.log(data, "\n count of modified data: ", data.modifiedCount) })
            .catch((error) => { console.log("Update Failed", error) })
    })

    //inc first 4 decomnts + 1
    col.find({}).limit(4).forEach((e) => {
        col.updateOne({ _id: e._id }, {
            $inc: { age: 1 }
        }).then((data) => { console.log(data, "\n count of modified data: ", data.modifiedCount) })
            .catch((error) => { console.log("Update Failed", error) })
    })

    //inc age=27 +4
    col.find(filter).limit(4).forEach((e) => {
        col.updateOne({ _id: e._id }, {
            $inc: { age: 4 }
        }).then((data) => { console.log(data, "\n count of modified data: ", data.modifiedCount) })
            .catch((error) => { console.log("Update Failed", error) })
    })

    //inc all age + 10
    col.updateMany({}, {
        $inc: { age: 10 }
    }).then((data) => { console.log(data, "\n count of modified data: ", data.modifiedCount); })
        .catch((error) => { console.log("Update Failed", error) })

    //delete
    //delete decs where age=41
    const deleteFilter = { age: 41 }
    col.deleteMany(deleteFilter)
        .then((data) => { console.log(data, "\n count of deleted data: ", data.deletedCount); result.close() })
        .catch((error) => { console.log("deleted Failed", error) })







})
