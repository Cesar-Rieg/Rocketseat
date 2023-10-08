import { Routes, Route } from 'react-router-dom';

import { Details } from '../pages/Details/Details.jsx';
import { Home } from '../pages/Home/Home.jsx';
import { NewNote } from '../pages/NewNote/NewNote.jsx';
import { Profile } from '../pages/Profile/Profile.jsx';


export function AppRoutes(){
    return (
        <Routes>
            <Route path="/details/:id" element={ <Details/> }/>
            <Route path="/" element={ <Home/> }/>
            <Route path="/new-note" element={ <NewNote/> }/>
            <Route path="/profile" element={ <Profile/> }/>
        </Routes>
    );
}
