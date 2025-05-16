
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    id: "future-of-agriculture",
    title: "Why KissanBazzar is the Future of Online Agriculture",
    description:
      "Discover how KissanBazzar empowers farmers and connects them directly to consumers, cutting out middlemen.",
  },
  {
    id: "digital-farmers",
    title: "How Farmers Are Going Digital With KissanBazzar",
    description:
      "Real-life stories of farmers using technology to sell online and boost income through our platform.",
  },
  // Add more...
];

const BlogList = () => {
  const navigate = useNavigate();

  const handleRedirect = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6">📰 Blogs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleRedirect(blog.id)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {blog.title}
            </h3>
            <p className="text-gray-600 text-sm">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
