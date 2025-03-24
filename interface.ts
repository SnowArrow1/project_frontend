  export interface CompanyJson {
    success: boolean,
    count: number,
    data: CompanyItem[]
  }

export interface CompanyItem {
  _id: string;
  name: string;
  address: string;
  website: string;
  description: string;
  tel: string;
  __v: number;
  value: string;
}

export interface InterviewJson {
  success: boolean,
  count: number,
  data: InterviewItem[]
}
export interface InterviewItem {
  user: string;
  company: string;
  interviewDate: string;
  createdAt: string;
}