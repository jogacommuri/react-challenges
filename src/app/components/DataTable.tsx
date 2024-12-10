import React, { useEffect, useState } from 'react'
import users from '../../data/users.js';
import { BsSortUpAlt,BsSortDownAlt } from "react-icons/bs";
const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Occupation', key: 'occupation' },
  ];

type User = (typeof users)[number];

const DataTable = () => {
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);
    const [pageUsers, setPageUsers] = useState(users);
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortedUsers, setSortedUsers] = useState(users);
    const totalPages = Math.ceil(users.length / pageSize);

    const sortUsers = (users, sortField, sortDirection) =>{
        const usersClone = users.slice();
        switch(sortField){
            case 'id':
            case 'age': {
                return usersClone.sort((a,b) => 
                    sortDirection === 'asc' ?
                    a[sortField] - b[sortField] :
                    b[sortField] - a[sortField]
                )
            }
            case 'name':
            case 'occupation' :{
                return usersClone.sort((a,b) => 
                    sortDirection === 'asc' ?
                    a[sortField].localeCompare(b[sortField]) :
                    b[sortField].localeCompare(a[sortField])
                )
            }
            default:{
                return usersClone;
            }
        }
    }

    useEffect(()=>{
        setSortedUsers(sortUsers(users,sortField, sortDirection))
    },[sortField,sortDirection]);

    useEffect(()=>{
        const start = (page -1) * pageSize;
        const end  = start + pageSize;

        setPageUsers(sortedUsers.slice(start, end));

    },[page, pageSize, sortedUsers])
  
  return (
    <div className='flex flex-col w-full justify-center items-center min-h-screen  p-4'>
      <h3 className='text-3xl font-semibold font-sans underline mb-6'>Data Table </h3>
        <UserTable 
        users={pageUsers} 
        sortField={sortField} 
        sortDirection={sortDirection}  
        onSort={(key) =>  {
            if(sortField !== key){
                setSortField(key);
                setSortDirection('asc')
            }else{
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
            }
            setPage(1)
        }}/>
        <hr />
        {/* <Pagination /> */}
        <div className='flex mt-5 gap-4'>
            <select 
                className='border border-gray-400 rounded-lg p-2'
                aria-label = "page Size"
                onChange={(e) =>{ 
                    setPageSize(Number(e.target.value));
                    setPage(1);
                }}
            >
                {[5,10,20].map((size) => (
                    <option key={size} value={size}> show {size} </option>
                ))}
                
            </select>
            <div className='flex flex-row justify-center items-center gap-4 '>
                <button
                    className='border border-gray-400 rounded-lg p-2 disabled:bg-gray-300 disabled:cursor-not-allowed'
                    aria-label='previous page'
                    onClick={() => {setPage(page - 1)}}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span aria-label="Page number">
                    Page {page} of {totalPages}
                </span>
                <button
                    className='border border-gray-400 rounded-lg p-2 disabled:bg-gray-300 disabled:cursor-not-allowed'
                    aria-label='Next page'
                    onClick={() => {setPage(page + 1)}}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    </div>
  )
  
}

const UserTable = ({users,sortField, sortDirection, onSort}) => {
    return (
        <table className='w-full border border-collapse mt-5 border-gray-400 rounded-md table-fixed'>
            <thead>
            <tr>
                {columns?.map(({label,key}) => (
                    <th 
                    key={key} 
                    className='border p-2 border-gray-400 text-sm bg-gray-100 cursor-pointer' 
                    onClick={() => onSort(key)}
                    >
                        <span className="flex items-center justify-center gap-2">
                        {label}
                        {sortField === key && (
                            <span className=' w-4 flex justify-center'>
                            {sortDirection === 'asc' ? <BsSortUpAlt /> : <BsSortDownAlt />}
                            </span>
                        )}
                        </span>
                        
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {users?.map((user) =>(
                <tr key={user.id}>
                    <td className='border p-2 border-gray-400 text-sm text-center'>{user.id}</td>
                    <td className='border p-2 border-gray-400 text-sm text-center'>{user.name}</td>
                    <td className='border p-2 border-gray-400 text-sm text-center'>{user.age}</td>
                    <td className='border p-2 border-gray-400 text-sm text-center'>{user.occupation}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default DataTable