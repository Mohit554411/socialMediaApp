if (window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', function () {
        const carouselPictures = document.getElementById('carouselPic');
        let count = 10;
        let currentIndex = 0;

        function showNextSlide() {
            currentIndex = (currentIndex + 1) % count;
            carouselPictures.src = `/images/carouselPic/image${currentIndex}.webp`;
        }

        setInterval(showNextSlide, 4000);// Change slide every 3 seconds

        document.getElementById('togglePassword').addEventListener('mouseover', (e) => {
            const password = document.getElementById('password');
            password.type = 'text';
        });
        document.getElementById('togglePassword').addEventListener('mouseout', (e) => {
            const password = document.getElementById('password');
            password.type = 'password';
        });
        

        document.querySelector('.email-btn').addEventListener
    });
}