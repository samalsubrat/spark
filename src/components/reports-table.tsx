"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Calendar, Plus } from "lucide-react"

interface WaterbodyReport {
  id: string
  name: string
  reporter: {
    name: string
    email: string
    avatar?: string
  }
  date: string
  location: {
    name: string
    coordinates: string
  }
  photoUrl?: string
  description: string
  status: "new" | "reviewed" | "test-scheduled" | "completed"
}

const mockReports: WaterbodyReport[] = [
  {
    id: "WR-2024-001",
    name: "Lake Meridian",
    reporter: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
    },
    date: "2024-01-15",
    location: {
      name: "Lake Meridian Park",
      coordinates: "47.4502° N, 122.2015° W",
    },
    photoUrl: "/lake-with-algae.jpg",
    description: "Unusual green algae growth observed along the shoreline",
    status: "new",
  },
  {
    id: "WR-2024-002",
    name: "River Park Stream",
    reporter: {
      name: "Michael Chen",
      email: "m.chen@email.com",
    },
    date: "2024-01-14",
    location: {
      name: "River Park Recreation Area",
      coordinates: "47.4612° N, 122.1951° W",
    },
    photoUrl: "/stream-water.jpg",
    description: "Strong odor and discoloration noticed in stream water",
    status: "test-scheduled",
  },
  {
    id: "WR-2024-003",
    name: "Downtown Pond",
    reporter: {
      name: "Emily Rodriguez",
      email: "e.rodriguez@email.com",
    },
    date: "2024-01-13",
    location: {
      name: "Downtown City Park",
      coordinates: "47.4729° N, 122.2021° W",
    },
    photoUrl: "/city-pond.jpg",
    description: "Dead fish observed floating on surface",
    status: "reviewed",
  },
]

function getStatusColor(status: WaterbodyReport["status"]) {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "reviewed":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "test-scheduled":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function ReportsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [reports] = useState(mockReports)

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="rounded-xl border-0 shadow-sm bg-white">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Waterbody Reports</CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Waterbody</TableHead>
              <TableHead className="min-w-[180px]">Reporter</TableHead>
              <TableHead className="min-w-[100px]">Date</TableHead>
              <TableHead className="min-w-[200px]">Location</TableHead>
              <TableHead className="min-w-[80px]">Photo</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{report.name}</div>
                    <div className="text-sm text-gray-500">{report.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={report.reporter.avatar || "/placeholder.svg"} alt={report.reporter.name} />
                      <AvatarFallback className="text-xs">
                        {report.reporter.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{report.reporter.name}</div>
                      <div className="text-xs text-gray-500 truncate">{report.reporter.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="whitespace-nowrap">{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="truncate">{report.location.name}</div>
                      <div className="text-xs text-gray-500 truncate">{report.location.coordinates}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {report.photoUrl && (
                    <Avatar className="w-10 h-10 rounded-md flex-shrink-0">
                      <AvatarImage src={report.photoUrl || "/placeholder.svg"} alt="Report photo" />
                      <AvatarFallback>IMG</AvatarFallback>
                    </Avatar>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(report.status)}>{report.status.replace("-", " ")}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
