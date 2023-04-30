import React from 'react';
import './PostCard.css';

const PostCard = ({ src }) => {
    return (
        <div className='card'>
            <div className="card-header">
                <div className="card-header-image">
                    <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?
                    ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=
                    format&fit=crop&w=1170&q=80' alt="Profile" />
                </div>
                <h5>Ana Wintour</h5>
                <div className='card-header-address'>
                    <small>0x00fertjfdti84578392htofjlsrt748946739</small>
                </div>
            </div>

            <div className="card-image">
                <img src={src} alt="image" />
                <div className="card-image-text"><p>Hello</p></div>
            </div>

            <div className="card-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" className="heart" viewBox="0 0 20 20">
                    <path d="m 10 5 a 1 1 0 0 0 -8 5 l 8 9 l 8 -9 a -1 -1 0 0 0 -8 -5" fill='white' stroke='black'></path>
                </svg>
                <button className='card-content-tip'>Tip 0.1eth</button>
                <p>1 like</p>
                <p><h5>Anna Wintour</h5>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
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
