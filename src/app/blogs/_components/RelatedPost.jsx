import Author from "./Author";
import CoverImage from "./CoverImage";

function RelatedPost({ posts }) {
  return (
    <div className=" mb-10">
      <p className="text-xl mb-4">پست های مرتبط</p>
      <div className="grid gap-6 grid-cols-6">
        {posts.map((post) => {
          return (
            <div
              key={post._id}
              className="col-span-6 md:col-span-3 lg:col-span-2"
            >
              <CoverImage post={post} />
              <div className="flex items-center justify-between">
                <p>{post.title}</p>
                <Author post={post?.author} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default RelatedPost;
