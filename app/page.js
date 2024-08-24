import ImageShot from "./components/ImageShot/ImageShot";
import Introduction from "./components/Introduction/Introduction";

export default function Home() {
  return (
    <>
      <div className="max-w-[50rem] mx-auto md:mt-[100px] flex flex-col">
        {/* Image will actually be  */}
        <ImageShot />
        <Introduction />
      </div>
    </>
  );
}
