'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { School } from '@/types'
import SchoolCard from '@/components/SchoolCard'
import { Search, Filter, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [filteredSchools, setFilteredSchools] = useState<School[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

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

    if (selectedCity) {
      results = results.filter(school =>
        school.city.toLowerCase() === selectedCity.toLowerCase()
      )
    }

    setFilteredSchools(results)
  }, [searchTerm, selectedCity, schools])

  const cities = Array.from(new Set(schools.map(school => school.city)))

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Discover Schools
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our extensive list of educational institutions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search schools by name, city, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCity('')
              }}
              variant="outline"
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-700">
            Showing <span className="font-bold">{filteredSchools.length}</span> of{' '}
            <span className="font-bold">{schools.length}</span> schools
          </p>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏫</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No schools found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCity('')
                }}
                className="px-6"
              >
                Clear all filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        )}

        {/* Stats */}
        {filteredSchools.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">{schools.length}</div>
                <div className="text-sm text-gray-600">Total Schools</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">{cities.length}</div>
                <div className="text-sm text-gray-600">Cities</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(schools.map(s => s.state)).size}
                </div>
                <div className="text-sm text-gray-600">States</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {schools.filter(s => s.image_url).length}
                </div>
                <div className="text-sm text-gray-600">With Images</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}