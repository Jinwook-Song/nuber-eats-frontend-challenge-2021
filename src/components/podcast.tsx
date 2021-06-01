import { Link } from "react-router-dom";

interface IPodcastProps {
  id: string;
  title: string;
  category: string;
  rating: number;
}

export const Podcast: React.FC<IPodcastProps> = ({
  id,
  title,
  category,
  rating,
}) => (
  <Link to={`/podcasts/${id}`}>
    <div className="flex flex-col bg-yellow-500 opacity-30 hover:opacity-100">
      <div className="mb-3 py-28 text-2xl">{title}</div>
      <h3 className="text-xl">{category}</h3>
      <span className="border-t mt-2 py-2 text-xs opacity-90 border-gray-400">
        {rating}
      </span>
    </div>
  </Link>
);
