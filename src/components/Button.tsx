interface ButtonProps {
  onClick: () => void;
  bgcolor: string;
  content: string;
}

export default function Button({ onClick, bgcolor, content }: ButtonProps) {
  const backgroundColor: string = bgcolor; //to ensure Tailwind renders the css-class
  return (
    <button
      className={`${backgroundColor} -500/40 m-1 cursor-pointer rounded-2xl border-2 border-white p-3 text-white text-shadow-md hover:brightness-110 active:shadow-inner active:shadow-gray-500/70`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
