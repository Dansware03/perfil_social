import React from 'react';
import PostItem from './PostItem';
import { Post } from '../types';

interface PostListProps {
  posts: Post[];
  onUpdatePost: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onUpdatePost }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onUpdatePost={onUpdatePost} />
      ))}
    </div>
  );
};

export default PostList;