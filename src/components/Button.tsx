"use client";
interface buttonProps {
  openModal: () => void;
  text:string;
}
const Button = ({ openModal, text }: buttonProps) => {
  return (
    <button
      className="px-3 py-[6px] text-white text-base hover:bg-blue-300 bg-blue-400 rounded-md"
      onClick={openModal}>
      {text}
    </button>
  );
};

export default Button;
