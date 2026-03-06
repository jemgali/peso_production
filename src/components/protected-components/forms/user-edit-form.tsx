'use client'

import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface UserEditFormProps {
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const UserEditForm = ({ userId, onSuccess, onCancel }: UserEditFormProps) => {
  const [isFetching, setIsFetching] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    user_first_name: '',
    user_middle_name: '',
    user_last_name: '',
    user_suffix: '',
    user_email: '',
    user_role: 'client'
  })

  // Fetch the existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsFetching(true)
      try {
        // TODO: Replace with your actual Supabase fetch logic
        // Example: const { data, error } = await supabase.from('users').select('*').eq('user_id', userId).single()
        console.log(`Fetching data for user: ${userId}`)
        
        // Simulating an API response delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Simulated existing data
        const fetchedData = {
          user_first_name: 'Juan',
          user_last_name: 'Dela Cruz',
          user_middle_name: 'Perez',
          user_suffix: '',
          user_email: 'juan@example.com',
          user_role: 'client'
        }
        
        setFormData(fetchedData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsFetching(false)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
        // TODO: Implement your server action or API call to update the database
        // Example: await supabase.from('users').update(formData).eq('user_id', userId)
        console.log("Updating user payload:", formData)
        
        if (onSuccess) {
            onSuccess() // Callback to close modal or refresh table
        }
    } catch (error) {
        console.error("Error updating user:", error)
    } finally {
        setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
        <Card className="w-full max-w-2xl p-8 flex justify-center items-center">
            <p className="text-muted-foreground animate-pulse">Loading user data...</p>
        </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle>Edit User Profile</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="user_first_name">First Name</Label>
                        <Input 
                            id="user_first_name" 
                            name="user_first_name" 
                            placeholder="Juan" 
                            value={formData.user_first_name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="user_last_name">Last Name</Label>
                        <Input 
                            id="user_last_name" 
                            name="user_last_name" 
                            placeholder="Dela Cruz" 
                            value={formData.user_last_name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="user_middle_name">Middle Name (Optional)</Label>
                        <Input 
                            id="user_middle_name" 
                            name="user_middle_name" 
                            value={formData.user_middle_name} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="user_suffix">Suffix (Optional)</Label>
                        <Input 
                            id="user_suffix" 
                            name="user_suffix" 
                            placeholder="e.g. Jr, Sr, III" 
                            value={formData.user_suffix} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                {/* Account Fields */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="user_email">Email Address</Label>
                    <Input 
                        id="user_email" 
                        type="email" 
                        name="user_email" 
                        placeholder="juan@example.com" 
                        value={formData.user_email} 
                        onChange={handleChange} 
                        required 
                        disabled // Typically, emails are disabled during standard edits in Supabase due to Auth syncing
                    />
                    <p className="text-xs text-muted-foreground">Email addresses cannot be changed here.</p>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="user_role">Role</Label>
                    <select
                        id="user_role"
                        name="user_role"
                        value={formData.user_role}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                    >
                        <option value="client">Client</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={isLoading || isFetching}>
                    {isLoading ? "Saving changes..." : "Save Changes"}
                </Button>
            </CardFooter>
        </form>
    </Card>
  )
}

export default UserEditForm