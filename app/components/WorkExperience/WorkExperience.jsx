import React from 'react'
import ExperienceTile from '../ExperienceTile/ExperienceTile'

const WorkExperience = () => {
  return (
    <>
        <div className="work-exp space-y-3 mt-12">
            <h1 className='text-3xl font-inter font-semibold'>Work Experience</h1>

            <ExperienceTile />
            
            <ExperienceTile />
        </div>
    </>
  )
}

export default WorkExperience