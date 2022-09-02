import React, { useEffect, useState } from 'react';
import Topbar from './Topbar.js';
import Sidebar from './Sidebar.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import genericGuitar from '../assets/images/defaultGuitar.png'


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
        <div className='main-container-products'>
            {products.length === 0 ? <p>Cargando...</p> :
            <div className='products-detail'>
                <div className='title'>
                    <h2>Products list</h2>
                </div>
                <a className='button-style' href='http://localhost:4000/products/create' target="_blank" rel='noopener noreferrer'>+ Add product</a>
                    <table className="tabla">
                            <thead className="tabla-header">
                                <tr>
                                    <th className='product-th'><div>Product <FontAwesomeIcon className='faChevronDown' icon={faChevronDown}/></div></th>
                                    <th className='price-th'><div>Price <FontAwesomeIcon className='faChevronDown' icon={faChevronDown}/></div></th>
                                    <th className='quantity-th'><div>Quantity <FontAwesomeIcon className='faChevronDown' icon={faChevronDown}/></div></th>
                                    <th className='status-th'><div>Status <FontAwesomeIcon className='faChevronDown' icon={faChevronDown}/></div></th>
                                    <th></th>
                                    <th className='last-th'></th>
                                </tr>
                            </thead>
                            <tr className='table-separator'></tr>
                            <tbody className="tabla-body">
                            {products.map((product, i)=>{
                                return (
                                    <tr key={i} className="product-tr">
                                        <td className="td-product">
                                            <img className='img' src={genericGuitar} alt='imagen del producto'/>
                                            <a href={`http://localhost:4000/products/detail/${product.id}`}>{product.name}</a>
                                        </td>
                                        <td className="product-price">${product.price}</td>
                                        <td className='product-quantity'>{product.available_amount}</td>
                                        {product.active === true && <td className='product-active'><div><span className='active-dot'></span>Active</div></td> }
                                        {product.active === false && <td className='product-inactive'><div><span className='inactive-dot'></span>Inactive</div></td> }  
                                        <td><a href={`http://localhost:4000/products/edit/${product.id}`}><FontAwesomeIcon className='faPen' icon={faPen}/></a></td>
                                        <td><a href={`http://localhost:4000/products/delete/${product.id}`}><FontAwesomeIcon className='faTrash' icon={faTrash}/></a></td>            
                                    </tr>
                                )
                            })}
                            </tbody>                  
                    </table>
            </div>} 
        </div>
    </React.Fragment>
    );
};

export default Products;