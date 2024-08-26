import ImageShot from "./components/ImageShot/ImageShot";
import Introduction from "./components/Introduction/Introduction";
import WorkExperience from "./components/WorkExperience/WorkExperience";

export default function Home() {
  return (
    <>
      <div className="max-w-[50rem] mx-auto md:mt-[100px] flex flex-col">
        {/* Image will actually be  */}
        <ImageShot />
        <Introduction />
        <WorkExperience />
      </div>
    </>
  );
}
