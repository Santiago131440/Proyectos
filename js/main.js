// Posts array - will be populated from HTML data attributes
let posts = [];
let currentFilter = 'all';

const connections = [
    { name: "María Contreras", title: "Frontend Developer en Google", avatar: "MC", mutual: 45 },
    { name: "Juan Pérez", title: "Data Scientist en Microsoft", avatar: "JP", mutual: 32 },
    { name: "Elena Torres", title: "Product Manager en Amazon", avatar: "ET", mutual: 28 },
    { name: "Roberto Silva", title: "Backend Engineer en Meta", avatar: "RS", mutual: 51 },
    { name: "Carmen López", title: "UX Designer en Apple", avatar: "CL", mutual: 39 },
    { name: "Miguel Ángel", title: "DevOps Engineer en Netflix", avatar: "MA", mutual: 22 },
    { name: "Isabel García", title: "Marketing Manager en Spotify", avatar: "IG", mutual: 47 },
    { name: "Fernando Ruiz", title: "ML Engineer en Tesla", avatar: "FR", mutual: 19 }
];

const jobs = [
    {
        title: "Senior Full Stack Developer",
        company: "TechCorp Innovation",
        location: "Remoto",
        logo: "TC",
        time: "Publicado hace 2 días",
        applicants: "34 solicitantes",
        tags: ["React", "Node.js", "AWS"]
    },
    {
        title: "Data Scientist",
        company: "AI Solutions Inc",
        location: "Madrid, España",
        logo: "AI",
        time: "Publicado hace 1 semana",
        applicants: "87 solicitantes",
        tags: ["Python", "Machine Learning", "TensorFlow"]
    },
    {
        title: "Product Manager",
        company: "StartupX",
        location: "Barcelona, España",
        logo: "SX",
        time: "Publicado hace 3 días",
        applicants: "156 solicitantes",
        tags: ["Agile", "Product Strategy", "Analytics"]
    },
    {
        title: "UX/UI Designer",
        company: "Design Studio Pro",
        location: "Remoto",
        logo: "DS",
        time: "Publicado hace 5 días",
        applicants: "92 solicitantes",
        tags: ["Figma", "User Research", "Prototyping"]
    },
    {
        title: "DevOps Engineer",
        company: "Cloud Systems Ltd",
        location: "Valencia, España",
        logo: "CS",
        time: "Publicado hace 1 día",
        applicants: "43 solicitantes",
        tags: ["Docker", "Kubernetes", "CI/CD"]
    }
];

let currentPostDetail = null;
let currentMediaIndex = 0;

// Initialize
function initializeApp() {
    loadPostsFromHTML();
    renderPosts();
    initializeConnections();
    initializeJobs();
    updateActiveNav();
}

// Load posts from HTML data attributes
function loadPostsFromHTML() {
    const postElements = document.querySelectorAll('#feed-posts .post-card');
    posts = Array.from(postElements).map((el, index) => {
        const images = el.dataset.images ? el.dataset.images.split(',') : [];
        return {
            id: index + 1,
            author: el.dataset.author,
            avatar: el.dataset.avatar,
            headline: el.dataset.headline,
            time: el.dataset.time,
            category: el.dataset.category || 'all',
            content: el.dataset.content,
            images: images,
            github: el.dataset.github || '',
            demo: el.dataset.demo || '',
            likes: parseInt(el.dataset.likes) || 0,
            comments: parseInt(el.dataset.comments) || 0,
            shares: parseInt(el.dataset.shares) || 0,
            hasLiked: el.dataset.hasliked === 'true'
        };
    });
}

// Filter projects
function filterProjects(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // Render filtered posts
    renderPosts();
}

// Navigation
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`${page}-page`).classList.add('active');
    updateActiveNav(page);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateActiveNav(activePage = 'home') {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === activePage) {
            item.classList.add('active');
        }
    });
}

// Render posts
function renderPosts() {
    const feedContainer = document.getElementById('feed-posts');
    feedContainer.innerHTML = '';
    
    const filteredPosts = currentFilter === 'all' 
        ? posts 
        : posts.filter(post => post.category === currentFilter);
    
    if (filteredPosts.length === 0) {
        feedContainer.innerHTML = `
            <div class="card" style="padding: 48px; text-align: center;">
                <h3 style="margin-bottom: 8px; color: var(--text-secondary);">No hay proyectos en esta categoría</h3>
                <p style="color: var(--text-secondary);">Prueba con otro filtro</p>
            </div>
        `;
        return;
    }
    
    filteredPosts.forEach(post => {
        feedContainer.innerHTML += createPostHTML(post);
    });
}

// Create post HTML
function createPostHTML(post) {
    const galleryClass = getGalleryClass(post.images.length);
    const truncated = post.content.length > 200 ? 'truncated' : '';
    const displayContent = post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content;
    
    let galleryHTML = '';
    if (post.images.length > 0) {
        galleryHTML = `<div class="post-gallery ${galleryClass}">`;
        post.images.slice(0, 4).forEach((img, idx) => {
            if (idx === 3 && post.images.length > 4) {
                galleryHTML += `
                    <div class="gallery-item" onclick="openPostDetail(${post.id}, ${idx})">
                        <img src="${img}" alt="Imagen del proyecto ${post.author}" loading="lazy">
                        <div class="gallery-more">+${post.images.length - 4}</div>
                    </div>
                `;
            } else {
                galleryHTML += `
                    <div class="gallery-item" onclick="openPostDetail(${post.id}, ${idx})">
                        <img src="${img}" alt="Imagen del proyecto ${post.author}" loading="lazy">
                    </div>
                `;
            }
        });
        galleryHTML += '</div>';
    }

    const avatarHTML = post.avatar.startsWith('http') 
        ? `<img src="${post.avatar}" alt="${post.author}" loading="lazy">`
        : post.avatar;

    return `
        <div class="card post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-avatar">${avatarHTML}</div>
                <div class="post-info">
                    <div class="post-author">${post.author}</div>
                    <div class="post-meta">${post.headline} • ${post.time}</div>
                </div>
                <button class="post-menu-btn" aria-label="Más opciones">⋯</button>
            </div>
            <div class="post-content ${truncated}" onclick="${post.images.length === 0 ? `openPostDetail(${post.id}, 0)` : ''}">
                ${displayContent}
                ${post.content.length > 200 ? `<span class="see-more" onclick="openPostDetail(${post.id}, 0)">...ver más</span>` : ''}
            </div>
            ${galleryHTML}
            <div class="post-stats">
                <div class="post-reactions">
                    <div class="reaction-icons">
                        <span class="reaction-icon like-icon">👍</span>
                        <span class="reaction-icon love-icon">❤️</span>
                        <span class="reaction-icon celebrate-icon">🎉</span>
                    </div>
                    <span>${post.likes}</span>
                </div>
                <div>
                    <span>${post.comments} comentarios • ${post.shares} veces compartido</span>
                </div>
            </div>
            <div class="post-actions">
                <button class="post-action ${post.hasLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})" aria-label="Me gusta">
                    <span class="post-action-icon"><i class="fi fi-rr-heart"></i></span>
                    <span>Me gusta</span>
                </button>
                <button class="post-action" onclick="toggleComments(${post.id})" aria-label="Comentar">
                    <span class="post-action-icon"><i class="fi fi-rr-comment"></i></span>
                    <span>Comentar</span>
                </button>
                <button class="post-action" aria-label="Compartir">
                    <span class="post-action-icon"><i class="fi fi-rr-refresh"></i></span>
                    <span>Compartir</span>
                </button>
                <button class="post-action" aria-label="Enviar">
                    <span class="post-action-icon"><i class="fi fi-rr-paper-plane"></i></span>
                    <span>Enviar</span>
                </button>
            </div>
            <div class="comments-section" id="comments-${post.id}">
                <div class="comment">
                    <div class="comment-avatar"><img src="https://i.pravatar.cc/150?img=8" alt="Juan Pérez" loading="lazy"></div>
                    <div>
                        <div class="comment-content">
                            <div class="comment-author">Juan Pérez</div>
                            <div class="comment-text">¡Felicidades! Muy buen trabajo 👏</div>
                        </div>
                        <div class="comment-time">3h • Me gusta • Responder</div>
                    </div>
                </div>
                <div class="add-comment">
                    <div class="comment-avatar">
                        <img src="https://avatars.githubusercontent.com/u/98182135?v=4" alt="Tu avatar" loading="lazy">
                    </div>
                    <input type="text" placeholder="Añade un comentario..." onkeypress="handleCommentEnter(event, ${post.id})" aria-label="Añadir comentario">
                </div>
            </div>
        </div>
    `;
}

function getGalleryClass(count) {
    if (count === 1) return 'single';
    if (count === 2) return 'double';
    if (count === 3) return 'triple';
    if (count === 4) return 'quad';
    return 'many';
}

// Post detail
function openPostDetail(postId, mediaIndex = 0) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    currentPostDetail = post;
    currentMediaIndex = mediaIndex;

    const overlay = document.getElementById('postDetailOverlay');
    const avatarHTML = post.avatar.startsWith('http') 
        ? `<img src="${post.avatar}" alt="${post.author}" loading="lazy">`
        : post.avatar;

    document.getElementById('detailAvatar').innerHTML = avatarHTML;
    document.getElementById('detailAuthor').textContent = post.author;
    document.getElementById('detailMeta').textContent = `${post.headline} • ${post.time}`;
    document.getElementById('detailContent').textContent = post.content;
    document.getElementById('detailLikes').textContent = post.likes;
    document.getElementById('detailComments').textContent = `${post.comments} comentarios`;

    // Add project links if available
    const projectLinks = document.getElementById('projectLinks');
    if (post.github || post.demo) {
        projectLinks.style.display = 'flex';
        projectLinks.innerHTML = '';
        
        if (post.github) {
            projectLinks.innerHTML += `
                <a href="${post.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                    💻 Ver Código
                </a>
            `;
        }
        
        if (post.demo) {
            projectLinks.innerHTML += `
                <a href="${post.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
                    🚀 Ver Demo
                </a>
            `;
        }
    } else {
        projectLinks.style.display = 'none';
    }

    if (post.images.length > 0) {
        document.querySelector('.post-detail-media').style.display = 'flex';
        document.getElementById('detailMediaImage').src = post.images[mediaIndex];
        document.getElementById('photoCounter').textContent = `${mediaIndex + 1} / ${post.images.length}`;
        document.getElementById('prevMediaBtn').style.display = post.images.length > 1 ? 'block' : 'none';
        document.getElementById('nextMediaBtn').style.display = post.images.length > 1 ? 'block' : 'none';
    } else {
        document.querySelector('.post-detail-media').style.display = 'none';
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closePostDetail() {
    document.getElementById('postDetailOverlay').classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    currentPostDetail = null;
}

function navigateMedia(direction) {
    if (!currentPostDetail || currentPostDetail.images.length === 0) return;

    currentMediaIndex += direction;
    if (currentMediaIndex < 0) currentMediaIndex = currentPostDetail.images.length - 1;
    if (currentMediaIndex >= currentPostDetail.images.length) currentMediaIndex = 0;

    document.getElementById('detailMediaImage').src = currentPostDetail.images[currentMediaIndex];
    document.getElementById('photoCounter').textContent = `${currentMediaIndex + 1} / ${currentPostDetail.images.length}`;
}

// Initialize connections
function initializeConnections() {
    const grid = document.getElementById('connections-grid');
    connections.forEach(conn => {
        const gradient = getRandomGradient();
        grid.innerHTML += `
            <div class="connection-card">
                <div class="connection-cover" style="background: ${getRandomGradient()};"></div>
                <div class="connection-avatar" style="background: ${gradient};">${conn.avatar}</div>
                <div class="connection-info">
                    <div class="connection-name">${conn.name}</div>
                    <div class="connection-title">${conn.title}</div>
                    <div class="connection-mutual">${conn.mutual} conexiones en común</div>
                    <button class="btn-secondary" style="width: 100%;" aria-label="Enviar mensaje a ${conn.name}">Mensaje</button>
                </div>
            </div>
        `;
    });
}

// Initialize jobs
function initializeJobs() {
    const list = document.getElementById('jobs-list');
    jobs.forEach(job => {
        const gradient = getRandomGradient();
        list.innerHTML += `
            <div class="job-card">
                <div class="job-header">
                    <div class="job-logo" style="background: ${gradient};">${job.logo}</div>
                    <div class="job-info">
                        <div class="job-title">${job.title}</div>
                        <div class="job-company">${job.company}</div>
                        <div class="job-location">📍 ${job.location}</div>
                    </div>
                </div>
                <div class="job-details">${job.time} • ${job.applicants}</div>
                <div class="job-tags">
                    ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    });
}

// Random gradient generator
function getRandomGradient() {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// Toggle like
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    
    if (!postElement) return;
    
    const likeButton = postElement.querySelector('.post-action');
    const likesCount = postElement.querySelector('.post-reactions span:last-child');
    
    if (post.hasLiked) {
        post.likes--;
        post.hasLiked = false;
        likeButton.classList.remove('liked');
    } else {
        post.likes++;
        post.hasLiked = true;
        likeButton.classList.add('liked');
    }
    
    likesCount.textContent = post.likes;
}

function toggleDetailLike() {
    if (!currentPostDetail) return;
    toggleLike(currentPostDetail.id);
    document.getElementById('detailLikes').textContent = currentPostDetail.likes;
}

// Toggle comments section
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    commentsSection.classList.toggle('active');
}

// Handle comment enter
function handleCommentEnter(event, postId) {
    if (event.key === 'Enter' && event.target.value.trim()) {
        addComment(postId, event.target.value);
        event.target.value = '';
    }
}

// Add comment
function addComment(postId, text) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    const addCommentDiv = commentsSection.querySelector('.add-comment');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-avatar">
            <img src="https://avatars.githubusercontent.com/u/98182135?v=4" alt="Tu avatar" loading="lazy">
        </div>
        <div>
            <div class="comment-content">
                <div class="comment-author">Tú</div>
                <div class="comment-text">${escapeHtml(text)}</div>
            </div>
            <div class="comment-time">Ahora • Me gusta • Responder</div>
        </div>
    `;
    commentsSection.insertBefore(newComment, addCommentDiv);
    
    const post = posts.find(p => p.id === postId);
    post.comments++;
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const commentsCount = postElement.querySelector('.post-stats > div:last-child span');
    commentsCount.textContent = `${post.comments} comentarios • ${post.shares} veces compartido`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Create new post
function createNewPost() {
    const text = prompt('¿Qué quieres compartir?');
    if (text && text.trim()) {
        const newPost = {
            id: posts.length + 1,
            author: 'Santiago Sterling',
            avatar: 'https://avatars.githubusercontent.com/u/98182135?v=4',
            headline: 'Profesional',
            time: 'Ahora',
            category: 'all',
            content: text,
            images: [],
            github: '',
            demo: '',
            likes: 0,
            comments: 0,
            shares: 0,
            hasLiked: false
        };
        posts.unshift(newPost);
        renderPosts();
    }
}

// Create post with images
function createPostWithImages() {
    const text = prompt('¿Qué quieres compartir?');
    if (text && text.trim()) {
        const numImages = parseInt(prompt('¿Cuántas imágenes? (1-5)', '1'));
        const images = [];
        
        if (numImages > 0 && numImages <= 5) {
            for (let i = 0; i < numImages; i++) {
                const url = prompt(`URL de la imagen ${i + 1}:`, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800');
                if (url) images.push(url);
            }
        }
        
        const newPost = {
            id: posts.length + 1,
            author: 'Santiago Sterling',
            avatar: 'https://avatars.githubusercontent.com/u/98182135?v=4',
            headline: 'Profesional',
            time: 'Ahora',
            category: 'all',
            content: text,
            images: images,
            github: '',
            demo: '',
            likes: 0,
            comments: 0,
            shares: 0,
            hasLiked: false
        };
        posts.unshift(newPost);
        renderPosts();
    }
}

// Chat functions
function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    chatWidget.classList.toggle('active');
}

function minimizeChat() {
    // In a real app, this would minimize the chat
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message) {
        const messagesContainer = document.getElementById('chatMessages');
        const newMessage = document.createElement('div');
        newMessage.className = 'chat-message own';
        newMessage.innerHTML = `
            <div class="chat-message-avatar">TU</div>
            <div class="chat-message-content">${escapeHtml(message)}</div>
        `;
        messagesContainer.appendChild(newMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.value = '';
        
        // Simulate response
        setTimeout(() => {
            const response = document.createElement('div');
            response.className = 'chat-message';
            response.innerHTML = `
                <div class="chat-message-avatar">MC</div>
                <div class="chat-message-content">¡Por supuesto! Suena genial 😊</div>
            `;
            messagesContainer.appendChild(response);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1500);
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Close post detail on escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePostDetail();
    }
});

// Close post detail when clicking outside
document.getElementById('postDetailOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closePostDetail();
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
