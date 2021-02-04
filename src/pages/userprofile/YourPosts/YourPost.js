import { render } from '@testing-library/react';
import React from 'react';
import db from '../../../firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Post from '../../feed/post/Post';

export default function YourPost(props){
   const postRef = db.collection('posts')
   const query = postRef.where("userId","==", props.user.uid) 
   const [posts] = useCollectionData(query); 
   console.log(posts);
    if(posts){
        return(<>
            {posts.reverse().map((post, i)=>(<>
                <Post post={post} key={i} isLogged={props.user}/>
            </>))}
        </>)
    }
    return (<>Your posts are displayed here!!</>)
}