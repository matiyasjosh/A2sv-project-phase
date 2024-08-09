import React from 'react'
import { Job } from '@/types/types'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/16/solid'

interface MainComponentProps {
    description: string;
    responsibilities: string;
    idealCandidate: string;
    whenWhere: string;
  }

const MainDescription: React.FC<MainComponentProps> = ({description, responsibilities, idealCandidate, whenWhere }) => {

    // const desieredAge = ideal_candidate.age.toLowerCase() === 'any' ? "No age preference" : ideal_candidate.age;
    // const desieredSex = ideal_candidate.gender.toLowerCase() === 'any' ? "No gender preference" : ideal_candidate.gender;
  return (
    <div className="container w-2/3 m-4 mt-14 mr-14 pr-5">
        <div className='mb-5'>
            <h1 className='text-2xl font-extrabold mb-5'>Description</h1>
            <p className='text-[16px] font-sans text-gray-700'>{description}</p>
        </div>

        <div className='mb-8'>
            <h1 className='text-2xl font-extrabold mb-5'>Responsiblites</h1>
            <ul className='mb-6'>
              {responsibilities.split('\n').map((responsibility, index) => (
                <li className='text-[16px] text-gray-700 flex items-center mb-2' key={index}>
                  <CheckCircleIcon className='h-6 w-6 text-green-500 mr-2' />
                  {responsibility}
                </li>
              ))}
            </ul>
        </div>
        
        <div className='mb-8'>
            <h1 className='text-2xl font-extrabold mb-3'>Ideal Candidate</h1>
            <ul className='mb-8 list-disc'>
              { idealCandidate.split(',').map((trait, index) =>(
                <li className='text-gray-700 text-[16px] list-disc flex ml-2 items-center mb-3' key={index}>
                  {trait}
                </li>
              )) }

            </ul>
        </div>

        <div>
            <h1 className='text-2xl font-extrabold mb-5'>When & Where</h1>
            <div className='flex'>
            <MapPinIcon className="rounded-full border-gray-100 h-10 w-10 text-sky-400 border-4 p-1 mr-2" />
            <p className='text-gray-700 mt-2 text-[16px]'>{ whenWhere }</p>
            </div>
        </div>

    </div>
  )
}

export default MainDescription