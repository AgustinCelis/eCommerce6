import { NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChartSimple, faLayerGroup, faUserCheck, faBandage } from '@fortawesome/free-solid-svg-icons';

function Sidebar(){

    return(
        <nav className='sidebar'>
            <div className='sidebar-logo'>
                <a href='/'>
                    <FontAwesomeIcon icon={faBandage} className='fai-logo'/>
                </a>
            </div>
            <div className='sidebar-list'>
                <ul className='sidebar-pages-list'>
                    <li>
                        <NavLink to='/' exact activeClassName='active' className="li-background">
                            <span className='link-span'><FontAwesomeIcon icon={faChartSimple} className="fai-main fai-sidebar"/>  Main</span>
                        </NavLink>
                    </li>
                    <p className='sidebar-pages-span'>PAGES</p>
                    <li>
                        <NavLink to='/Products' exact activeClassName='active' className="li-background">
                            <span className='link-span'><FontAwesomeIcon icon={faLayerGroup} className="fai-products fai-sidebar"/>  Products</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/LastInDb' exact activeClassName='active' className="li-background">
                            <span className='link-span'><FontAwesomeIcon icon={faUserCheck} className='fai-lastindb fai-sidebar'/>  Last product & user</span>
                        </NavLink>
                    </li>
                </ul>       
            </div> 
        </nav> 
    )
};

export default Sidebar;