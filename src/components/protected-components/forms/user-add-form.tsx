'use client'

import React, { useState } from 'react'
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

const UserAddForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    user_first_name: '',
    user_middle_name: '',
    user_last_name: '',
    user_suffix: '',
    user_email: '',
    password: '',
    user_role: 'client'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
        // TODO: Implement your server action or API call here.
        // 1. Create user in Supabase auth (requires email & password)
        // 2. Insert the returned auth user ID and remaining form data into public.users
        console.log("Submitting payload:", formData)
    } catch (error) {
        console.error("Error adding user:", error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle>Add a User</CardTitle>
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
                    />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Temporary Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        minLength={6}
                    />
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
                    </select>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setFormData({...formData})}>
                    Reset
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Create User"}
                </Button>
            </CardFooter>
        </form>
    </Card>
  )
}

export default UserAddForm