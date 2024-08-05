import React from "react";
import MainDescription from "@/components/MainDescription";
import SideDescription from "@/components/SideDescription";
import { Job } from "@/types/types";
import jobData from "../../../fetch/jobs.json";

interface DetailedPageProps {
  params: { id: string };
}

const DetailsPage = ({ params: { id } }: DetailedPageProps) => {
  const job = jobData.job_postings[+id];

  return (
    <div className=" flex p-3 font-poppins text-sm">
      <MainDescription job={job}/>
      <SideDescription job={job}/>
    </div>
  );
};

export default DetailsPage;