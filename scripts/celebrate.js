// Milestone goals
const milestones = [150, 300, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
let currentMilestone = 0;
let lastProcessedCount = 0;

function checkMilestone(count) {
  if (count <= lastProcessedCount) return;
  
  const milestone = milestones.find(goal => 
    count >= goal && goal > currentMilestone
  );
  
  if (milestone) {
    currentMilestone = milestone;
    lastProcessedCount = count;
    showMilestonePopup(milestone, count);
  }
}

function showMilestonePopup(milestone, count) {
  const popup = document.getElementById('milestonePopup');
  const milestoneNum = document.getElementById('milestoneNumber');
  const currentCount = document.getElementById('currentCount');
  const nextGoal = document.getElementById('nextGoal');
  const progressFill = document.getElementById('progressFill');
  
  milestoneNum.textContent = milestone.toLocaleString();
  currentCount.textContent = count.toLocaleString();
  
  const nextIndex = milestones.indexOf(milestone) + 1;
  const nextTarget = milestones[nextIndex] || milestone * 2;
  nextGoal.textContent = nextTarget.toLocaleString();
  
  const progress = Math.min(100, (count / nextTarget) * 100);
  
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    progressFill.style.width = `${progress}%`;
  }, 300);
  
  document.querySelector('.close-popup').addEventListener('click', () => {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  document.querySelector('.share-btn').addEventListener('click', () => {
    const shareText = `Celebrate with me! My portfolio just hit ${milestone.toLocaleString()} views! 🎉`;
    if (navigator.share) {
      navigator.share({
        title: 'Milestone Reached!',
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback for desktop
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  });
}

function updateCounter(count) {
  // Check if we've hit any milestones
  checkMilestone(count);
}