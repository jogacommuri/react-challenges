
import React, { useEffect, useState } from 'react'

const defaultFormState= {
    firstName: { value: '', error: null },
    lastName: { value: '', error: null },
    emailAddress: { value: '', error: null },
    password: { value: '', error: null },
    confirmPassword: { value: '', error: null },
}
export default function Form() {
    const [formState, setFormState] = useState(defaultFormState)
    const [success, setSuccess] = useState(false);


    const handleSubmit = (e) =>{
        console.log("handle Submit");

        e.preventDefault();

        let hasErrors = handleFormValidation();

        if(hasErrors){
            setSuccess(false);
            return
        }
        setSuccess(true)
    }

    const handleFormValidation = () =>{
        console.log("validating")
        let updatedState = { ...formState };
        let error =  false;

        const {firstName, lastName, emailAddress, password, confirmPassword } = updatedState;

        if(firstName.value?.length < 3){
            updatedState.firstName.error = 'First Name cannot be less than 3 characters.';
            error = true;
        }
        if(lastName.value?.length < 3){
            updatedState.lastName.error = 'Last Name cannot be less than 3 characters.';
            error = true;
        }
        const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
        if (!emailAddress?.value?.match(re)) {
            updatedState.emailAddress.error = 'Email address is invalid';
            error = true;
        }
        if(!password?.value){
            updatedState.password.error = 'Password cannot be empty.';
            error = true;
        }
        if(!confirmPassword?.value){
            updatedState.confirmPassword.error = 'Confirm Password cannot be empty.';
            error = true;
        }

        if(password?.value && confirmPassword?.value && password.value !== confirmPassword.value){
            updatedState.confirmPassword.error = 'Passwords donot match';
            error = true;
        }

        setFormState({
            ...formState,
            ...updatedState
        });

        return error
    }

    const onchangeHandler=(field, value) =>{
        
        setFormState({
            ...formState,
            [field]:{
                value:value,
                error: null
            }
        })
        console.log('onchange => ', formState)
    }
  return (
    <form className='bg-violet-200  bg-blend-difference w-[80%] max-w-md rounded-md p-5 flex flex-col shadow self-center' onSubmit={handleSubmit}> 
        <div className='flex flex-col mb-5'>
            <label className='mb-2 '>First Name</label>
            <input 
                type='text'
                className='flex p-2 border mb-2 shadow-xl placeholder:font-dark placeholder: text-gray-900 focus:outline-none'
                value={formState.firstName.value}
                placeholder='Joga'
                onChange={(e) => onchangeHandler('firstName', e.target.value)} />
            {formState?.firstName?.error && (
                <small className='text-red-600 text-md font-bold'>{formState.firstName.error}</small>
            )}
        </div>
        <div className='flex flex-col mb-5'>
            <label className='mb-2'>Last Name</label>
            <input 
                type='text'
                className='flex p-2 border mb-2 shadow-xl placeholder:font-light placeholder: text-gray-900 focus:outline-none'
                value={formState.lastName.value}
                placeholder='Commuri'
                onChange={(e) => onchangeHandler('lastName', e.target.value)} />
            {formState?.lastName?.error && (
                <small className='text-red-600 text-md font-bold'>{formState.lastName.error}</small>
            )}
        </div>
        <div className='flex flex-col mb-5'>
            <label className='mb-2'>Email Address</label>
            <input 
                type='email'
                className='flex p-2 border mb-2 shadow-xl placeholder:font-light placeholder: text-gray-900 focus:outline-none'
                value={formState.emailAddress.value}
                placeholder='jocom@jam.com'
                onChange={(e) => onchangeHandler('emailAddress', e.target.value)} />
            {formState?.emailAddress?.error && (
                <small className='text-red-600 text-md font-bold'>{formState.emailAddress.error}</small>
            )}
        </div>
        <div className='flex flex-col mb-5'>
            <label className='mb-2'>Password</label>
            <input 
                type='password'
                className='flex p-2 border mb-2 shadow-xl placeholder:font-light placeholder: text-gray-900 focus:outline-none'
                value={formState.password.value}
               
                onChange={(e) => onchangeHandler('password', e.target.value)} />
            {formState?.password?.error && (
                <small className='text-red-600 text-md font-bold'>{formState.password.error}</small>
            )}
        </div>
        <div className='flex flex-col mb-5'>
            <label className='mb-2'>Confirm Password</label>
            <input 
                type='password'
                className='flex p-2 border mb-2 shadow-xl placeholder:font-light placeholder: text-gray-900 focus:outline-none'
                value={formState.confirmPassword.value}
               
                onChange={(e) => onchangeHandler('confirmPassword', e.target.value)} />
            {formState?.confirmPassword?.error && (
                <small className='text-red-600 text-md font-bold'>{formState.confirmPassword.error}</small>
            )}
            
        </div>
        <button type='submit' className='bg-white text-black border-2 border-slate-900 rounded w-2/4 self-center p-2 relative z-10 cursor-pointer shadow-[5px_5px_0px_-0px] shadow-slate-900 tracking-wide'>Register</button>
        {success && (
        <p className="mt-3 text-center text-green-400">Form as been submitted successfully!</p>
      )}
    </form> 
  )
}
