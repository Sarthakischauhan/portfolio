import React from 'react'
import Image from 'next/image'
const ImageShot = () => {
    const IMAGE_SRC = "https://images.unsplash.com/photo-1493106819501-66d381c466f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    return (
        <Image
        src='/D.png'
        height={150}
        width={150}
        alt="Dummy Image"
        className="rounded-full aspect-square object-cover"
        />
    )

}

export default ImageShot;