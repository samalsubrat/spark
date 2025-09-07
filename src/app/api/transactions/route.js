import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { title, amount, category, user_id } = await request.json()

    if (!title || !user_id || !category || amount === undefined) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const transaction = await sql`
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `

    return NextResponse.json(transaction[0], { status: 201 })
  } catch (error) {
    console.log("Error creating the transaction", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const transactions = await sql`
      SELECT t.*, u.name as user_name, u.email as user_email 
      FROM transactions t 
      LEFT JOIN users u ON t.user_id = u.id 
      ORDER BY t.created_at DESC 
      LIMIT 10
    `

    return NextResponse.json({ 
      transactions,
      count: transactions.length 
    }, { status: 200 })
  } catch (error) {
    console.log("Error fetching transactions", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
