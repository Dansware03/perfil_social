import React, { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { Post } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: 'Usuario de Ejemplo',
    description: 'Esta es una descripción de ejemplo. Edítame!',
    profileImage: 'https://source.unsplash.com/random/150x150/?portrait'
  });

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const updateUserInfo = (info: typeof userInfo) => {
    setUserInfo(info);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileHeader userInfo={userInfo} onUpdateUserInfo={updateUserInfo} />
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <PostForm onAddPost={addPost} />
        <PostList posts={posts} onUpdatePost={updatePost} />
      </div>
    </div>
  );
}

export default App;