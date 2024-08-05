import React from 'react'
import { CalendarDaysIcon, CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/outline';
import { Job } from '@/types/types';

interface SideProps {
    job: Job;
}

const categoryColors: { [key: string]: string } = {
  'Marketing': 'bg-orange-100 text-orange-500',
  'Design': 'bg-green-100 text-green-500',
  'IT': 'bg-purple-100 text-purple-500',
  'Development': 'bg-blue-100 text-blue-500',
  'Art': 'bg-red-100 text-red-800',
  'Data Science': 'bg-yellow-100 text-yellow-500',
  'Analytics': 'bg-green-100 text-green-500',
  'Customer Service': 'bg-gray-100 text-gray-500',
  'Support': 'bg-pink-100 text-pink-500'
};

const SideDescription:React.FC<SideProps> = ({job}) => {
    const { about } = job


  return (
    <div className='p-1 w-[25%]'>
      <h1 className='text-2xl font-extrabold mb-5'>About</h1>

      <div className='posted flex mb-7'>
        <CalendarDaysIcon className='rounded-full mr-4 border-gray-100  w-12 h-12 text-sky-500 border-2 p-1'/>
        <div>
        <p>Posted on:</p>
        <p className='font-bold'>{about.posted_on}</p>
        </div>
      </div>

      <div className="deadline flex mb-7">
          <FireIcon className='rounded-full mr-4 border-gray-100  w-12 h-12 text-sky-500 border-2 p-1'/>
            <div>
              <p>Deadline: </p>
              <p className='font-bold'>{about.deadline}</p>
            </div>
      </div>

      <div className="location flex mb-7">
        <MapPinIcon className='rounded-full mr-4 border-gray-100  w-12 h-12 text-sky-500 border-2 p-1'/>
        <div>
          <p>Location:</p>
          <p className='font-bold'>{about.location}</p>
        </div>
      </div>

      <div className="start flex mb-7">
        <CalendarIcon className='rounded-full mr-4 border-gray-100  w-12 h-12 text-sky-500 border-2 p-1'/>
        <div>
          <p>Start date:</p>
          <p className='font-bold'>{about.start_date}</p>
        </div>
      </div>

      <div className="end flex mb-7">
        <CalendarDaysIcon className='rounded-full mr-4 border-gray-100  w-12 h-12 text-sky-500 border-2 p-1'/>
        <div>
          <p>End date:</p>
          <p className='font-bold'>{about.end_date}</p>
        </div>

      </div>
      
      <hr className='mb-5'/>

      <div className="categories">
        <h1 className='text-2xl font-extrabold mb-5'>Categories</h1>
        <div className='flex flex-wrap gap-2 mb-6'>
          {about.categories.map((category, index) => (
            <span key={index} className={`text-sm p-2 font-bold rounded-full ${categoryColors[category]} || 'text-gray-600 bg-gray-200'`}>
              { category }
            </span>
          ))}
        </div>
      </div>

      <hr className='mb-5'/>

      <div className="requiredSkill">
        <h1 className='text-2xl font-extrabold mb-5'>Required Skills</h1>
        <div className='flex flex-wrap gap-2 mb-6'>
          {about.required_skills.map((skill, index) => (
            <span key={index} className='text-purple-800 bg-purple-100 rounded-full p-2'>{skill}</span>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SideDescription