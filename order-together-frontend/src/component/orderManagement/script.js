document.addEventListener('DOMContentLoaded', () => {
    const completeButtons = document.querySelectorAll('.complete-btn');
    const popup = document.getElementById('rating-popup');
    const closeButton = document.querySelector('.close-btn');
    const stars = document.querySelectorAll('.star');
    const reviewText = document.getElementById('review-text');
    const sendReviewButton = document.getElementById('send-review');
    let selectedRating = 0;

    completeButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = star.getAttribute('data-rating');
            highlightStars(rating);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(selectedRating);
        });

        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-rating');
            highlightStars(selectedRating);
        });
    });

    sendReviewButton.addEventListener('click', () => {
        const review = reviewText.value;
        if (selectedRating && review) {
            alert(`Rating: ${selectedRating} stars\nReview: ${review}`);
            popup.style.display = 'none';
            reviewText.value = '';
            highlightStars(0);
            selectedRating = 0;
        } else {
            alert('Please provide a rating and a review.');
        }
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-rating') <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }
});
