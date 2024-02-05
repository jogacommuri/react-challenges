import React, { useEffect, useState } from 'react'

export default function Pagination() {
    const [products, setProducts] =  useState([]);
    const [page, setPage] = useState(1);

    const fetchProducts = async () =>{
        const res = await fetch(`https://dummyjson.com/products?limit=100`);
        const data = await res.json();

        console.log(data);
        if(data && data.products){
            setProducts(data.products);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    const selectPageHandler = (selectedPage) => {
        if(selectedPage >= 1  && selectedPage <= products.length / 10 && selectedPage !== page){
            setPage(selectedPage);
        }
    }
  return (
    <div className='flex flex-col w-full'>
        {products.length > 0 && <div className='grid grid-cols-3 p-0 gap-2'>
                {
                    products.slice(page * 10 -10, page * 10 ).map((product) =>{
                        return (
                            <div className='h-[250px] w-[450px] p-2 bg-gray-100 text-center border rounded-lg  cursor-pointer p-3' key={product.id}>
                                <span>
                                    <img src={product.thumbnail} alt={product.title} className='w-full h-[90%] object-cover mb-2'/>
                                </span>
                                <span>{product.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        }
        {products.length > 0 && <div className='flex flex-row p-2 m-2 justify-center'>
            <span onClick={() => selectPageHandler(page -1)} className={page >1 ? " cursor-pointer border border-1 p-3 " : "cursor-pointer border border-1 p-3 opacity-0"}> Prev </span>   
            {[...Array(products.length / 10)].map((_, i) =>{
                return <span key={i} className={page === i+1 ? "cursor-pointer border border-1 p-3 pagination__selected": "cursor-pointer border border-1 p-3" } onClick={() => selectPageHandler(i + 1)} > {i + 1}</span>
            })}

            <span onClick={() => selectPageHandler(page + 1)} className={ page < products.length / 10 ? "cursor-pointer border border-1 p-3" : "cursor-pointer border border-1 p-3 opacity-0"}> Next </span>
        </div>}
    </div>
  )
}
