import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simple test query
    const result = await sql`SELECT 1 as test_value, NOW() as current_time`
    
    return NextResponse.json({ 
      message: "Database connection successful!",
      data: result[0]
    }, { status: 200 })
  } catch (error) {
    console.log("Database connection error:", error)
    return NextResponse.json({ 
      message: "Database connection failed",
      error: error.message 
    }, { status: 500 })
  }
}

// PUT method to create tables
export async function PUT() {
  try {
    // Create users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `

    // Create transactions table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `

    return NextResponse.json({ 
      message: "Tables created successfully!",
      tables: ["users", "transactions"]
    }, { status: 200 })
  } catch (error) {
    console.log("Error creating tables:", error)
    return NextResponse.json({ 
      message: "Failed to create tables",
      error: error.message 
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 })
    }

    // Insert test user data
    const result = await sql`
      INSERT INTO users(name, email, created_at)
      VALUES (${name}, ${email}, NOW())
      RETURNING *
    `

    return NextResponse.json({
      message: "User created successfully!",
      data: result[0]
    }, { status: 201 })
  } catch (error) {
    console.log("Error inserting data:", error)
    return NextResponse.json({ 
      message: "Failed to insert data",
      error: error.message 
    }, { status: 500 })
  }
}
