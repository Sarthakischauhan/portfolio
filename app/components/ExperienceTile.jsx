import Image from 'next/image'
import React from 'react'

const ExperienceTile = ({ work }) => {
  return (
    <>
        <div className="tile w-full flex">
          <div className="job-heading flex-1 flex flex-col gap-y-1">
            <div className="job-duration">
              <h6 className="text-[10px] font-inter">{work.duration}</h6>
            </div>
            <div className="job-position font-inter hover:text-hyperlink cursor-pointer">
              <h3>
                {work.title}, <span>{work.company}</span>
              </h3>
            </div>
            <div className="job-description">
              <p className="font-mono text-xs tracking-wide">{work.roledesc}</p>
            </div>
            <div className="skills">
              <ul className="mt-2 flex flex-wrap">
                {work.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-black mr-1.5 mt-2"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1 relative">
            <Image
              src={work.image}
              alt="My internship experience image"
              className="object-cover"
              fill={true}
            />
          </div>
        </div>
    </>
  );
};

export default ExperienceTile;