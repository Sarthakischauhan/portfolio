import Image from 'next/image'
import React from 'react'
import { If } from 'react-if';

const ExperienceTile = ({ work }) => {
  return (
    <>
        <div className="tile w-full flex md:flex-row xl:flex-row flex-col gap-x-2 ">
          <div className="job-heading flex-1 flex flex-col gap-y-1">
            <div className="job-duration">
              <h6 className="text-[10px] timeline font-inter">{work.duration}</h6>
            </div>
            <div className="job-position font-inter font-medium cursor-pointer">
              <h3>
                {work.title}, <span>{work.company}</span>
              </h3>
            </div>
            <div className="job-description">
              <p className="font-inter text-[12px] opacity-90 tracking-widest font-regular leading-2">{work.roledesc}</p>
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
          <div className="flex-1 relative ">
              <Image
                src={work.image}
                alt="My internship experience image"
                className="object-cover"
                fill={true}
                priority
              />
            </div>

        </div>
    </>
  );
};

export default ExperienceTile;