'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { School } from '@/types'
import SchoolCard from '@/components/SchoolCard'
import { Search, Filter, Loader2, School as SchoolIcon, MapPin, Building, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [filteredSchools, setFilteredSchools] = useState<School[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('all')

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setSchools(data || [])
      setFilteredSchools(data || [])
    } catch (error) {
      console.error('Error fetching schools:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let results = schools

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(school =>
        school.name.toLowerCase().includes(term) ||
        school.city.toLowerCase().includes(term) ||
        school.address.toLowerCase().includes(term)
      )
    }

    if (selectedCity && selectedCity !== 'all') {
      results = results.filter(school =>
        school.city.toLowerCase() === selectedCity.toLowerCase()
      )
    }

    setFilteredSchools(results)
  }, [searchTerm, selectedCity, schools])

  const cities = Array.from(new Set(schools.map(school => school.city)))

  if (isLoading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading schools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
              Browse Schools
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              Explore our collection of educational institutions
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, city, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-48">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="All Cities" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCity('all')
              }}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Info */}
      <div className="mb-6">
        <Card className="border-none shadow-none">
          <CardContent className="p-4">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold">Search Results</h3>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredSchools.length} of {schools.length} schools
                </p>
              </div>
              
              {schools.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <SchoolIcon className="h-3 w-3" />
                    {schools.length} Total
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {cities.length} Cities
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Image className="h-3 w-3" />
                    {schools.filter(s => s.image_url).length} With Images
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schools Grid */}
      {filteredSchools.length === 0 ? (
        <Alert className="border-muted bg-muted/50">
          <SchoolIcon className="h-5 w-5" />
          <AlertTitle>No schools found</AlertTitle>
          <AlertDescription>
            Try adjusting your search or filter to find what you're looking for.
            {(searchTerm || selectedCity !== 'all') ? (
              <Button
                variant="link"
                className="ml-1 p-0 h-auto"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCity('all')
                }}
              >
                Clear all filters
              </Button>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>

          {/* Stats Section */}
          <Separator className="my-8" />
          
          <div className="rounded-lg border bg-muted/50 p-6">
            <h3 className="mb-4 text-lg font-semibold">Statistics</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card className="border-none shadow-none">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="mb-2 rounded-lg bg-primary/10 p-2">
                    <SchoolIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{schools.length}</div>
                  <div className="text-sm text-muted-foreground">Total Schools</div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-none">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="mb-2 rounded-lg bg-primary/10 p-2">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{cities.length}</div>
                  <div className="text-sm text-muted-foreground">Cities</div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-none">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="mb-2 rounded-lg bg-primary/10 p-2">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">
                    {new Set(schools.map(s => s.state)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">States</div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-none">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="mb-2 rounded-lg bg-primary/10 p-2">
                    <Image className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">
                    {schools.filter(s => s.image_url).length}
                  </div>
                  <div className="text-sm text-muted-foreground">With Images</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Help Text */}
      {schools.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            All data is fetched from Supabase database in real-time
          </p>
          <p className="text-xs text-muted-foreground">
            • Page 2 of assignment: E-commerce style school listing
          </p>
        </div>
      )}
    </div>
  )
}