
import { useParams } from "react-router-dom";

const blogContent = {
  "future-of-agriculture": {
    title: "Why KissanBazzar is the Future of Online Agriculture",
    content: `KissanBazzar is transforming how farmers reach consumers... [full content here]`,
  },
  "digital-farmers": {
    title: "How Farmers Are Going Digital With KissanBazzar",
    content: `With mobile access and simple seller dashboards, even small farmers...`,
  },
  // Add more blogs...
};

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogContent[id];

  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-6">{blog.title}</h1>
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>
    </div>
  );
};

export default BlogDetail;
