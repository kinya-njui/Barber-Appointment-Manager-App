import React from 'react'
import './Feed.css' 
import { useQuery, useQueryClient } from 'react-query'
import {useNavigate, Link} from 'react-router-dom'
import apiUrl from '../../utils/apiUrl'
import {Toaster, toast} from "sonner"


function Feed() {
  const client = useQueryClient()
  const navigate = useNavigate()

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['writerFeed'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blogs/writer`, {credentials: "include"});

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading please wait!........</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  if (data && data.data.length === 0) {
    return (
      <>
        <div>No blog found for this writer</div>
        <Link to="/write">Create new blog</Link>
      </>
    );
  }

  return (
    <div>
      {data.data.map((blog) => (
        <div key={blog.id} className="feed-card">
          <h2>{blog.title}</h2>
          <p>{blog.synopsis}</p>
          <div className="writer-details">
            <div className="author-info">
              <p>{blog.user.username}</p>
              <p>Posted on {blog.createdAt}</p>
            </div>
            <div className="cta-buttons">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Feed;
