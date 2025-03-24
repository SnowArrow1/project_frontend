// @/libs/userLogIn.tsx
export default async function userLogIn(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }    

    return await response.json();
    
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}