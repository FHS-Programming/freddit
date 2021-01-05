import React from 'react'
import Login from '../login/Login';
import './Nav.css'

export default function Nav(props){

	return (
<div className="nav">
		<div className="menu" onClick={props.sidebar}>
		<i class="fa fa-bars 5x"></i>
		</div>

		<div className="search">
			<i class="fa fa-search"></i>
			<input type="text" placeholder="Search"/>
			
		</div>
    {!props.isLogged ? <Login/>: 		<div className="avatar">
		<i class="fa fa-user-circle-o"></i>
		</div> }

</div>


	);

}
