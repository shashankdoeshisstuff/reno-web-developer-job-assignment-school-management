'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Loader2, 
  CheckCircle, 
  Upload, 
  Building,
  Mail,
  MapPin,
  Phone,
  School
} from 'lucide-react'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  contact: z.string()
    .min(10, 'Contact must be at least 10 digits')
    .regex(/^\d+$/, 'Contact must contain only numbers'),
  email_id: z.string().email('Please enter a valid email address'),
})

type FormData = z.infer<typeof formSchema>

export default function AddSchoolPage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('school-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('school-images')
        .getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      let imageUrl = null
      
      if (imageFile) {
        setUploadProgress(50)
        imageUrl = await uploadImage(imageFile)
        setUploadProgress(100)
      }

      const { error } = await supabase
        .from('schools')
        .insert([{
          ...data,
          image_url: imageUrl,
        }])

      if (error) throw error

      setIsSuccess(true)
      reset()
      setImageFile(null)
      
      setTimeout(() => {
        setIsSuccess(false)
        setUploadProgress(0)
      }, 3000)

    } catch (error) {
      console.error('Error adding school:', error)
      alert('Error adding school. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container min-h-screen py-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl">
              Add New School
            </CardTitle>
            <CardDescription>
              Fill in the details below to add a new school to the system
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSuccess && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  School added successfully!
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">School Image</Label>
                <div className="flex flex-col items-center">
                  <label 
                    htmlFor="image" 
                    className="group relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary hover:bg-muted"
                  >
                    {imageFile ? (
                      <div className="text-center">
                        <Upload className="mx-auto mb-2 h-8 w-8 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          {imageFile.name}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload image
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports: JPG, PNG, GIF
                        </p>
                      </div>
                    )}
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Uploading: {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* School Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    School Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      {...register('name')}
                      className={cn(
                        "pl-10",
                        errors.name && "border-destructive"
                      )}
                      placeholder="Enter school name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email_id">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email_id"
                      type="email"
                      {...register('email_id')}
                      className={cn(
                        "pl-10",
                        errors.email_id && "border-destructive"
                      )}
                      placeholder="school@example.com"
                    />
                  </div>
                  {errors.email_id && (
                    <p className="text-xs text-destructive">
                      {errors.email_id.message}
                    </p>
                  )}
                </div>

                {/* Address (Full width) */}
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="address"
                      {...register('address')}
                      className={cn(
                        "pl-10",
                        errors.address && "border-destructive"
                      )}
                      placeholder="Enter full address"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-xs text-destructive">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="city"
                      {...register('city')}
                      className={cn(
                        "pl-10",
                        errors.city && "border-destructive"
                      )}
                      placeholder="Enter city"
                    />
                  </div>
                  {errors.city && (
                    <p className="text-xs text-destructive">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="state">
                    State <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="state"
                    {...register('state')}
                    className={errors.state && "border-destructive"}
                    placeholder="Enter state"
                  />
                  {errors.state && (
                    <p className="text-xs text-destructive">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* Contact */}
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="contact">
                    Contact Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="contact"
                      {...register('contact')}
                      className={cn(
                        "pl-10",
                        errors.contact && "border-destructive"
                      )}
                      placeholder="Enter contact number"
                    />
                  </div>
                  {errors.contact && (
                    <p className="text-xs text-destructive">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-2"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding School...
                  </>
                ) : (
                  'Add School'
                )}
              </Button>

              {/* Form Note */}
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                  <span className="text-destructive">*</span> Required fields. 
                  All data is securely stored in Supabase database with image storage.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}