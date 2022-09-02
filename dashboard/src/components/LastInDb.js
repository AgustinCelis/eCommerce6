import Topbar from './Topbar.js';
import Sidebar from './Sidebar.js';
import React, { useEffect, useState } from 'react';
import genericUser from '../assets/images/defaultUser.png'
import genericGuitar from '../assets/images/defaultGuitar.png'

function LastInDb (){
    
    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})

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
                return setProduct(data.data[data.data.length - 1])
            }
        })
        .catch(error => console.log(error))
    }, []);

    useEffect(()=>{
        fetch('/api/users',
        { 
        method: 'GET',
        headers: {'Access-Control-Allow-Origin': '*'},
        mode: 'cors',
        cache: 'default'
        })
        .then(response => response.json())
        .then(data => {
            if(data !== undefined){
                return setUser(data.data[data.data.length - 1])
            }
        })
        .catch(error => console.log(error))
    }, []);

    return(
        <>
        <Topbar/>
        <Sidebar/>
        <div className='main-container-lidb'>
            {(product === null && user === null) ? <p>Cargando...</p> :
            <div className='lidb-container'>
                <div className='lidb-div'>
                    <div className='div-title'>LAST USER</div>
                    <div className='div-user-product div-user'>
                        <img src={genericUser} alt="imagen del usuario" className='div-img'/>
                        <span>Username<br/><b>{user.username}</b></span>
                        <span>Email<br/><b>{user.email}</b></span>
                    </div>
                </div>
                <div className='lidb-div'>
                    <div className='div-title'>LAST PRODUCT</div>
                    <div className='div-user-product div-product'>
                        <a href={`http://localhost:4000/products/detail/${product.id}`} className='div-user-product'>
                            <img src={genericGuitar} alt="imagen del usuario" className='div-img'/>
                            <span>Product name<br/><b>{product.name}</b></span>
                            <span>Category<br/><b>{product.categ_id}</b></span> {/* La idea es poner product.categories.name, pero React no lo renderiza */}
                        </a>
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    )
}

export default LastInDb;