import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Blog Post 1',
      date: 'January 1, 2024',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in libero ac turpis fermentum mattis. Duis auctor, ligula quis tincidunt efficitur, sapien lorem tempor magna, sit amet fermentum est neque at felis.',
    },
    // Add more blog posts as needed
  ];

  return (
    <div>
      <header>
        <h1>My Blog</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="blog-posts">
          {blogPosts.map((post) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>Published on {post.date}</p>
              <p>{post.content}</p>
              <Link to={`/blog/${post.id}`}>Read More</Link>
            </article>
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BlogPage;
