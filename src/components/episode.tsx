import { Link } from "react-router-dom";

interface IEpisodeProps {
  id: string;
  title: string;
  category: string;
}

export const Episode: React.FC<IEpisodeProps> = ({ id, title, category }) => (
  <div className="flex flex-col bg-yellow-500 opacity-30 hover:opacity-100">
    <div className="mb-3 py-28 text-2xl">{title}</div>
    <h3 className="text-xl">{category}</h3>
  </div>
);
