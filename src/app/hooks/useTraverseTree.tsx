const useTraverseTree = () => {
    function insertNode(tree, folderId, item, isFolder){
        console.log(tree, folderId, item, isFolder)
        if( tree.id === folderId && tree.isFolder){
            tree.items.unshift({
                id: new Date().getTime(), //replace with uuid
                name: item,
                isFolder,
                items: []
            });
            console.log("final root ",tree);
            return tree;
        }
        let latestNode = [];

        latestNode = tree.items.map((obj) => {
            return insertNode(obj, folderId, item, isFolder);
        })
        console.log("final ", {...tree, items:latestNode})
        return {...tree, items:latestNode};
    }

    const deleteNode = () =>{
        console.log('deleteNode')
    }

    const updateNode = () => {
        console.log('updateNode')
    }

    return {insertNode}
}

export default useTraverseTree;