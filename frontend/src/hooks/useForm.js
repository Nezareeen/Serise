import { useState } from 'react';

export default function useForm(initial = {}){
  const [values, setValues] = useState(initial);
  const onChange = (e) => setValues({...values, [e.target.name]: e.target.value});
  return { values, onChange, setValues };
}
