"use client"

import { useState } from 'react'

export default function TestDatabase() {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-db')
      const data = await response.json()
      setResults(prev => ({ ...prev, connection: data }))
    } catch (error) {
      setResults(prev => ({ ...prev, connection: { error: error.message } }))
    }
    setLoading(false)
  }

  const createTables = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-db', { method: 'PUT' })
      const data = await response.json()
      setResults(prev => ({ ...prev, tables: data }))
    } catch (error) {
      setResults(prev => ({ ...prev, tables: { error: error.message } }))
    }
    setLoading(false)
  }

  const createUser = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com'
        })
      })
      const data = await response.json()
      setResults(prev => ({ ...prev, user: data }))
    } catch (error) {
      setResults(prev => ({ ...prev, user: { error: error.message } }))
    }
    setLoading(false)
  }

  const createTransaction = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Transaction',
          amount: 100.50,
          category: 'Food',
          user_id: 1
        })
      })
      const data = await response.json()
      setResults(prev => ({ ...prev, transaction: data }))
    } catch (error) {
      setResults(prev => ({ ...prev, transaction: { error: error.message } }))
    }
    setLoading(false)
  }

  const getTransactions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/transactions')
      const data = await response.json()
      setResults(prev => ({ ...prev, transactions: data }))
    } catch (error) {
      setResults(prev => ({ ...prev, transactions: { error: error.message } }))
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Database Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <button 
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Connection
        </button>
        
        <button 
          onClick={createTables}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Create Tables
        </button>
        
        <button 
          onClick={createUser}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Create Test User
        </button>
        
        <button 
          onClick={createTransaction}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Create Transaction
        </button>
        
        <button 
          onClick={getTransactions}
          disabled={loading}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          Get Transactions
        </button>
      </div>

      {loading && <div className="text-center">Loading...</div>}

      <div className="space-y-4">
        {Object.entries(results).map(([key, result]) => (
          <div key={key} className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2 capitalize">{key} Result:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Setup Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Make sure your DATABASE_URL is set in .env.local</li>
          <li>Click "Test Connection" to verify database connectivity</li>
          <li>Click "Create Tables" to set up the users and transactions tables</li>
          <li>Click "Create Test User" to insert a sample user</li>
          <li>Click "Create Transaction" to test transaction insertion</li>
          <li>Click "Get Transactions" to view all transactions</li>
        </ol>
      </div>
    </div>
  )
}
