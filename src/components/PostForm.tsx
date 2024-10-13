import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { Post } from '../types';

interface PostFormProps {
  onAddPost: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || image) {
      const newPost: Post = {
        id: Date.now(),
        content,
        image,
        date: new Date().toISOString(),
        reactions: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
        comments: []
      };
      onAddPost(newPost);
      setContent('');
      setImage(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué estás pensando?"
        className="w-full p-2 border rounded mb-2"
        rows={3}
      />
      {image && (
        <div className="mb-2">
          <img src={image} alt="Preview" className="max-w-full h-auto rounded" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <label className="cursor-pointer">
          <Image size={24} className="text-blue-500" />
          <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Publicar
        </button>
      </div>
    </form>
  );
};

export default PostForm;