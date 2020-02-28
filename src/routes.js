import React, {lazy} from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = lazy(() => import('./components/Dashboard/index'));

const routes = [
    // SADMIN
    { path: '/sadmin/shopping/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    // one short payment
];

export default routes;
