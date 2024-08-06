import React from "react";
import MainDescription from "@/components/MainDescription";
import SideDescription from "@/components/SideDescription";
import { Job } from "@/types/types";
import FetchJobId from "@/app/utilities/FetchJobId";

interface JobDetailProps {
  params: {
    id: string;
  };
}

const DetailsPage = async ({ params }: JobDetailProps) => {
  const { id } = params;

  let job: Job | null = null;
  let error: string | null = null;

  try {
    job = await FetchJobId(id);
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!job) {
    return <p>Job not found</p>;
  }

  console.log(job.description)

  return (
    <div className=" flex p-3 font-poppins text-sm">
      <MainDescription
        description={job.description}
        responsibilities={job.responsibilities}
        idealCandidate={job.idealCandidate}
        whenWhere={job.whenAndWhere}
      />
      <SideDescription job={job} />
    </div>
  );
};

export default DetailsPage;
