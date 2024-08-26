import React from 'react'

const Introduction = () => {
  return (
    <>
        <div className='intro'>
            <h1 className='text-3xl mt-[24px] font-inter font-semibold'>Hey, I'm Sarthak 👋🏼</h1>
            <div className='para-class tracking-wide font-medium'>
                <p className='text-l w-70 font-mono mt-[16px]' id='self-intro'>
                    I am a third-year computer science student who loves writing software from scratch and publish it on the web. Do love product as well
                </p>
                <p className='text-l w-70 font-mono mt-[24px]' id='work-intro'>
                    Currently exploring computer vision and working on <a href="/" className='underline hover:text-hyperlink'>spartan navigate app</a>
                </p>
            </div>
        </div>
    </>


  )
}

export default Introduction