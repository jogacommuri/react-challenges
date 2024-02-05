import React, { useEffect, useRef, useState } from 'react'
import { Pills } from './Pills';

export default function MultiSelectSearch() {

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUserSet, setSelectedUserSet] = useState(new Set());
    const [keyStokeCount, setKeyStrokeCount] = useState(0);

    const inputRef = useRef(null);
    let debounceTimer ;
    const fetchUsers = async () =>{
        if(searchTerm.trim() === ""){
            setSuggestions([]);
            return;
        }
        
        await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err)=>{
            console.log(err)
        })
       
    }

    // useEffect(() =>{
    //     fetchUsers();
    // },[searchTerm])
    useEffect(() => {
        if(keyStokeCount %3 === 0){
            debounceTimer = setTimeout(() => {
                console.log("I am debounced")
                fetchUsers();
            }, 500); 
            // Adjust the debounce delay as per your requirement
        }
        
        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchTerm, keyStokeCount]);

    const handleSelectedUser = (user) =>{
        setSelectedUsers([...selectedUsers, user]);
        setSelectedUserSet(new Set([...selectedUserSet, user.email]))
        setSearchTerm("");
        setSuggestions([]);
        inputRef.current.focus()
    }
    const handleRemoveUser = (user)=>{
        const updatedUsers = selectedUsers.filter((selectedUser) => selectedUser.id !== user.id);
        setSelectedUsers(updatedUsers);
        const updatedEmails =  new Set(selectedUserSet);
        updatedEmails.delete(user.email);
        setSelectedUserSet(updatedEmails);

    }
    const handleKeyDown =(e) =>{
        if(e.key === 'Backspace' && e.target.value === "" && selectedUsers.length > 0){
            const lastUser = selectedUsers[selectedUsers.length -1];
            handleRemoveUser(lastUser)
            setSuggestions([]);
        }else{
            setKeyStrokeCount(keyStokeCount + 1)
        }
    }
    //console.log(selectedUsers)
  return (
    <div className='flex flex-col relative '>
        <div className='flex relative w-full items-center flex-wrap gap-2 p-5 border rounded-full border-gray-500'>
            {/* pills */}
            {selectedUsers.length>0 &&  selectedUsers.map((user) => {
                return <Pills key={user.email} image={user.image} text={`${user.firstName} ${user.lastName}`} onClick={() => handleRemoveUser(user)} />
            })}
            {/* input field with search suggestions */}
            <input 
            ref = {inputRef}
            className=' h-[20px] p-5 border-none rounded-full focus:border-none focus:outline-none focus:ring-transparent'
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='search for a user'
            onKeyDown={handleKeyDown}
             />
            {/* suggestion list */}
            <ul className='absolute max-h-72 overflow-scroll w-full list-none p-0 m-0 top-16 left-0 border-none rounded-2xl bg-white border border-sky-500'>
                {suggestions?.users?.map((user, i)=>{
                    return !selectedUserSet.has(user.email) ? (
                        <li key={user.ein} 
                                className='flex items-center gap-3 p-2 cursor-pointer border border-blue-400 last:border-none hover:bg-green-300'
                                onClick={() => handleSelectedUser(user)}>
                            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className='h-5'/>
                            <span>
                            {user.firstName} {user.lastName}
                            </span>
                        </li>
                        ) : (<></>)
                })}
            </ul>
        </div>
    </div>
  )
}
