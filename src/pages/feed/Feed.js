import React from 'react';
import Post from './post/Post';


export default function Feed({isLogged}){
	return (
		<>
		<div className="feed">
			<Post isLogged={isLogged}/>	
			<Post isLogged={isLogged}/>
			<Post isLogged={isLogged}/>
		</div>
		</>
	)

}
