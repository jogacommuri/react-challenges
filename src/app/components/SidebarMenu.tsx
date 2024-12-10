import { Sidebar } from 'flowbite-react';
import { FiFolder, FiShoppingCart, FiSearch, FiCodesandbox, FiList, FiColumns , FiCopy,FiTable} from 'react-icons/fi';
import { TbTicTac } from "react-icons/tb";
import { FaMemory, FaPuzzlePiece } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTheme } from '../theme-context';
function SidebarMenu() {

  const {theme, toggleTheme} = useTheme();

  return (

    <Sidebar aria-label="Default sidebar example"  className="h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
         
          <Sidebar.Item href="#" icon={FiFolder}>
            <Link to="/fileExplorer">File Explorer </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiTable}>
            <Link to="/dataTable">Data Table </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiShoppingCart}>
            <Link to="/pagination">Products Pagination </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiSearch}>
            <Link to="/multiSelectSearch">Multi Select Search </Link>
          </Sidebar.Item>
          
          <Sidebar.Item href="#" icon={FiList}>
            <Link to="/todoApp">Todo App </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiColumns}>
            <Link to="/kanban">Kanban Board </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={TbTicTac}>
            <Link to="/tictactoe">Tic Tac Toe </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiCopy}>
            <Link to="/dragDrop">Drag & Drop </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiTable}>
            <Link to="/tradeline">Earnest Tradelines </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaMemory}>
            <Link to="/memoryGame">MemoryGame </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaPuzzlePiece}>
            <Link to="/gridPuzzle">Grid Puzzle </Link>
          </Sidebar.Item>
          
          <Sidebar.Item href="#" icon={FiTable}>
            <Link to="/dataTable">Data Table </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiCodesandbox}>
            <Link to="/polyfill-useEffect">Polyfill </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiCodesandbox}>
            <Link to="/form-validation">Form Validation </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiCodesandbox}>
            <Link to="/debounce">Debounce </Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
   
  );
}
export default SidebarMenu;