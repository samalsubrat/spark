import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Make the request to your Water Quality ML API
    const response = await fetch('https://waterborne-risk-api-osl1.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Water Quality API error:', error)
    return NextResponse.json(
      { error: 'Failed to get water quality prediction from ML service' },
      { status: 500 }
    )
  }
}
