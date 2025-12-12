import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

dotenv.config();

const checkMongo = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Get database name
    const dbName = mongoose.connection.db.getName();
    console.log(`✓ Database name: ${dbName}`);

    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`✓ Collections (${collections.length}):`);
    collections.forEach(col => console.log(`  - ${col.name}`));

    // Count admins
    const adminCount = await Admin.countDocuments();
    console.log(`✓ Number of admins: ${adminCount}`);

    // Disconnect
    await mongoose.disconnect();
    console.log("✓ Disconnected from MongoDB");
  } catch (error) {
    console.error("✗ Error:", error.message);
    process.exit(1);
  }
};

checkMongo();
