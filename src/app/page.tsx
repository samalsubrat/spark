'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Shield, BarChart3, Users, Globe, Phone } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Droplets className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">SPARK</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Water Quality Monitoring Made Simple
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Monitor, analyze, and manage water quality across multiple locations with real-time data, 
              intelligent alerts, and comprehensive reporting tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Monitoring
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Water Quality Management
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools for monitoring, testing, and reporting water quality data
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                  Real-time Analytics
                </CardTitle>
                <CardDescription>
                  Monitor water quality parameters in real-time with interactive dashboards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Live pH and turbidity monitoring</li>
                  <li>• Chemical contamination tracking</li>
                  <li>• Historical trend analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 text-green-600 mr-3" />
                  Smart Alerts
                </CardTitle>
                <CardDescription>
                  Intelligent notification system for water quality issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Automated quality alerts</li>
                  <li>• Emergency notifications</li>
                  <li>• Scheduled testing reminders</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 text-purple-600 mr-3" />
                  Role Management
                </CardTitle>
                <CardDescription>
                  Organize teams with role-based access control
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• ASHA worker access</li>
                  <li>• Community leader tools</li>
                  <li>• Admin oversight controls</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-6 w-6 text-cyan-600 mr-3" />
                  Multi-location Support
                </CardTitle>
                <CardDescription>
                  Manage water quality across multiple locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Geographic mapping</li>
                  <li>• Location-based reports</li>
                  <li>• Regional comparisons</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="h-6 w-6 text-blue-500 mr-3" />
                  Testing Integration
                </CardTitle>
                <CardDescription>
                  Seamless integration with testing equipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Digital test kit support</li>
                  <li>• Automated data entry</li>
                  <li>• Quality validation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-6 w-6 text-green-500 mr-3" />
                  Public Access
                </CardTitle>
                <CardDescription>
                  Keep communities informed about water quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Public status dashboard</li>
                  <li>• Community reporting</li>
                  <li>• Emergency contact system</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Monitoring Water Quality?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join communities already using SPARK to ensure safe, clean water for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Droplets className="h-6 w-6 text-blue-600 mr-2" />
              <span className="font-semibold text-gray-900">SPARK</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 SPARK. Water Quality Monitoring System.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
