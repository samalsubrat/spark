// app/api/reports/route.js
import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

// GET: fetch all reports
export async function GET() {
  try {
    const reports = await sql`SELECT * FROM reports ORDER BY collected_at DESC`

    return NextResponse.json(
      {
        message: "Reports fetched successfully",
        data: reports,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json(
      {
        message: "Failed to fetch reports",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// PUT: create reports table
export async function PUT() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        photo_url TEXT NOT NULL,
        latitude DECIMAL(9,6) NOT NULL,
        longitude DECIMAL(9,6) NOT NULL,
        local_leader VARCHAR(255),
        comments TEXT,
        collected_at TIMESTAMP DEFAULT NOW()
      )
    `

    return NextResponse.json(
      {
        message: "Reports table created successfully!",
        table: "reports",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error creating reports table:", error)
    return NextResponse.json(
      {
        message: "Failed to create reports table",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// POST: insert new report
export async function POST(request) {
  try {
    const body = await request.json()
    const { photo_url, latitude, longitude, local_leader, comments } = body

    // Validation
    if (!photo_url || !latitude || !longitude) {
      return NextResponse.json(
        { message: "Photo and location are required" },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO reports (photo_url, latitude, longitude, local_leader, comments, collected_at)
      VALUES (${photo_url}, ${latitude}, ${longitude}, ${local_leader}, ${comments}, NOW())
      RETURNING *
    `

    return NextResponse.json(
      { message: "Report created successfully!", data: result[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json(
      { message: "Failed to create report", error: error.message },
      { status: 500 }
    )
  }
}
