const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Connected successfully!");
    
    // Attempting to create the database by inserting a dummy document
    const database = client.db('smartcampus');
    const collection = database.collection('startup_logs');
    
    await collection.insertOne({ message: "Database created successfully!", timestamp: new Date() });
    console.log("SUCCESS: Database 'smartcampus' and collection 'startup_logs' have been created.");
    console.log("You should now see them in your MongoDB Atlas cluster!");

  } catch (error) {
    if (error.codeName === 'AtlasError' && error.errmsg.includes('bad auth')) {
      console.error("\nERROR: Authentication failed! Your database wasn't created.");
      console.error("Please double-check your MongoDB Atlas username ('admin2') and password ('malith123').");
    } else {
      console.error("\nERROR: Could not connect to MongoDB. It might be an IP whitelist issue.");
      console.error(error);
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
