export type Reaction = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export interface Comment {
  id: number;
  content: string;
  date: string;
}

export interface Post {
  id: number;
  content: string;
  image: string | null;
  date: string;
  reactions: Record<Reaction, number>;
  comments: Comment[];
}