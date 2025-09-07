"use server";

import { sql } from "@/lib/db";

// Test database connection
export async function testDatabaseConnection() {
  try {
    const result = await sql`SELECT 1 as test, NOW() as current_time`;
    return { 
      success: true, 
      message: "Database connection successful", 
      data: result[0] 
    };
  } catch (error) {
    console.error("Database connection error:", error);
    return { 
      success: false, 
      error: "Database connection failed", 
      details: error.message 
    };
  }
}

// Test basic SQL operations
export async function testBasicOperations() {
  try {
    // Test 1: Simple SELECT
    const selectTest = await sql`SELECT 'Hello from Neon!' as message`;
    
    // Test 2: Math operations
    const mathTest = await sql`SELECT 2 + 2 as result, PI() as pi`;
    
    // Test 3: Date/Time functions
    const dateTest = await sql`SELECT NOW() as current_timestamp, CURRENT_DATE as today`;
    
    // Test 4: String functions
    const stringTest = await sql`SELECT UPPER('testing neon db') as upper_text, LENGTH('hello world') as text_length`;
    
    return {
      success: true,
      message: "All basic operations completed successfully",
      tests: {
        select: selectTest[0],
        math: mathTest[0],
        datetime: dateTest[0],
        string: stringTest[0]
      }
    };
  } catch (error) {
    console.error("Basic operations test error:", error);
    return {
      success: false,
      error: "Basic operations test failed",
      details: error.message
    };
  }
}

// Test database metadata
export async function testDatabaseInfo() {
  try {
    // Get database version
    const versionResult = await sql`SELECT version() as db_version`;
    
    // Get current database name
    const dbNameResult = await sql`SELECT current_database() as database_name`;
    
    // Get current user
    const userResult = await sql`SELECT current_user as username`;
    
    return {
      success: true,
      message: "Database info retrieved successfully",
      info: {
        version: versionResult[0].db_version,
        database: dbNameResult[0].database_name,
        user: userResult[0].username
      }
    };
  } catch (error) {
    console.error("Database info test error:", error);
    return {
      success: false,
      error: "Database info test failed",
      details: error.message
    };
  }
}

// Test table operations (if you have permissions)
export async function testTableOperations() {
  try {
    // Try to list tables in the public schema
    const tablesResult = await sql`
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    return {
      success: true,
      message: "Table information retrieved successfully",
      tables: tablesResult
    };
  } catch (error) {
    console.error("Table operations test error:", error);
    return {
      success: false,
      error: "Table operations test failed",
      details: error.message
    };
  }
}

// Comprehensive test function that runs all tests
export async function runAllDatabaseTests() {
  console.log("Starting comprehensive database tests...");
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: {}
  };
  
  // Test 1: Connection
  console.log("Testing database connection...");
  results.tests.connection = await testDatabaseConnection();
  
  // Test 2: Basic operations
  console.log("Testing basic SQL operations...");
  results.tests.basicOperations = await testBasicOperations();
  
  // Test 3: Database info
  console.log("Testing database metadata...");
  results.tests.databaseInfo = await testDatabaseInfo();
  
  // Test 4: Table operations
  console.log("Testing table operations...");
  results.tests.tableOperations = await testTableOperations();
  
  // Summary
  const passedTests = Object.values(results.tests).filter(test => test.success).length;
  const totalTests = Object.keys(results.tests).length;
  
  results.summary = {
    passed: passedTests,
    total: totalTests,
    success: passedTests === totalTests,
    message: `${passedTests}/${totalTests} tests passed`
  };
  
  console.log(`Database tests completed: ${results.summary.message}`);
  return results;
}