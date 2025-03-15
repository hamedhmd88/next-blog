import Spinner from '@/ui/Spinner'
import React from 'react'

function loading() {
  return (
    <div className=' grid items-center justify-center gap-x-4'>
        <span className=' text-lg text-secondary-500'>در حال بارگذاری پست </span>
      <Spinner/>
    </div>
  )
}

export default loading
