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
        document.querySelectorAll('.togglePassword').forEach(ele=>{
            ele.addEventListener('mouseover', (e) => {
                console.log(e.target);
                const password = e.target.previousElementSibling;
                password.type = 'text';
            });
        });
        document.querySelectorAll('.togglePassword').forEach(ele=>{
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
        document.querySelector('.forgotPassForm').addEventListener('submit',e=>{
            e.preventDefault();
            const formData = document.querySelector('.forgotPassForm');
            const email = Object.fromEntries(new FormData(formData).entries());
            fetch('verifyEmail',{
                method: 'POST',
                headers: {  
                    'Content-Type':'application/Json'
                },
                body: JSON.stringify(email)
            }).then(res=>res.json())
            .then(res=>{
                if(res.success){
                    alert(res.success);
                    document.querySelector('.otpInputField').style.display = 'block';
                }else if(res.error){
                    alert(res.error);
                }
            }).catch(error=>{
                console.log(error);
            })
        });
    });
}
else if(window.location.pathname === '/home'){
    document.addEventListener('DOMContentLoaded',function(){
        // const user = JSON.parse(localStorage.getItem('user'));
        // document.querySelector('.userName').textContent = user.name;

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
                    post.remove();
                }
            });
        });
        
    });
}