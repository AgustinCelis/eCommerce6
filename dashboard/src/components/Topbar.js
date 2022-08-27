import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faAngleDown} from '@fortawesome/free-solid-svg-icons'

function Topbar(){
    return(
        <>
            <div className='topbar'>
                <div className='topbar-flex'>
                    <div className='topbar-user'>
                        <a href='/'>
                            <FontAwesomeIcon icon={faUser} className='fai-user'/>
                            <span>Hola, 'user.name' <FontAwesomeIcon icon={faAngleDown} className='fai-caret-down'/></span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Topbar;