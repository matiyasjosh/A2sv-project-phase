import React from "react";
import { Job } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface CardProp {
  job: Job;
}

type SectionColors = {
  [key: string]: string;
};

const Card: React.FC<CardProp> = ({ job }) => {
  const { id, title, description, company, image, about } = job;

  const reducedDescription =
    description.length > 250 ? description.slice(0, 250) + "..." : description;

  const sectionColors: SectionColors = {
    "In person": "text-green-500 bg-green-100",
    "Education": "text-orange-500 bg-orange-100",
    "IT": "text-purple-500 border border-purple-500",
  };

  return (
    <div className=" flex mx-6 mb-9 space-x-6 p-6 border rounded-2xl shadow-sm">
      <div className="logo mb-4">
        <Image
         src={ image }
         alt={`${company} logo`}
         width={150}
         height={150}
         className="rounded-full"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">{ title } </h2>
        <div className="flex space-x-6 mb-2">
            <span className="text-gray-400 text-sm">{company}</span>
            <span className="text-gray-400 text-sm text-center item-center">.</span>
            <span className="text-gray-400 text-sm">{ about.location }</span>
        </div>
        <p className="text-gray-700 mb-2 ">{reducedDescription}</p>
        <div className="tags mt-2">
            {['In person', 'Education', 'IT'].map((tagType, index) => (
                <React.Fragment key={index}>
                    <span className= {`tag px-3 py-1 mr-2 mb-2 text-sm rounded-full border ${sectionColors[tagType] || 'text-green-500 bg-green-200 border-green-300'}`} >
                      { tagType }
                    </span>
                    { index === 0 && <span className="text-gray-300 mr-2 text-2xl mt-">|</span>}
                </React.Fragment>
            ))}
        </div>

      </div>



    </div>
  );
};

export default Card;
