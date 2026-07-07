import mongoose from "mongoose";

// Type definition for cached connection
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Initialize cache object to store connection state
const cached: MongooseConnection = {
  conn: null,
  promise: null,
};

/**
 * Connects to MongoDB using Mongoose with connection caching.
 * Prevents multiple connections during development by reusing existing connections.
 *
 * @returns Promise<typeof mongoose> - The mongoose instance
 * @throws Error if MONGODB_URI environment variable is not set
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // Return existing promise if connection is in progress
  if (cached.promise) {
    return cached.promise;
  }

  // Ensure MONGODB_URI is configured
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  // Create new connection promise
  cached.promise = mongoose
    .connect(mongoUri, {
      // Connection pool size for better performance
      maxPoolSize: 10,
      minPoolSize: 5,
      // Automatically create indexes from schemas
      autoCreate: true,
      // Automatically build indexes defined in schemas
      autoIndex: true,
    })
    .then((mongooseInstance) => {
      // Cache the successful connection
      cached.conn = mongooseInstance;
      return mongooseInstance;
    })
    .catch((error) => {
      // Clear promise cache on connection failure
      cached.promise = null;
      throw error;
    });

  return cached.promise;
}

/**
 * Disconnects from MongoDB gracefully.
 * Useful for cleanup in tests or application shutdown.
 *
 * @returns Promise<void>
 */
async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

export { connectDB, disconnectDB };
