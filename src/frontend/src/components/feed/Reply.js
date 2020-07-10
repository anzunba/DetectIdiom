import React, {useEffect, Fragment}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButtons from './IconButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getReply } from '../../actions/reply';
import reply from '../../reducers/reply';
import ReplyDelete from './ReplyDelete'
const Reply = (props) =>{
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getReply(props.comment.id))
	}, [])

	// const message1 =
	// 	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
	const replys= useSelector((state) => state.reply);
	console.log(replys)
	return (
		<React.Fragment>
			{replys.length>0? replys.map((reply, i)=>{
				return(
				<Fragment key={i}><div className="d-flex justify-content-between">
					<div>
				<div className="profileImg">
					<Avatar alt="" src={reply.profile.profile_img} />
				</div>
				<div className="commentContent">
					<small>{reply.content}</small><br/>
					<Typography component="span" variant="body2" color="textPrimary">
						{reply.content}
					</Typography>
					
					{/* <div><IconButtons /></div> */}
				</div>
				</div>
				<ReplyDelete replyId={reply.id}/>
				</div>
				</Fragment>)
			}):<p className="mb-2 ml-3">Write the first reply :)</p>}
			
		</React.Fragment>
	);
}
export default Reply;