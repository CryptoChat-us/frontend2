
interface AuthButtonProps {
  text: string;
  className?: string;
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
}

export default function AuthButton({ text, className, onClick, disabled }: AuthButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`w-[546px] h-20 px-20 py-3 left-[51.47px] absolute bg-gradient-to-bl from-yellow-400 to-white rounded-lg outline outline-1 outline-offset-[-0.91px] outline-white inline-flex justify-center items-center gap-3 overflow-hidden cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <span className="text-zinc-950 text-xl font-['Sequel_Sans']">{text}</span>
    </div>
  );
}
