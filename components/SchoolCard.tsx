import { School } from '@/types'
import { MapPin, Building } from 'lucide-react'
import Image from 'next/image'

interface SchoolCardProps {
  school: School
}

export default function SchoolCard({ school }: SchoolCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {school.image_url ? (
          // Temporary fix using regular img tag
          <img
            src={school.image_url}
            alt={school.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-indigo-100">
            <Building className="h-16 w-16 text-blue-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {school.name}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-gray-600 text-sm line-clamp-2">
              {school.address}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {school.city}
            </span>
            <span className="text-sm text-gray-500">
              {school.state}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}