interface CardProps {
  title: string;
  message: string;
  buttonText?: string;
  onRestart?: () => void;
}

const Card = ({ title, message, onRestart, buttonText }: CardProps) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center">
      <div className="bg-[#1e2230] rounded-lg p-8 shadow-lg border border-[#2a2f3a]">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        <button
          onClick={() => onRestart?.()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
