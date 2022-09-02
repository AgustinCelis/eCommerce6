import {Link} from 'react-router-dom';

function Error404 (){
    return(
        <>
            <h2>Pagina no encontrada</h2>
            <Link to='/'>
                <p>Volver a la pagina principal {'>'}</p>
            </Link>
        </>
    )
}

export default Error404;