// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import SidebarMenu from './components/SidebarMenu';
import { Spinner } from 'flowbite-react';
import { Link } from "react-router-dom";

const Home = lazy(() => import('./components/Home'));
const FileExplorer = lazy(() => import('./components/fileExplorer'))

const Pagination = lazy(() => import('./components/Pagination'))
export function App() {

  return (
    <>
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
        <Link to="/">
         <h1 className="text-3xl font-bold">SJC</h1>
       </Link>
    </nav>
    <div className="flex min-h-max">
      
      <SidebarMenu/>
      <div className="flex-grow-1 p-5 h-100">
        <Suspense fallback={<div className='container'><Spinner color="purple" aria-label="Loading ..." /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fileExplorer" element={<FileExplorer />} />
            <Route path="/pagination" element={<Pagination />} />
          </Routes>
        </Suspense>
      </div>
    </div>
    </>
  )
}

export default App;
