import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Dashboard from './Dashboard'


const Home = () => {
    const dispatch = useDispatch()
    
    const isLogged = useSelector(state => state.isLogged)
   console.log(isLogged, 'from home page')
    return (
        <div>
            {isLogged ? 
            <div>
                <Dashboard/>
            </div>: 
            <div>
                <Link to = "/login">Plese Login first</Link>

            </div>
            }
           
        </div>
    )
}

export default Home
