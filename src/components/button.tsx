interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`py-3 px-5 text-indigo-50  text-lg rounded-lg focus:outline-none hover:opacity-90 ${
      canClick
        ? "bg-yellow-400 hover:bg-yellow-500"
        : "bg-gray-400 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
