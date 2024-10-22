import { useState } from "react";

export default async function handler(event:any){
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      event.preventDefault();
      setIsLoading(true);

      const formDetails = new URLSearchParams();
      formDetails.append('username', username);
      formDetails.append('password', password);

      try{
            const response = await fetch('http://149.129.217.61:8005/auth/sign-in',{
                  method:'POST',
                  headers:{},
                  body: formDetails,
            });
            setIsLoading(false);
      } catch(error) {
            setIsLoading(false);
            setError('An error occured');
      }
      
}