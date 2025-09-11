"use client"

import React from "react"
import { UsersTable } from "@/components/users-table"

export default function RoleManagementPage() {
  // In a real app, you would get this from authentication context
  const currentUserRole = "Admin" // or "Local Leader", etc.
  const currentUserRegion = "Central District"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Role Management</h1>
          <p className="text-gray-600">
            Manage user roles, permissions, and access control across the system
          </p>
        </div>

        <UsersTable 
          currentUserRole={currentUserRole}
          currentUserRegion={currentUserRegion}
        />
      </div>
    </div>
  )
}
