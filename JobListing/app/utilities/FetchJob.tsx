import { Job } from '../../types/types'
import React from 'react'

interface ApiResponse {
  success: boolean;
  message: string;
  data: Job[];
}

export const FetchJob = async (): Promise<Job[]> => {
  const response = await fetch("https://akil-backend.onrender.com/opportunities/search");
  const result: ApiResponse = await response.json();
  
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.message || 'Failed to fetch opportunities');
  }
}

