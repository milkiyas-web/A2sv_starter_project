interface ApplicationFunnel {
  submitted: number;
  accepted: number;
  pending_review: number;
  in_progress: number;
}

interface SchoolDistribution {
  [schoolName: string]: number; 
}

interface CountryDistribution {
  [countryName: string]: number;
}

interface AnalyticsData {
  total_applicants: number;
  acceptance_rate: number;
  average_review_time_days: number;
  application_funnel: ApplicationFunnel;
  school_distribution: SchoolDistribution;
  country_distribution: CountryDistribution;
}

interface ApiResponse {
  success: boolean;
  data: AnalyticsData;
  message: string;
}

export type User={
    full_name:string,
    email:string,
    password:string,
    role:string 
}
export type Applications={
  success:boolean,
  data:{reviews:Reviews[],
  total_count:number,
  page:number,
  limit:number,
}
  ,
   message:string,
}
export type Reviews={
  id:string,
  applicant_name:string,
  status:string,
  assigned_reviewer_name:string|null,
}
export type Applicantion={
  success: boolean,
  data: {
    id: string,
    status: string,
    school: string,
    degree: string,
    leetcode_handle: string,
    codeforces_handle: string,
    essay_why_a2sv: string,
    essay_about_you: string,
    resume_url: string,
    submitted_at:string,
    updated_at: string
  },
  message:string

}
export type HorizontalBar={
  in_progress:number,
  accepted:number,
  interview:number,
  applied:number,
}
export type Cycles={
success:boolean,
data:{
  cycles:Cycle[],
  total_count:number,
  page:number,
  limit:number
},
message:string
}
export type Cycle={
 id:number,
 name:string,
 start_date:string,
 end_date:string,
 is_active:boolean,
 created_at:string
}
export type ncycle={
  name:string,
  start_date:string,
  end_date:string
}
