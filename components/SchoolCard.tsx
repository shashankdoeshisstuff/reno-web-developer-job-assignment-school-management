'use client'

import { School } from '@/types'
import { MapPin, Building } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SchoolCardProps {
  school: School
}

export default function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:border-primary hover:shadow-md">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {school.image_url ? (
          <img
            src={school.image_url}
            alt={school.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary/5">
            <Building className="h-12 w-12 text-primary/30" />
          </div>
        )}
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-1 text-lg font-semibold">
          {school.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {school.address}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <Badge variant="secondary" className="gap-1">
            {school.city}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {school.state}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}