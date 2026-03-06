document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Alternar entre coração vazio e preenchido
        this.classList.toggle('fas');
        this.style.color = this.classList.contains('fas') ? '#e74c3c' : ''; 
        const likeCount = this.closest('.post').querySelector('.like-count');
        likeCount.textContent = parseInt(likeCount.textContent) + (this.classList.contains('fas') ? 1 : -1);
    });
});
