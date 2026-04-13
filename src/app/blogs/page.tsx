import BlogSection from '@/components/sections/blog/BlogSection'
import BlogsList from '@/components/sections/blog/BlogsList'
import NewsletterSection from '@/components/sections/blog/NewsLetterSection'
import React from 'react'

function page() {
  return (
    <div>
      <BlogSection/>
      <BlogsList/>
      <NewsletterSection/>
    </div>
  )
}

export default page
