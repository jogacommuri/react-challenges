// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import SidebarMenu from './components/SidebarMenu';
import { Spinner } from 'flowbite-react';
import { Link } from "react-router-dom";
import MultiSelectSearch from './components/MultiSelectSearch';
import PolyfillUseEffect from './components/PolyfillUseEffect';
import {ThemeProvider, useTheme} from './theme-context';
import Navbar from './components/Navbar';


const Home = lazy(() => import('./components/Home'));
const FileExplorer = lazy(() => import('./components/FileExplorer'))

const Pagination = lazy(() => import('./components/Pagination'))

const Form = lazy(() => import('./components/Form'))

const Debounce = lazy(() => import('./components/Debounce'))

const MemoryGame = lazy(()=> import('./components/MemoryGame'))

const TodoApp = lazy(() => import('./components/TodoApp'))
const KanbanBoard = lazy(() => import('./components/KanbanBoard'));
const DragDrop = lazy(()=> import('./components/DragDrop'));
const TicTacToe = lazy(()=> import('./components/TicTacToe'));

const EarnestTradeline = lazy(()=> import('./components/EarnestTradeline'));
const DataTable = lazy(()=> import('./components/DataTable'));
const GridPuzzle = lazy(()=> import('./components/GridPuzzle'));
export function App() {
  
  return (
    <ThemeProvider> 
    <Navbar />
    <div className="flex min-h-max">
      
      <SidebarMenu/>
      <div className="flex-grow-1 p-5 w-full flex justify-center">
        <Suspense fallback={<div className='container'><Spinner color="purple" aria-label="Loading ..." /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fileExplorer" element={<FileExplorer />} />
            <Route path="/pagination" element={<Pagination />} />
            <Route path="/multiSelectSearch" element={<MultiSelectSearch />} />
            <Route path="/polyfill-useEffect" element={<PolyfillUseEffect />} />
            <Route path="/form-validation" element={<Form/>} />
            <Route path="/debounce" element={<Debounce/>} />
            <Route path="/memoryGame" element={<MemoryGame />} />
            <Route path="/todoApp" element={<TodoApp />} />
            <Route path='/kanban' element={<KanbanBoard/>} />
            <Route path='/dragDrop' element={<DragDrop />} />
            <Route path='/tictactoe' element={<TicTacToe />} />
            <Route path='/tradeline' element={<EarnestTradeline />} />
            <Route path='/dataTable' element={<DataTable />} />
            <Route path='/gridPuzzle' element={<GridPuzzle n={5} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default App;
