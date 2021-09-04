import Toggleable from "./Toggleable";




const Blog = ({ blog, blogUpdate, deleteBlog }) => {
  const likeHandler = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    blogUpdate(blog.id, updatedBlog);
  };

  const deleteHandler = () => {
    deleteBlog(blog.id)
  }

  return (
    <div
      style={{
        border: "1px solid black",
        width: "250px",
        marginBottom: "10px",
        borderRadius: "5px",
        padding: "5px",

      }}
    >
      <div>
        <strong>{blog.title} </strong>
        by
        <strong> {blog.author}</strong>
      </div>
      <Toggleable buttonLabel="View" cancelButtonLabel="Hide">
        <p>Url:{blog.url}</p>
        <p>
          {blog.likes === 1 ? `${blog.likes} like` : `${blog.likes} likes`}
          <button onClick={likeHandler}>Like</button>
        </p>
        <p>User: {blog.user.username}</p>
        <button onClick={deleteHandler}>Delete</button>
      </Toggleable>
    </div>
  );
};
export default Blog;