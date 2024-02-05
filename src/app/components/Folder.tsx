import React, { useState } from 'react'

export default function Folder({handleInsertNode,explorer}) {
    
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible:false,
        isFolder:null
    });

    const handleNew = (e) =>{
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visible:true,
            isFolder:true
        })
    }
    const handleNewFile = (e) =>{
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visible:true,
            isFolder:false
        })
    }

    const onAddFolder = (e) =>{
        if(e.keyCode ===13 && e.target.value){
            //addlogic
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
            console.log("adding the input",e.target.value)
            setShowInput({...showInput, visible:false})
        }
    }

    return (
        (explorer.isFolder) ?
        <div className='container'>
            <div className='flex w-[300px] bg-slate-200 justify-between items-center mb-2 cursor-pointer' onClick={()=> setExpand(!expand)}>
                <span>📁  {explorer.name}</span>
                <div className='flex gap-y-4'>
                    <button className='bg-white text-sm border-2 border-slate-500 p-1' onClick={(e) => handleNew(e)}>Folder + </button>
                    <button className='bg-white text-sm border-2 border-slate-500 p-1' onClick={(e) => handleNew(e)}>File + </button>
                    {/* <button className='bg-white text-sm border-2 border-slate-500 p-1' onClick={(e) => handleNew(e)}>Update + </button>
                    <button className='bg-white text-sm border-2 border-slate-500 p-1' onClick={(e) => handleNew(e)}>Delete - </button> */}
                </div>
            </div>
            <div style={{display: expand ? "block" : "none"}} className='px-5'>
                {
                    showInput.visible && (
                        <div className='flex items-center gap-5 mb-2'>
                            <span className='mt-1'> {showInput.isFolder ? "📁 " :"📄 " }</span>
                            <input 
                                className='flex p-1 border-1 border-gray-300 items-center justify-between cursor-pointer' 
                                type='text'
                                onKeyDown={onAddFolder}
                                autoFocus
                                onBlur={() => setShowInput({...showInput, visible:false})}
                            />
                        </div>
                    )
                }

                {explorer.items.map((item)=>{
                    return(
                        <Folder handleInsertNode={handleInsertNode} explorer={item} key={item.id} />
                    )
                })}
            </div>
        </div>
    : <span className='flex flex-col'>📄 {explorer.name}</span>
    )
}
