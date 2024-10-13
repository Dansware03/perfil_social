import React, { useState } from 'react';
import { ThumbsUp, Heart, Smile, AlertCircle, Frown, Angry, MessageCircle, Edit2 } from 'lucide-react';
import { Post, Reaction } from '../types';

interface PostItemProps {
  post: Post;
  onUpdatePost: (post: Post) => void;
}

const reactionIcons: Record<Reaction, React.ReactNode> = {
  like: <ThumbsUp size={16} />,
  love: <Heart size={16} />,
  haha: <Smile size={16} />,
  wow: <AlertCircle size={16} />,
  sad: <Frown size={16} />,
  angry: <Angry size={16} />
};

const PostItem: React.FC<PostItemProps> = ({ post, onUpdatePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleReaction = (reaction: Reaction) => {
    const updatedPost = {
      ...post,
      reactions: {
        ...post.reactions,
        [reaction]: post.reactions[reaction] + 1
      }
    };
    onUpdatePost(updatedPost);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onUpdatePost({ ...post, content: editedContent });
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedPost = {
        ...post,
        comments: [...post.comments, { id: Date.now(), content: newComment, date: new Date().toISOString() }]
      };
      onUpdatePost(updatedPost);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{new Date(post.date).toLocaleString()}</span>
        <button onClick={handleEdit} className="text-blue-500 hover:text-blue-600">
          <Edit2 size={16} />
        </button>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows={3}
          />
          <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
            Guardar
          </button>
        </div>
      ) : (
        <p className="mb-2">{post.content}</p>
      )}
      {post.image && (
        <img src={post.image} alt="Post" className="w-full h-auto rounded mb-2" />
      )}
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-2">
          {Object.entries(reactionIcons).map(([reaction, icon]) => (
            <button
              key={reaction}
              onClick={() => handleReaction(reaction as Reaction)}
              className="text-gray-500 hover:text-blue-500"
            >
              {icon}
              <span className="ml-1">{post.reactions[reaction as Reaction]}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-gray-500 hover:text-blue-500 flex items-center"
        >
          <MessageCircle size={16} />
          <span className="ml-1">{post.comments.length} comentarios</span>
        </button>
      </div>
      {showComments && (
        <div className="mt-2">
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 p-2 rounded mb-2">
              <p>{comment.content}</p>
              <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex mt-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-grow p-2 border rounded-l"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Comentar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;