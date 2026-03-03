import React from 'react'
import Header from '@/components/public/header'


const ClientPage = () => {
  return (
    <main>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Welcome to the Protected Client Page!</h1>
        </div>
    </main>
  )
}

export default ClientPage