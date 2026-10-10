import Image from "next/image";

const CaptionImage = ({ src, alt, caption, priority}) => {
  return (
    <div className="w-full cursor-pointer">
      <div className="h-[20rem] w-full relative overflow-hidden rounded-md bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          priority={!!priority}
          sizes="(max-width: 30rem) 100vw, 30rem"
          className="h-full w-full object-cover"
        />
        {caption ? (
          <div className="absolute bottom-1 rounded-md bg-black/50 px-2 py-1 text-xs text-white/80">
            {caption}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CaptionImage;
