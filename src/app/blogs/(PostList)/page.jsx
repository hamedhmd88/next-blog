import React, { Suspense } from "react";
import PostList from "../_components/PostList";
import Spinner from "@/ui/Spinner";

function BlogPage() {
  return (
    <div>
      <h1 className=" text-lg font-bold mb-4 text-secondary-500">
        لیست پست ها{" "}
      </h1>
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
}

export default BlogPage;
