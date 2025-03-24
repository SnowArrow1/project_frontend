import { InterviewJson } from "../../interface";
export default async function getInterviews(token: string): Promise<InterviewJson> {

    const response = await fetch('http://localhost:5000/api/v1/interviews', {
        method: 'GET',
        headers: {
             authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Cannot user interviews');
    }

    return await response.json();
}