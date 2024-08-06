import { Job } from "@/types/types";
import React from 'react'

const FetchJobId = async (id: string): Promise<Job | null> => {
    const response = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch a job");
    }
    const data = await response.json();

    if (!data) {
        return null;
    }

    return data.data as Job;
}

export default FetchJobId