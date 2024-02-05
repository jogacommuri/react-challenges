import React, { useState } from 'react'
import explorer from '../../data/folderData.js';
import Folder from './Folder.js';
import useTraverseTree from '../hooks/useTraverseTree.js';

export default function FileExplorer() {

    const [explorerData, setExplorerData] = useState(explorer);
    const { insertNode } = useTraverseTree();

    const handleInsertNode = (folderId, item, isFolder) =>{
        console.log("initial tree =>",explorerData)
        const finalTree = insertNode(explorerData, folderId, item, isFolder);
        
        setExplorerData(finalTree)
    }
  return (
    <div className='flex flex-col justify-center'>
        <h1 className="pb-4">File Explorer</h1>
        <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  )
}
