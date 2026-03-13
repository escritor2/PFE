
// Elementos dos Modais
const storyModal = document.getElementById('story-modal');
const commentModal = document.getElementById('comment-modal');
const storyImg = document.getElementById('story-modal-img');
const storyAvatar = document.getElementById('story-modal-avatar');
const storyUsername = document.getElementById('story-modal-username');
const commentTextarea = document.getElementById('comment-text');
const submitCommentBtn = document.getElementById('submit-comment');

let currentPostForComment = null;

// Funcionalidade de Curtir
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const isLiked = this.classList.toggle('fas');
        this.classList.toggle('far', !isLiked);
        this.style.color = isLiked ? '#e74c3c' : ''; 

        const post = this.closest('.post');
        const likeCount = post.querySelector('.like-count');
        let currentLikes = parseInt(likeCount.textContent) || 0;
        likeCount.textContent = isLiked ? currentLikes + 1 : currentLikes - 1;
    });
});

// abrir modal do comentario
document.querySelectorAll('.fa-comment').forEach(btn => {
    btn.addEventListener('click', function() {
        currentPostForComment = this.closest('.post');
        commentModal.style.display = 'flex';
        commentTextarea.value = '';
        commentTextarea.focus();
    });
});

// Enviar Comentário do Modal
submitCommentBtn.addEventListener('click', function() {
    const text = commentTextarea.value.trim();
    if (text && currentPostForComment) {
        const postInfo = currentPostForComment.querySelector('.post-info');
        const timeElement = postInfo.querySelector('.time');
        
        const newComment = document.createElement('p');
        newComment.innerHTML = `<strong>Você</strong> ${text}`;
        
        postInfo.insertBefore(newComment, timeElement);
        
        commentModal.style.display = 'none';
        currentPostForComment = null;
    }
});

// Fechar story ao clicar no x
document.querySelector('.close-story').onclick = () => storyModal.style.display = 'none';
document.querySelector('.close-comment').onclick = () => commentModal.style.display = 'none';

window.onclick = (event) => {
    if (event.target == storyModal) storyModal.style.display = 'none';
    if (event.target == commentModal) commentModal.style.display = 'none';
};

// Funcionalidade de Stories
document.querySelectorAll('.story').forEach(story => {
    story.addEventListener('click', function() {
        const username = this.querySelector('span').textContent;
        const avatarSrc = this.querySelector('img').src;
        const storyImageSrc = this.getAttribute('data-story-img');
        
        // Preencher modal
        storyUsername.textContent = username;
        storyAvatar.src = avatarSrc;
        storyImg.src = storyImageSrc;
        
        // Mostrar modal
        storyModal.style.display = 'flex';
        
        // Marcar como visto (mudar borda para cinza via classe CSS)
        this.classList.add('viewed');
    });
});
