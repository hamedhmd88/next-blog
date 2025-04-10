import { ClockIcon } from "@heroicons/react/24/outline";

function Reading({post}) {
  return (
    <>
      <div className=" flex items-center text-[10px] text-secondary-500">
        <ClockIcon className=" w-4 h-4 stroke-secondary-500 ml-1" />
        <span className=" ml-1"> خواندن : </span>
        <span className=" ml-1 leading-3">{post.readingTime}</span>
        <span> دقیقه </span>
      </div>
    </>
  );
}

export default Reading;
