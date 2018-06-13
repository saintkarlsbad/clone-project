import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Homepage from './components/Homepage/Homepage';
import UserReservations from './components/Reservations/UserReservations';
import UserDashboard from './components/Reservations/UserDashboard';
import NewReservation from './components/Reservations/NewReservation';
import Checkout from './components/Reservations/Checkout';
import Display from './components/Display/Display';

export default (
    <Switch>
        <Route component={Homepage} path='/' exact />
        <Route component={UserDashboard} path = '/UserDashboard'/>
        <Route component={UserReservations} path = '/UserReservations/:reservation_id'/>
        <Route component={NewReservation} path = '/NewReservation'/>
        <Route component={Checkout} path = '/Checkout/:reservation_id'/>
        <Route component={Display} path={'/Display'}/>
    </Switch>
)