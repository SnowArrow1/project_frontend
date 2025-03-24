export async function userRegister(
    userName: string, 
    userTelephone: string,
    userEmail: string, 
    userPassword: string
  ) {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          tel: userTelephone,
          email: userEmail,
          password: userPassword,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  