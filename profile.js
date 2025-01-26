const userProfile = {
    username: 'イモータル',
    displayUsername: '@xm5o_',
    avatarUrl: 'https://cdn.discordapp.com/avatars/1282747277206884436/573764a219f1e26d5c5fa09b99266210?size=1024',
    banner: {
        type: 'image',
        value: 'https://cdn.discordapp.com/banners/1282747277206884436/e2bae3491bc2ee61478bacba8c7e64af?size=4096'
    },
    bio: 'سبحان الله وبحمده سبحان الله العظيم',
    hasNitro: true,
    connections: [
        { 
            platform: 'Battle.net', 
            icon: 'battlenet.png', 
            username: 'F0m#2582', 
            link: 'https://x.com/voixj1'
        },
        { 
            platform: 'X', 
            icon: 'x.png', 
            username: 'voixj1', 
            link: 'https://x.com/voixj1'
        }
    ]
};

const sanitizeHTML = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

class DiscordProfile {
    constructor(profileData) {
        this.profileData = this.validateProfileData(profileData);
    }

    validateProfileData(data) {
        return {
            username: sanitizeHTML(data.username || ''),
            displayUsername: sanitizeHTML(data.displayUsername || ''),
            avatarUrl: isValidUrl(data.avatarUrl) ? data.avatarUrl : '',
            banner: {
                type: data.banner?.type || 'color',
                value: data.banner?.value || '#36393f'
            },
            bio: sanitizeHTML(data.bio || ''),
            hasNitro: !!data.hasNitro,
            connections: (data.connections || []).map(this.validateConnection)
        };
    }

    validateConnection(connection) {
        return {
            platform: sanitizeHTML(connection.platform || ''),
            icon: connection.icon || '',
            username: sanitizeHTML(connection.username || ''),
            link: isValidUrl(connection.link) ? connection.link : ''
        };
    }

    render() {
        const { profileData } = this;
        const profileContainer = document.getElementById('profileContainer');
        const bannerElement = document.getElementById('userBanner');
        const avatarImg = document.getElementById('userAvatar');
        
        // Apply Nitro theme
        profileContainer.classList.toggle('nitro-theme', profileData.hasNitro);

        // Set banner
        if (profileData.banner.type === 'color') {
            bannerElement.style.backgroundColor = profileData.banner.value;
        } else if (profileData.banner.type === 'image' && isValidUrl(profileData.banner.value)) {
            bannerElement.style.backgroundImage = `url('${profileData.banner.value}')`;
        }

        // Set avatar
        avatarImg.src = profileData.avatarUrl;
        avatarImg.alt = `${profileData.username}'s avatar`;

        // Set username and bio
        document.getElementById('username').textContent = profileData.username;
        document.getElementById('displayUsername').textContent = profileData.displayUsername;
        document.getElementById('userBio').textContent = profileData.bio;

        // Render connections
        this.renderConnections();
    }

    renderConnections() {
        const connectionsContainer = document.getElementById('userConnections');
        connectionsContainer.innerHTML = '';

        if (this.profileData.connections.length === 0) return;

        const connectionsTitle = document.createElement('h2');
        connectionsTitle.textContent = 'Connections';
        connectionsContainer.appendChild(connectionsTitle);

        this.profileData.connections.forEach(connection => {
            const connectionItem = document.createElement('div');
            connectionItem.classList.add('connection-item');
            
            const connectionHTML = `
                <img src="icons/${connection.icon}" 
                     class="connection-icon" 
                     alt="${connection.platform} icon">
                <span>
                    ${connection.platform}: 
                    ${connection.link 
                        ? `<a href="${connection.link}" class="connection-link" target="_blank" rel="noopener noreferrer">${connection.username}</a>` 
                        : connection.username
                    }
                </span>
            `;
            
            connectionItem.innerHTML = connectionHTML;
            connectionsContainer.appendChild(connectionItem);
        });
    }
}

// Profile data

// Initialize profile on page load
document.addEventListener('DOMContentLoaded', () => {
    const profile = new DiscordProfile(userProfile);
    profile.render();
});