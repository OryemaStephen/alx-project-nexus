import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ title, className, type = "button", action }) => {
  return (
    <button onClick={action} type={type} className={`${className} px-8 py-2 border-2 border-[#A9DEF9] bg-[#A9DEF9] rounded-full hover:bg-[#A9DEF9] text-black transition-colors duration-300`}>
      {title}
    </button>
  )
}

export default Button;