// Enhanced Discord Server Modal with API Integration
const discordModal = document.getElementById('discordModal');
const joinCommunityBtn = document.querySelector('.discord-cta');
const closeModal = document.querySelector('.close-modal');

// Configuration - Replace with your server details
const serverConfig = {
  serverId: "YOUR_SERVER_ID", // Replace with your Discord server ID
  inviteCode: "WBQssXDfKJ", // Your invite code
  name: "- X D - Community",
  description: "Join our creative developer community where we share knowledge, collaborate on projects, and grow together as developers.",
  icon: "assets/image.jpg", // Path to your server icon
  banner: "assets/server-banner.jpg", // Optional: Path to server banner image
  fallbackMembers: 128,
  fallbackOnline: 42
};

// Discord API integration
async function fetchDiscordServerData() {
  try {
    // Method 1: Using Discord Widget API (requires widget to be enabled in server settings)
    const widgetResponse = await fetch(`https://discord.com/api/guilds/${serverConfig.serverId}/widget.json`);
    
    if (widgetResponse.ok) {
      const widgetData = await widgetResponse.json();
      return {
        name: widgetData.name || serverConfig.name,
        members: widgetData.presence_count || serverConfig.fallbackMembers,
        online: widgetData.presence_count || serverConfig.fallbackOnline,
        icon: widgetData.instant_invite ? `https://cdn.discordapp.com/icons/${serverConfig.serverId}/${widgetData.instant_invite.guild.icon}.png` : serverConfig.icon
      };
    }
    
    // Method 2: Fallback to invite API
    const inviteResponse = await fetch(`https://discord.com/api/v10/invites/${serverConfig.inviteCode}?with_counts=true`);
    
    if (inviteResponse.ok) {
      const inviteData = await inviteResponse.json();
      return {
        name: inviteData.guild.name || serverConfig.name,
        members: inviteData.approximate_member_count || serverConfig.fallbackMembers,
        online: inviteData.approximate_presence_count || serverConfig.fallbackOnline,
        icon: inviteData.guild.icon ? 
          `https://cdn.discordapp.com/icons/${inviteData.guild.id}/${inviteData.guild.icon}.png` : 
          serverConfig.icon,
        banner: inviteData.guild.banner ? 
          `https://cdn.discordapp.com/banners/${inviteData.guild.id}/${inviteData.guild.banner}.png?size=1024` : 
          serverConfig.banner
      };
    }
    
    throw new Error('API requests failed');
    
  } catch (error) {
    console.warn('Failed to fetch Discord data, using fallback:', error);
    return {
      name: serverConfig.name,
      members: serverConfig.fallbackMembers,
      online: serverConfig.fallbackOnline,
      icon: serverConfig.icon,
      banner: serverConfig.banner
    };
  }
}

// Format numbers with commas
function formatNumber(num) {
  return num.toLocaleString();
}

// Open modal with loading state
async function openDiscordModal() {
  // Show modal immediately with loading state
  discordModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Show loading indicators
  document.getElementById('memberCount').textContent = '...';
  document.getElementById('onlineCount').textContent = '...';
  
  try {
    // Fetch server data
    const serverData = await fetchDiscordServerData();
    
    // Update modal with server data
    document.getElementById('serverName').textContent = serverData.name;
    document.getElementById('serverDescription').textContent = serverConfig.description;
    document.getElementById('serverIcon').src = serverData.icon;
    document.getElementById('memberCount').textContent = formatNumber(serverData.members);
    document.getElementById('onlineCount').textContent = formatNumber(serverData.online);
    
    // Handle banner image
    const bannerElement = document.getElementById('serverBanner');
    if (serverData.banner) {
      bannerElement.style.backgroundImage = `url(${serverData.banner})`;
      bannerElement.classList.add('has-banner');
    } else {
      bannerElement.style.backgroundImage = '';
      bannerElement.classList.remove('has-banner');
    }
    
    // Update join button link
    document.getElementById('joinButton').href = `https://discord.gg/${serverConfig.inviteCode}`;
    
  } catch (error) {
    console.error('Error loading Discord data:', error);
    // Fallback data is already set in the catch block above
  }
}

function closeDiscordModal() {
  discordModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Event Listeners
joinCommunityBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openDiscordModal();
});

closeModal.addEventListener('click', closeDiscordModal);

// Close when clicking outside modal
window.addEventListener('click', (e) => {
  if (e.target === discordModal) {
    closeDiscordModal();
  }
});

// Close with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && discordModal.classList.contains('active')) {
    closeDiscordModal();
  }
});

// Preload server data on page load (optional - for faster modal opening)
document.addEventListener('DOMContentLoaded', () => {
  // Uncomment the line below to preload data
  fetchDiscordServerData();
});