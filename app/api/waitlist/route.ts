import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

export async function POST(request: Request) {
  let client;
  try {
    // Parse the request body
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Add more detailed logging
    console.log('Attempting to connect to MongoDB...');
    console.log('URI exists:', !!uri);
    console.log('DB name exists:', !!dbName);

    // Connect to MongoDB
    client = new MongoClient(uri as string);
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    const db = client.db(dbName);
    const collection = db.collection('waitlist');

    // Check if email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      console.log('Email already exists:', email);
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Add timestamp
    const timestamp = new Date();

    // Insert into database
    const result = await collection.insertOne({
      email,
      name: name || '',
      timestamp,
    });
    
    console.log('Document inserted with ID:', result.insertedId);
    
    return NextResponse.json(
      { message: 'Successfully added to waitlist' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database error details:', error);
    return NextResponse.json(
      { message: 'Error saving to database' },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}