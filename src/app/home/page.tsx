import React from 'react'
import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import HomeContent from '@/components/public/home-content'
import AboutSection from '@/components/public/about-section'
import ProgramsSection from '@/components/public/programs-section'
import ContactSection from '@/components/public/contact-section'

const HomePage = () => {
  return (
    <main>
        <Header />
          <HomeContent />
          <AboutSection />
          <ProgramsSection />
          <ContactSection />
        <Footer />
    </main>
  )
}

export default HomePage