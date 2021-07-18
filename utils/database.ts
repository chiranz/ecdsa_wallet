import mongoose, { connect, ConnectionOptions } from "mongoose";

const connection: { isConnected?: any } = {};

const options: ConnectionOptions = {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
};

async function dbConnect() {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/next_test",
      options
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (err) {
    console.error(err);
    console.log("Connection failed!!!");
  }
}

export default dbConnect;
