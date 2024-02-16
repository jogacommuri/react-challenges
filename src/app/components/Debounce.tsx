import React, { useCallback, useEffect, useState } from 'react'

export default function Debounce() {
    const [searchText, setSearchText] = useState('');

    const [list, setList] = useState([]);
    const [options, setOptions] = useState([]);

    const API_ENDPOINT = `https://algochurn-server.onrender.com/practice/countries`;

    const callAPI = async (value) =>{
        try{
            const res = await fetch(`${API_ENDPOINT}/${value}`)
            if(!res.ok){
                throw new Error("Response not OK")
            }
            const fetchData = await res.json();
            console.log(fetchData)
            setList(fetchData?.countries);
        }catch(error){
            console.log(error)
        }finally{
            //setLoading(false)
        }
    }
    const debounce = (callback, delay = 500) =>{
        let timer;

        return(...args) =>{
            clearTimeout(timer)
            timer = setTimeout(() =>{
                
                callback.apply(this, args)
            }, delay)
        }
    }
    const debouncedAPI = useCallback(debounce((value) => callAPI(value), 500),[]);

    
    useEffect(()=>{
        if(searchText){
            debouncedAPI(searchText)
        }
    },[searchText])

  return (
    <div className='bg-gradient-to-br from-blue-700 to-purple-700 h-screen'>
        <div className='p-4 w-full h-full'>
            <h1 className='font-bold text-white pb-4'> Search Countries</h1>
            <input 
                type='text'
                placeholder='Enter Country Name'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className='rounded-md p-4 max-w-sm w-full' />
            <div className='max-w-sm rounded-md bg-white mt-4 max-h-40 overflow-auto'>
                {list.length > 0 ? list.map((country, i) =>(
                    <p key={country} className='p-3'>{country}</p>
                    )):null}
                    
            </div>
        </div>
    </div>
  )
}
