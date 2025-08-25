import React from 'react'

const ExperienceTile = ({ work }) => {
  return (
    <div className="tile w-full mb-6">
      {/* Main experience header */}
      <div className="flex items-stretch gap-4 mb-4">
        {/* Company info and duration */}
        <div className="flex-1 flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-white text-xs font-inter opacity-70">{work.duration}</p>
            <h3 className="text-white text-md font-medium font-inter">
              {work.company}
            </h3>
            <p className="text-white text-sm font-inter opacity-90">
              {work.title}
            </p>
          </div>
        </div>
        {/* Right-side logo */}
        <div className="flex-shrink-0 flex items-center">
          <div className="w-10 h-10 md:w-10 md:h-10">
            <img
              src={work.image}
              alt={`${work.company} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* What you actually did */}
      <div className="">
        <div className="job-description mb-4">
          <p className="font-inter text-sm opacity-80 leading-relaxed">
            {/* {work.roledesc} */}
            - Designed an internal chatbot to help developers working with design system library questions
            <br/>
            - Deployed fastapi based service on kubernetes cluster achieving 99.9% uptime
          </p>
        </div>
        
        {/* Skills */}
        <div className="skills">
          <ul className="flex flex-wrap gap-2">
            {work.skills.map((skill, index) => (
              <li
                key={index}
                className="flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-black"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTile;