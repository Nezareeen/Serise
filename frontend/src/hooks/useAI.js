import { useState } from 'react';

export default function useAI(){
  const [loading, setLoading] = useState(false);
  const call = async (payload) => {
    setLoading(true);
    try{
      // placeholder for AI call
      return { result: null };
    }finally{
      setLoading(false);
    }
  };
  return { loading, call };
}
