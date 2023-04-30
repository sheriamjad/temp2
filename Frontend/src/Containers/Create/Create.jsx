import React, { useState } from 'react';
import './Create.css';
import { Navbar, Discard } from '../../Components/Index';
import { useNavigate } from 'react-router';

const Create = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [isCrossed, setIsCrossed] = useState(false);
    const [goBack, setGoBack] = useState(false);
    const [next, setNext] = useState(false);
    const [input, setInput] = useState({
        caption : "",
        imgTxt : ""
    });

    const handleInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInput({...input, [name] : value})
        console.log(input[name]);
    };

    const manageSelectedFile = (e) => {
        const selectedFile = e.target.files[0];

        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = function () {
            setFile(selectedFile);
        };
        filePreview(selectedFile);
    };

    const filePreview = (selectedFile) => {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = function (e) {
            setPreviewSrc(e.target.result);
        };
    };

    const createNewPost = ()=>{

    };

    return (
        <>
            <Navbar />
            <div className='create-main-container'>
                <span className="material-symbols-outlined create-container-close"
                    onClick={() => {
                        if (!file) {
                            navigate('/inscrible');
                        }
                        else {
                            setIsCrossed(true)
                        }
                    }}
                >
                    close
                </span>
                {isCrossed && (
                    file && (
                        <Discard crossState={isCrossed} setCrossState={setIsCrossed} file={setFile} back={setGoBack} setnext={setNext}/>
                    )
                )}

                {goBack && (
                    <Discard crossState={isCrossed} setCrossState={setIsCrossed} file={setFile} back={setGoBack} setnext={setNext}/>
                )}


                <div className="create-select-post">
                    <div className="create-select-post_header">
                        <span className={!file ? 'd-none' : "material-symbols-outlined back-arrow"}
                            onClick={() => {
                                setGoBack(true);
                            }}
                        >
                            chevron_left
                        </span>
                        <h5>Create New Post</h5>
                        <span className={file && !next ? 'next' : 'd-none'}
                            onClick={() => {
                                setNext(true);
                            }}
                        >
                            Next
                        </span>

                        <span className={next ? "next" : 'd-none'} onClick={createNewPost}>Share</span>
                    </div>

                    {/* BODY OF CREATE POST CONTAINER */}
                    {!file ?
                        <div className="create-select-post_body">
                            <span className="material-symbols-outlined create-select-post_body-icon">
                                imagesmode
                            </span>
                            <label htmlFor="selectedFile" className='select-post-button'>Select From Computer</label>
                            <input type="file" name="selectedFile" id="selectedFile" className='d-none' onChange={manageSelectedFile} />
                        </div>
                        :
                        !next ?
                            <div className='selected-file-preview'>
                                <img src={previewSrc} alt="No Preview" id='imgPreview' />
                            </div>
                            :
                            <>
                                <div className='creater-info'>
                                    <img src="" alt="pic" />
                                    <h4>Anna Wintour</h4>
                                </div>
                                <div className="caption-div">
                                    <textarea name="caption" id="caption" placeholder='Write a caption...' onChange={handleInput} value={input.caption}></textarea>
                                    <span class="material-symbols-outlined emoji-selector">
                                        mood
                                    </span>
                                </div>
                                <div className="img-txt-div">
                                    <textarea name="imgTxt" id="imgTxt" placeholder='Add text on image...' onChange={handleInput} value={input.imgTxt}></textarea>
                                    <span class="material-symbols-outlined emoji-selector">
                                        mood
                                    </span>
                                </div>
                            </>
                    }
                </div>


            </div>
        </>
    );
};

export default Create;
