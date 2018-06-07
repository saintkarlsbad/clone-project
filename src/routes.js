import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Homepage from './components/Homepage/Homepage';
import MyCalendar from './components/Calendar/MyCalendar';
import About1 from './components/About/About1'
import Cabins from './components/Cabins/Cabins'
import UserReservations from './components/Reservations/UserReservations';
import UserDashboard from './components/Reservations/UserDashboard';
import NewReservation from './components/Reservations/NewReservation';

export default (
    <Switch>
        <Route component={Homepage} path='/' exact />
        <Route component={UserDashboard} path = '/UserDashboard'/>
        <Route component={MyCalendar} path='/MyCalendar' />
        <Route component={About1} path='/About1' />
        <Route component={UserReservations} path = '/UserReservations/:reservation_id'/>
        <Route component={NewReservation} path = '/NewReservation'/>
        <Route component={Cabins} path='/Cabins/:cabin_id' />
    </Switch>
)