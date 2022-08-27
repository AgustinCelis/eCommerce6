import React, { useEffect, useState } from 'react';
import Topbar from './Topbar.js';
import Sidebar from './Sidebar.js';

function Products(){
    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetch('/api/products',
        { 
        method: 'GET',
        headers: {'Access-Control-Allow-Origin': '*'},
        mode: 'cors',
        cache: 'default'
        })
        .then(response => response.json())
        .then(data => {
            if(data !== undefined){
                return setProducts(data.data)
            }
        })
        .catch(error => console.log(error))
    }, []);

    return(
    <React.Fragment>
        <Topbar/>
        <Sidebar/>
        <div className='products-container'>
            <div className='products-detail'>
                {products.length === 0 && <p>Cargando...</p>}
                {products.map((product, i)=>{
                    return(
                        <span key={i}>{product.name}</span> // ACA HAY QUE HACER UNA TABLA
                    )
                })}
            </div>
        </div>
    </React.Fragment>
    );
};

export default Products;