import React from 'react';
import Topbar from './Topbar.js';
import Sidebar from './Sidebar.js';

function Dashboard(){
    return(
        <React.Fragment>
            <Topbar/>
            <Sidebar/>
        </React.Fragment>
    )
};

export default Dashboard;