const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://admin2:malith123@cluster0.spa0af2.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('smartcampus');
    const collections = await database.listCollections().toArray();
    for (const c of collections) {
      console.log(`\n=== Collection: ${c.name} ===`);
      const docs = await database.collection(c.name).find({}).toArray();
      // Print first 5 items to keep output short, but maybe print all if needed
      console.log(JSON.stringify(docs, null, 2));
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
