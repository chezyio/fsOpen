import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const [toggle, setToggle] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationStyle, setNotificationStyle] = useState("notification");


  const [loginVisible, setLoginVisible] = useState(false)

  const [updatedBlogs, setUpdatedBlogs] = useState(false);

  const blogFormRef = useRef();


  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
    )
  }, [])

  useEffect(() => {
    updatedBlogs &&
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
        console.log("Blog was updated");
      });
    setUpdatedBlogs(false);
  }, [updatedBlogs]);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    if (
      blogObject.title !== "" &&
      blogObject.author !== "" &&
      blogObject.url !== ""
    ) {
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      });
      setNotificationStyle("notification");
      setNotificationText(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(false);
      }, 5000);
    } else {
      setNotificationStyle("warning");
      setNotificationText("You must fill all fields in order to add a blog to the list");
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(false);
      }, 5000);
    }
  };


  const loginForm = () => {

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <h2>Log in to application</h2>

        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>


      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    document.location.reload();

  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err);
    }

    console.log('Logging in with', username, password);
  }


  const blogForm = () => (
    <Toggleable
      buttonLabel="New blog"
      cancelButtonLabel="Cancel"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  );


  const blogUpdate = async (blogId, blogObject) => {
    await blogService.update(blogId, blogObject);

    const updatedBlog = { ...blogObject, blogId };

    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  const deleteBlog = async (blogId) => {
    await blogService.remove(blogId);

  }

  return (
    <div>
      <h1>Blogs</h1>
      {user && (
        <div className="log">
          {user.username} is logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {toggle && (
        <Notification text={notificationText} style={notificationStyle} />
      )}
      {user === null ? (
        loginForm()
      ) : (
        <>
          {blogForm()}
          <div>
            {blogs
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} blogUpdate={blogUpdate} deleteBlog={deleteBlog} />
              ))
              // .sort((a, b) => { return b - a })

            }
          </div>
        </>
      )}
    </div>
  )
}




export default App