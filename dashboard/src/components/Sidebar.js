import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChartLine, faLayerGroup, faUserCheck, faBandage } from '@fortawesome/free-solid-svg-icons';

function Sidebar(){
    return(
        <>
        <nav className='sidebar'>
            <div className='sidebar-logo'>
                <a href='/'>
                    <FontAwesomeIcon icon={faBandage} className='fai-logo'/>
                </a>
            </div>
            <div className='sidebar-list'>
                <ul className='sidebar-pages-list'>
                    <li>
                        <Link to='/'>
                            <span><FontAwesomeIcon icon={faChartLine} className="fai-main fai-sidebar"/>  Main</span>
                        </Link>
                    </li>
                    <p className='sidebar-pages-span'>PAGES</p>
                    <li>
                        <Link to='/Products'>
                            <span><FontAwesomeIcon icon={faLayerGroup} className="fai-products fai-sidebar"/>  Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/LastestInDb'>
                            <span><FontAwesomeIcon icon={faUserCheck} className='fai-lastindb fai-sidebar'/>  Last product & user</span>
                        </Link>
                    </li>
                </ul>       
            </div> 
        </nav> 
        </>
    )
};

export default Sidebar;