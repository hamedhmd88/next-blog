import Image from "next/image";

function Avatar({post, width = 24}) {
  return (
    <>
      <Image
        src={"/images/avatar.png"}
        width={width}
        height={width}
        alt="avatar"
        className=" rounded-full ring-1 ring-secondary-300 ml-2"
      />
    </>
  );
}

export default Avatar;
