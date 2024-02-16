import React, { useEffect, useState } from 'react'

export default function Posts() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async() =>{
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            if(!response.ok){
                throw new Error("Response not OK")
            }
            const fetchData = await response.json();
            setData(fetchData);
        }catch(error){
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div className='flex flex-col items-center'>
        <h3>POSTs </h3> 
        <ul>
            {data.map((post) => {
                return <li key={post.id}> {post.title} </li>
            })}
        </ul>
    </div>
  )
}
