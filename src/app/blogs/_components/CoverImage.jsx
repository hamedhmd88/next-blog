import Image from "next/image";
import Link from "next/link";

function CoverImage({ post }) {
  return (
    <>
      <div className=" relative aspect-video overflow-hidden rounded-md mb-6">
        <Link href={`/blogs/${post.slug}`}>
          <Image
            src={post.coverImageUrl}
            fill
            alt={post.title}
            quality={80}
            className=" object-cover hover:scale-110 transition-all duration-300 ease-out"
          />
        </Link>
      </div>
    </>
  );
}

export default CoverImage;
