import mongoose from "mongoose";

const connection: { isConnected?: any } = {};

async function dbConnect() {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (err) {
    console.error(err);
    console.log("Connection failed!!!");
  }
}

export default dbConnect;

export async function connect() {
  //   if (!client.isConnected()) await client.connect();
  //   const db = client.db("sightings");
  //   return { db, client };
}
