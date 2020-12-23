import React from 'react'
import './Post.css'

export default function Post(){
	return (
		<>
		<div className="post">
		<div className="userinfo">
		<div className="avatar">
			<i className="fa fa-user-circle-o"></i>
		</div>
		<div className="username">
			username<br></br>
			<span className="date">12-16-2020</span>
		</div>
		</div>
		<div className="title">
			<h2>Best title</h2>
		</div>
		Morbi tellus lacus, elementum vitae mauris sit amet, mattis fringilla mi. Vivamus at eros posuere, pretium nisi in, posuere ipsum. Nullam diam nunc, elementum id justo ut, cursus lacinia tortor. Nulla facilisi. Nam porta, tortor auctor luctus ultricies, tortor felis luctus orci, sit amet lobortis nisi neque in felis. Etiam vitae elit fringilla, scelerisque ante et, placerat lorem. Sed cursus velit non lectus aliquet gravida. Duis ultricies lacus non eros scelerisque, sed accumsan nunc bibendum. Proin pellentesque ligula a nisi malesuada, ac suscipit quam accumsan. Ut nec magna diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas rhoncus nulla id ex euismod, vel egestas ligula sagittis. Maecenas sagittis porta interdum. Pellentesque ut luctus ipsum, id commodo nulla. Morbi eget tempus diam.
		<div className="interactions">
		<div className="comment">
			<i className="fa fa-comment-o"></i>
			<span> comment</span>
		</div>
		<div className="like">
			<i className="fa fa-thumbs-o-up"></i>
			<span> Like</span>
		</div>
		</div>
		</div>
		</>
	);

}
