import React from 'react'

interface ButtonProps {
  content: string;
}

const FormButton:React.FC<ButtonProps> = ({ content }) => {
  return <button className='ml-4 bg-purple-700 rounded-full w-[290px] text-white py-2'>{ content }</button>
}

export default FormButton