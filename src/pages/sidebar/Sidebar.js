import React from 'react';
import './Sidebar.css';
import Overlay from './Overlay';

export default function Sidebar(props){

	return (
<>
			<Overlay onClick={props.toggle}/>	
		<div className="sidebar">
			<div className="close" onClick={props.toggle}>X</div>
		<div className="list">
			<ul>
				<li>List One</li>
				<li>List Two</li>
			</ul>
		</div>
		</div>
</>
	);



}


