import Image from "next/image";
import { JobsData, Job } from "@/types/types";
import Link from "next/link";
import jobsData from "../fetch/jobs.json";
import Card from "@/components/Card";

// interface Props {
//   jobs: Job[]
// }

const Home: React.FC = () => {
  const { job_postings } = jobsData;

  return (
    <div className="w-[87%]">
      <div className="head flex justify-between w-[81%] mx-6">
        <div className="theme">
          <h1 className="font-extrabold text-3xl mx-48 mt-8">Opportunities</h1>
          <p className="text-gray-400 mx-48">{`Showing ${job_postings.length} results`}</p>
        </div>

        <div className="sort mt-12">
          <span className="text-gray-400">Sort by: </span>
          <select name="sort" id="sort" className="mr-2">
            <option value="1">Most relevance</option>
          </select>
          <span className="text-gray-300">|</span>
        </div>

      </div>

      <div className="pt-10 mx-48">
        {job_postings.map((job, id) => (
          <Link href={`/job/${id}`} key={id}>
            <Card job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
