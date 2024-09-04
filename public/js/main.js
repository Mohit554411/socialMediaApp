if (window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', function () {
        // landing page carousal
        const carouselPictures = document.getElementById('carouselPic');
        let count = 10;
        let currentIndex = 0;
        function showNextSlide() {
            currentIndex = (currentIndex + 1) % count;
            carouselPictures.src = `/images/carouselPic/image${currentIndex}.webp`;
        }
        setInterval(showNextSlide, 4000);// Change slide every 3 seconds
        // password view or hide 
        document.querySelectorAll('.togglePassword').forEach(ele => {
            ele.addEventListener('mouseover', (e) => {
                console.log(e.target);
                const password = e.target.previousElementSibling;
                password.type = 'text';
            });
        });
        document.querySelectorAll('.togglePassword').forEach(ele => {
            ele.addEventListener('mouseout', (e) => {
                const password = e.target.previousElementSibling;
                password.type = 'password';
            });
        });
        // show signUp card or register card
        document.querySelector('.showSignUpBtn').addEventListener('click', (e) => {
            document.querySelector('.loginSection').style.display = 'none';
            document.querySelector('.signUpSection1').style.display = 'block';
        });
        // show login card from signUp card or back to login card from signUP
        document.querySelectorAll('.showLoginBtn').forEach(ele => {
            ele.addEventListener('click', (e) => {
                if (document.querySelector('.signUpSection1'))
                    document.querySelector('.signUpSection1').style.display = 'none';
                else
                    document.querySelector('.signUpSection2').style.display = 'none';
                document.querySelector('.loginSection').style.display = 'block';
            });
        });
        // continue with email button in signUp card
        document.querySelector('.email-btn').addEventListener('click', (e) => {
            document.querySelector('.signUpSection1').style.display = 'none';
            document.querySelector('.signUpSection2').style.display = 'block';
        });
        // back to signUp card 1 from signUp card2
        document.querySelector('.backButton').addEventListener('click', e => {
            document.querySelector('.signUpSection2').style.display = 'none';
            document.querySelector('.signUpSection1').style.display = 'block';
        });
        // show forgot password card
        document.querySelector('.change-password').addEventListener('click', e => {
            document.querySelector('.loginSection').style.display = 'none';
            document.querySelector('.forgotPasswordSec').style.display = 'block';
        });
        // back to login page from forgot password card
        document.querySelector('.backToLogin').addEventListener('click', e => {
            document.querySelector('.forgotPasswordSec').style.display = 'none';
            document.querySelector('.loginSection').style.display = 'block';
        });
        // login event, when user click on login button
        document.querySelector('.loginForm').addEventListener('submit', e => {
            e.preventDefault();
            const formData = document.querySelector('.loginForm');
            const loginData = Object.fromEntries(new FormData(formData).entries());
            fetch('./login', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/Json"
                },
                body: JSON.stringify(loginData)
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        localStorage.setItem('user', JSON.stringify(res.user));
                        window.location.href = './home';
                    } else if (res.error) {
                        alert(res.error);
                    }
                }).catch(error => {
                    console.log(error);
                });
        });
        // register user or signUp
        document.querySelector('.signUpForm').addEventListener('submit', e => {
            e.preventDefault();
            const formData = document.querySelector('.signUpForm');
            const signUpData = Object.fromEntries(new FormData(formData).entries());
            fetch('./signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/Json"
                },
                body: JSON.stringify(signUpData)
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        document.querySelector('.signUpSection2').style.display = 'none';
                        document.querySelector('.loginSection').style.display = 'block';
                    } else if (res.error) {
                        alert(res.error);
                    }
                }).catch(error => {
                    console.log(error);
                });
        });
        // forgot password form event
        document.querySelector('.forgotPassForm').addEventListener('submit', e => {
            e.preventDefault();
            const formData = document.querySelector('.forgotPassForm');
            const email = Object.fromEntries(new FormData(formData).entries());
            fetch('verifyEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json'
                },
                body: JSON.stringify(email)
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        alert(res.success);
                        document.querySelector('.otpInputField').style.display = 'block';
                    } else if (res.error) {
                        alert(res.error);
                    }
                }).catch(error => {
                    console.log(error);
                })
        });
    });
}
else if (window.location.pathname === '/home') {
    document.addEventListener('DOMContentLoaded', function () {
        // const user = JSON.parse(localStorage.getItem('user'));
        // document.querySelector('.userName').textContent = user.name;

        function attachedEditEvent() {
            document.querySelectorAll('.postEditIcon').forEach(postEdit => {
                const post = postEdit.nextElementSibling;
                post.style.display = 'none'; // Initially hide all posts

                postEdit.addEventListener('click', e => {
                    document.querySelectorAll('.postEditIcon').forEach(postEdit => {
                        const post = postEdit.nextElementSibling;
                        if (post.style.display === 'block') {
                            post.style.display = 'none';
                        }
                    });
                    e.stopPropagation();
                    const post = e.currentTarget.nextElementSibling;
                    if (post.style.display === 'block') {
                        post.style.display = 'none';
                    } else {
                        post.style.display = 'block';
                    }
                });
            });

            document.addEventListener('click', () => {
                document.querySelectorAll('.postEditIcon').forEach(postEdit => {
                    const post = postEdit.nextElementSibling;
                    if (post.style.display === 'block') {
                        post.style.display = 'none';
                    }
                });
                document.querySelector('.logOutIcon').style.display = 'none';
            });

            document.querySelectorAll('.postEdit').forEach(editButton => {
                editButton.addEventListener('click', (e) => {
                    document.querySelectorAll('.postEdit').forEach(editButton => {
                        const postContent = editButton.closest('.post-header').nextElementSibling;
                        const paragraph = postContent.querySelector('p');
                        paragraph.setAttribute('contenteditable', false);
                    });
                    e.stopPropagation();
                    const postContent = editButton.closest('.post-header').nextElementSibling;
                    const paragraph = postContent.querySelector('p');
                    paragraph.classList = 'post-edit-style';
                    const isEditable = paragraph.getAttribute('contenteditable') === 'true';
                    paragraph.setAttribute('contenteditable', !isEditable);
                    if (!isEditable) {
                        paragraph.focus(); // Focus the paragraph to start editing
                    }
                });
            });

            document.querySelectorAll('.postDel').forEach(deleteButton => {
                deleteButton.addEventListener('click', () => {
                    const post = deleteButton.closest('.post');
                    if (post) {
                        fetch('./deletePost', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ postId: post.id })
                        }).then(res => res.json())
                            .then(res => {
                                if (res.success) {
                                post.remove();
                                }
                                else if (res.error) {
                                    alert(res.error);
                                }
                            }).catch(error => {
                                console.log(error);
                            });    
                    }
                });
            });
        }
        // attachedEditEvent();
        //Post Uploading
        document.getElementById('post-image-uploader').addEventListener('click', function () {
            document.getElementById('fileImageInput').click();
        });

        let postImgFile;

        document.getElementById('fileImageInput').addEventListener('change', function (event) {
            postImgFile = event.target.files[0];
            if (postImgFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const preview = document.getElementById('preview');
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                reader.readAsDataURL(postImgFile);
            }
        });

        document.querySelector('.post-upload').addEventListener('click', (e) => {
            e.preventDefault();
            const postContent = document.getElementById('post-content').value;
            const formData = new FormData();
            formData.append('postContent', postContent);
            formData.append('Postfile', postImgFile);
            fetch('./uploadPost', {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        document.getElementById('post-content').value = '';
                        const preview = document.getElementById('preview');
                        preview.style.display = 'none';
                        const postBox = document.querySelector('.post-box');
                        const newPost = document.createElement('div');
                        newPost.classList.add('post');
                        newPost.id = res.newPost.id;
                        newPost.innerHTML = `
                    <div class="post-header">
                    <div>
                        <img src="images/profilePic.png" alt="John Carter" class="post-user-img">
                        <section>
                            <h4>${res.newPost.userName}</h4>
                            <p class="time-difference" data-created-at="${res.newPost.time}">${timeDifference(res.newPost.time)}</p>
                        </section>
                    </div>
                    <div>
                        <span class="postEditIcon">
                            <svg  width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-three-dots-vertical"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path> </g></svg>
                        </span>
                        <div class="postEditCon">
                            <div class="postEdit">Edit</div>
                            <div class="postDel">Delete</div>
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    <p>${res.newPost.content}</p>
                    <img src="/images/postUploadFile/${res.newPost.fileName}" alt="Post Image" class="post-img">
                </div>
                <div class="post-footer">
                    <div class="like" >
                            <img src="images/like.svg" alt="like" class="like-img" onclick="toggleLike(${res.newPost.id},event)"/>
                        <b>${res.newPost.likes}</b></div>
                    <div class="comment"> <span>
                            <svg width="24px" height="24px" viewBox="0 0 32 32" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>comment-1</title>
                                    <desc>Created with Sketch Beta.</desc>
                                    <defs> </defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                        sketch:type="MSPage">
                                        <g id="Icon-Set" sketch:type="MSLayerGroup"
                                            transform="translate(-100.000000, -255.000000)" fill="#000000">
                                            <path
                                                d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z"
                                                id="comment-1" sketch:type="MSShapeGroup"> </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span><b>${res.newPost.comments}</b></div>
                    <div class="share"> <span>
                            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 16 16" id="share-16px"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path id="Path_38" data-name="Path 38"
                                        d="M-12.121,10.879a2.976,2.976,0,0,0-.292.355l-4.73-2.364A2.985,2.985,0,0,0-17,8a2.985,2.985,0,0,0-.143-.87l4.73-2.364a2.976,2.976,0,0,0,.292.355A2.989,2.989,0,0,0-10,6a2.989,2.989,0,0,0,2.121-.878A2.982,2.982,0,0,0-7,3,2.982,2.982,0,0,0-7.879.879a3,3,0,0,0-4.242,0A2.978,2.978,0,0,0-13,3a2.985,2.985,0,0,0,.143.87l-4.73,2.364a2.975,2.975,0,0,0-.292-.355,3,3,0,0,0-4.242,0A2.978,2.978,0,0,0-23,8a2.978,2.978,0,0,0,.879,2.121A2.989,2.989,0,0,0-20,11a2.989,2.989,0,0,0,2.121-.878,2.976,2.976,0,0,0,.292-.355l4.73,2.364A2.985,2.985,0,0,0-13,13a2.978,2.978,0,0,0,.879,2.121A2.989,2.989,0,0,0-10,16a2.989,2.989,0,0,0,2.121-.878A2.982,2.982,0,0,0-7,13a2.982,2.982,0,0,0-.879-2.121A3,3,0,0,0-12.121,10.879ZM-12,3a1.986,1.986,0,0,1,.586-1.414A1.993,1.993,0,0,1-10,1a1.993,1.993,0,0,1,1.414.585A1.986,1.986,0,0,1-8,3a1.986,1.986,0,0,1-.586,1.414,2,2,0,0,1-2.828,0A1.986,1.986,0,0,1-12,3Zm-9.414,6.414A1.986,1.986,0,0,1-22,8a1.986,1.986,0,0,1,.586-1.414A1.993,1.993,0,0,1-20,6a1.993,1.993,0,0,1,1.414.585A1.986,1.986,0,0,1-18,8a1.986,1.986,0,0,1-.586,1.414A2,2,0,0,1-21.414,9.414Zm10,5A1.986,1.986,0,0,1-12,13a1.986,1.986,0,0,1,.586-1.414A1.993,1.993,0,0,1-10,11a1.993,1.993,0,0,1,1.414.585A1.986,1.986,0,0,1-8,13a1.986,1.986,0,0,1-.586,1.414A2,2,0,0,1-11.414,14.414Z"
                                        transform="translate(23 -0.001)"></path>
                                </g>
                            </svg>
                        </span><b>${res.newPost.share}</b></div>
                    <input type="text" placeholder="Write your comment" class="comment-input">
                </div>`;
                        postBox.insertAdjacentElement('afterend', newPost);
                        attachedEditEvent();
                        updateTimeDifference();
                    }
                    else if (res.error) {
                        alert(res.error);
                    }
                }).catch(error => {
                    console.log(error);
                })
        });
        function timeDifference(createdAt) {
            const now = Date.now();
            const diff = now - createdAt;

            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (seconds < 60) {
                return 'now';
            } else if (minutes < 60) {
                return `${minutes} minutes ago`;
            } else if (hours < 24) {
                return `${hours} hours ago`;
            } else {
                return `${days} days ago`;
            }
        }
        function updateTimeDifference() {
            const timeElements = document.querySelectorAll('.time-difference');
            timeElements.forEach(element => {
                const createdAt = element.getAttribute('data-created-at');
                element.textContent = timeDifference(Number(createdAt));
            });
        }
        // Update the time difference every minute (60000 milliseconds)
        setInterval(updateTimeDifference, 60000);

        // Call updateTimeDifference immediately to set the initial time difference
        // updateTimeDifference();


        
    });
    document.querySelector('.logoutCont').addEventListener('click', e => {
        e.stopPropagation();
        document.querySelector('.logOutIcon').style.display = 'block';
    });
    document.querySelector('.logOutIcon').addEventListener('click', e => {
        window.location.href = '/logout';
    });
}

function toggleLike(postId,event){
    console.log(event)
    const likeCount = event.currentTarget.nextElementSibling;
    fetch('./togglePostLike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({postId})
    }).then(res => res.json())
    .then(res => {
        if(res.action){
            likeCount.textContent = res.like;
            event.target.src = 'images/liked.svg';  
        }else {
            likeCount.textContent = res.like;
            event.target.src = 'images/like.svg'; 
        }
    }).catch(error => {
        console.log(error);
    });
}