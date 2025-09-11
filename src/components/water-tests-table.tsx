"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Calendar, Droplets, Plus, Filter, ChevronDown, ChevronRight } from "lucide-react"

// Simple date formatter to avoid hydration issues
const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

interface WaterTest {
  id: string
  waterbodyName: string
  testType: "Surveillance" | "Routine" | "Emergency"
  turbidity: number
  ph: number
  bacteriaLevel: number
  status: "Pending" | "Completed"
  priority: "Low" | "Medium" | "High"
  date: string
  conductedBy: string
  detailedResults?: {
    temperature: number
    dissolvedOxygen: number
    nitrates: number
    phosphates: number
    coliform: number
    ecoli: number
    notes: string
  }
}

const mockWaterTests: WaterTest[] = [
  {
    id: "WT-2024-0156",
    waterbodyName: "Lake Meridian",
    testType: "Emergency",
    turbidity: 8.5,
    ph: 6.8,
    bacteriaLevel: 1200,
    status: "Completed",
    priority: "High",
    date: "2024-01-15",
    conductedBy: "Dr. Michael Chen",
    detailedResults: {
      temperature: 18.5,
      dissolvedOxygen: 6.2,
      nitrates: 2.8,
      phosphates: 0.15,
      coliform: 1200,
      ecoli: 850,
      notes: "Elevated bacteria levels detected. Recommend immediate action and retesting within 48 hours.",
    },
  },
  {
    id: "WT-2024-0157",
    waterbodyName: "River Park Stream",
    testType: "Surveillance",
    turbidity: 4.2,
    ph: 7.1,
    bacteriaLevel: 450,
    status: "Completed",
    priority: "Medium",
    date: "2024-01-14",
    conductedBy: "Lab Tech B",
    detailedResults: {
      temperature: 16.8,
      dissolvedOxygen: 8.1,
      nitrates: 1.2,
      phosphates: 0.08,
      coliform: 450,
      ecoli: 120,
      notes: "Water quality within acceptable parameters. Continue regular monitoring schedule.",
    },
  },
  {
    id: "WT-2024-0158",
    waterbodyName: "Downtown Pond",
    testType: "Routine",
    turbidity: 0,
    ph: 0,
    bacteriaLevel: 0,
    status: "Pending",
    priority: "Low",
    date: "2024-01-15",
    conductedBy: "Dr. Sarah Wilson",
  },
]

function getStatusColor(status: WaterTest["status"]) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getPriorityColor(priority: WaterTest["priority"]) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 border-red-200"
    case "Medium":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Low":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getTestTypeColor(testType: WaterTest["testType"]) {
  switch (testType) {
    case "Emergency":
      return "bg-red-100 text-red-800 border-red-200"
    case "Surveillance":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Routine":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function WaterTestsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [tests] = useState(mockWaterTests)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.waterbodyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.conductedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || test.status === statusFilter
    const matchesPriority = priorityFilter === "all" || test.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const toggleRowExpansion = (testId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(testId)) {
      newExpanded.delete(testId)
    } else {
      newExpanded.add(testId)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <Card className="rounded-xl border-0 shadow-sm bg-white">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Waterbody Tests</CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Test
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="min-w-[120px]">Test ID</TableHead>
              <TableHead className="min-w-[150px]">Waterbody Name</TableHead>
              <TableHead className="min-w-[120px]">Test Type</TableHead>
              <TableHead className="min-w-[100px]">Turbidity (NTU)</TableHead>
              <TableHead className="min-w-[80px]">pH</TableHead>
              <TableHead className="min-w-[140px]">Bacteria (CFU/100ml)</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[100px]">Priority</TableHead>
              <TableHead className="min-w-[100px]">Date</TableHead>
              <TableHead className="min-w-[150px]">Conducted By</TableHead>
              <TableHead className="min-w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTests.map((test) => (
              <React.Fragment key={test.id}>
                <TableRow className="group">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(test.id)}
                      className="p-1 h-6 w-6"
                      disabled={test.status === "Pending"}
                    >
                      {expandedRows.has(test.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{test.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="font-medium text-gray-900 truncate">{test.waterbodyName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTestTypeColor(test.testType)}>{test.testType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {test.status === "Pending" ? "-" : test.turbidity.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{test.status === "Pending" ? "-" : test.ph.toFixed(1)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {test.status === "Pending" ? "-" : test.bacteriaLevel.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(test.priority)}>{test.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="whitespace-nowrap">{formatDate(test.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900 truncate">{test.conductedBy}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows.has(test.id) && test.detailedResults && (
                  <TableRow>
                    <TableCell colSpan={12} className="bg-gray-50 p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Detailed Test Results</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <div className="bg-white p-3 rounded-lg border">
                              <div className="text-sm font-medium text-gray-700">Temperature</div>
                              <div className="text-lg font-semibold text-gray-900">
                                {test.detailedResults.temperature}°C
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg border">
                              <div className="text-sm font-medium text-gray-700">Dissolved Oxygen</div>
                              <div className="text-lg font-semibold text-gray-900">
                                {test.detailedResults.dissolvedOxygen} mg/L
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg border">
                              <div className="text-sm font-medium text-gray-700">Nitrates</div>
                              <div className="text-lg font-semibold text-gray-900">
                                {test.detailedResults.nitrates} mg/L
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg border">
                              <div className="text-sm font-medium text-gray-700">Phosphates</div>
                              <div className="text-lg font-semibold text-gray-900">
                                {test.detailedResults.phosphates} mg/L
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg border">
                              <div className="text-sm font-medium text-gray-700">Total Coliform</div>
                              <div className="text-lg font-semibold text-gray-900">
                                {test.detailedResults.coliform.toLocaleString()} CFU/100ml
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg border">
                              <div className="text-sm font-medium text-gray-700">E. coli</div>
                              <div className="text-lg font-semibold text-gray-900">
                                {test.detailedResults.ecoli.toLocaleString()} CFU/100ml
                              </div>
                            </div>
                          </div>
                        </div>
                        {test.detailedResults.notes && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Lab Notes</h4>
                            <div className="bg-white p-3 rounded-lg border">
                              <p className="text-sm text-gray-700">{test.detailedResults.notes}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm">
                            Download Report
                          </Button>
                          <Button variant="outline" size="sm">
                            Export Data
                          </Button>
                          <Button variant="outline" size="sm">
                            Schedule Retest
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
