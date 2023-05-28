import React,{useContext, useEffect, useState} from 'react';
import './PostCard.css';
import { InscribleContext } from '../../Context/Context';

const PostCard = ({ username, address, file, caption, imageText, likeCount, postId,tipAmount }) => {
    const [isliked,setIsLiked] = useState(false);
    const { like,tip,tipAmountState,setTipAmountState } = useContext(InscribleContext);
    console.log("it's tipAmount  type  ", typeof(tipAmount));
    console.log("it's tipAmount  ", parseInt(tipAmount._hex, 16) / 10 ** 18);
    console.log("Post_id   ",  postId.toNumber());
    console.log("likeCount ",  likeCount );
    //setTipAmountState(parseInt(tipAmount._hex, 16) / 10 ** 18);
    console.log("tipAmountStatettttttttttttttttttt",tipAmountState);
    
    return (
        <div className='card'>
            <div className="card-header">
                <div className="card-header-image">
                    <img src={`https://gateway.pinata.cloud/ipfs/${file.substring(6)}`} alt="Profile" />
                </div>
                <h5>{username}</h5>
                <div className='card-header-address'>
                    <small>{address}</small>
                </div>
            </div>

            <div className="card-image">
                <img src={`https://gateway.pinata.cloud/ipfs/${file.substring(6)}`} alt="image" />
                <div className="card-image-text"><p>{imageText}</p></div>
            </div>

            <div className="card-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" className="heart" viewBox="0 0 20 20" onClick={() => {like(postId.toNumber())}}>
                    <path d="m 10 5 a 1 1 0 0 0 -8 5 l 8 9 l 8 -9 a -1 -1 0 0 0 -8 -5" fill={isliked? 'red':'white'} stroke='black'></path>
                </svg>
                <button className='card-content-tip' onClick={() => {tip(postId.toNumber())}}>Tip 0.1eth</button>
                
                <p>{tipAmount}</p>
                <p>{likeCount}</p>
                <h5>{username}</h5>
                <p>{caption}</p>
            </div>

            <div className="card-comment">
                <span className="material-symbols-outlined">
                    sentiment_satisfied
                </span>
                <input type="text" placeholder='Add a comment' />
                <button className='comment'>Post</button>
            </div>

        </div>
    );
};

export default PostCard;
