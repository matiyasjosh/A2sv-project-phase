import React from 'react'
import { Job } from '@/types/types'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/16/solid'

interface localProp {
  job: Job
}

const MainDescription: React.FC<localProp> = ({job}) => {
    const {description, responsibilities, ideal_candidate, when_where } = job;

    const desieredAge = ideal_candidate.age.toLowerCase() === 'any' ? "No age preference" : ideal_candidate.age;
    const desieredSex = ideal_candidate.gender.toLowerCase() === 'any' ? "No gender preference" : ideal_candidate.gender;

  return (
    <div className="container w-2/3 m-4 mt-14 mr-14 pr-5">
        <div className='mb-5'>
            <h1 className='text-2xl font-extrabold mb-5'>Description</h1>
            <p className='text-[17px] font-sans text-gray-700'>{description}</p>
        </div>

        <div className='mb-8'>
            <h1 className='text-2xl font-extrabold mb-5'>Responsiblites</h1>
            <ul>
                {responsibilities.map((responsiblity, index) => (
                    <li key={index} className='flex mb-2 text-[17px] font-sans text-gray-700'>
                        <CheckCircleIcon className='h-6 w-6 text-green-300 mr-2'/> { responsiblity }
                    </li>
                ))}
            </ul>
        </div>
        
        <div className='mb-8'>
            <h1 className='text-2xl font-extrabold mb-3'>Ideal Candidate</h1>
            <ul className='ml-7 text-[17px] font-sans'>
                <li className='list-disc mb-1'><strong>Age: </strong> <span className='text-gray-700'>{ desieredAge }</span></li>
                <li className='list-disc mb-1'><strong>Gender: </strong> <span className='text-gray-700'>{ desieredSex }</span>{ desieredSex }</li>
                {ideal_candidate.traits.map((trait, index) => (
                    <li key={index} className='mb-1 list-disc'>
                        <strong>{trait.split(": ")[0]}</strong>: <span className='text-gray-700'>{trait.split(": ")[1]}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <h1 className='text-2xl font-extrabold mb-5'>When & Where</h1>
            <div className='flex'>
            <MapPinIcon className="rounded-full border-gray-100 h-10 w-10 text-sky-400 border-4 p-1 mr-2" />
            <p className='text-gray-700 mt-2'>{ when_where }</p>
            </div>
        </div>

    </div>
  )
}

export default MainDescription