import Image from 'next/image'
import React from 'react'

const ExperienceTile = () => {
  const skills = ['React','Javascript','PHP','Docker','Typescript','Redis']  
  return (
    <div className="tile w-full flex">
        <div className='job-heading flex-1 flex flex-col gap-y-1'>
            <div className='job-duration'>
                <h6 className='text-[10px] font-inter'>May 2024 - August 2024</h6>
            </div>
            <div className='job-position font-inter hover:text-hyperlink'>
                <h3>Software Engineering Intern, <span>Tesla</span></h3>
            </div>
            <div className='job-description'>
                <p className='font-mono text-xs'>Build and maintained key features for Tesla's internal application for vehicle insurance. Worked closely with cross-functional teams including developers, designers and product managers to ship end to end digital products.</p>
            </div>
            <div className='skils'>
                <ul className='mt-2 flex flex-wrap'>
                    {skills.map((skill) => {
                        return (
                            <li className='flex items-center rounded-full bg-white
                            px-3 py-1 text-xs font-medium leading-5 text-black mr-1.5 mt-2'>
                               {skill}
                           </li>
                        )
                    })}

                </ul>
            </div>
        </div>
        <div className='flex-1'>
            <img
                src='/tesla.png'
                alt="Dummy Image"
                className="object-cover w-full h-[211px]"
            />
        </div>

    </div>
  )
}

export default ExperienceTile