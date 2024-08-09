import Image from "next/image";
import { JobsData, Job } from "@/types/types";
import Link from "next/link";
import Card from "@/components/Card";
import { FetchJob } from "./utilities/FetchJob";
import { SessionProvider } from "next-auth/react";
import SignInPage from "./auth/login/page";
import FormButton from "@/components/FormButton";

interface Props {
  jobs: Job[];
}

interface Content {
  content: string;
}

const Home = async () => {
  let jobs: Job[] = [];
  let error: string | null = null;

  try {
    jobs = await FetchJob();
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-[87%]">
      <div className="flex"></div>
      <div className="head flex justify-between w-[81%] mx-6">
        <div className="theme">
          <h1 className="font-extrabold text-3xl mx-48 mt-8">Opportunities</h1>
          <p className="text-gray-400 mx-48">{`Showing ${jobs.length} results`}</p>
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
        {jobs.map((job) => (
          <Link href={`/job/${job.id}`} key={job.id}>
            <Card job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
