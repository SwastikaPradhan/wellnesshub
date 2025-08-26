'use client'; // or remove if using Pages Router
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {useState,useEffect} from "react";
import { useRouter } from "next/navigation";

interface GoogleTokenPayload {
  email: string;
  name: string;
  picture: string;
}

export default function GoogleLoginButton() {
  const router=useRouter();
  const [tokenFromApi,setTokenFromApi]=useState<string | null>(null);
    useEffect(()=>{
        if(tokenFromApi){
           localStorage.setItem('token', tokenFromApi);

        }
      },[tokenFromApi]);
     

  const handleLogin = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;

    try {
      const decoded: GoogleTokenPayload = jwtDecode(credentialResponse.credential);

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/social-login`, {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
        provider: 'google',
      });

      console.log('Login Success', data);

      
    
      router.push('/');
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.error('Google Login Failed')}
      />
    </div>
  );
}

