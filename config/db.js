const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
    const uri = await mongod.getConnectionString();
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
    };
    await mongoose.connect(uri, mongooseOpts);
    console.log("Mongo DB Connected- In Memory");

    //************************************************************************** */
    // Uncomment the following code to connect to MongoDB
    //************************************************************************** */
    // //connect to actual database
    // const databaseURL = "mongodb://localhost/skaud";
    // try {
    //     await mongoose.connect(databaseURL, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     });
    //     console.log("MongoDB Connected...");
    // } catch (err) {
    //     console.error(err.message);
    //     process.exit(1);
    // }
};
