const toggleBtn = document.querySelector('.toggle');
const body = document.querySelector('body');

// Function to switch thems
const switchThemes = function () {
  if (toggleBtn.classList.contains('fa-toggle-on')) {
    // changing the btn to off by changing class
    toggleBtn.classList.replace('fa-toggle-on', 'fa-toggle-off');

    // adding whiteMode class to apply white theme
    body.classList.add('whiteMode');
    toggleBtn.style.color = '#000';
    return;
  }

  if (toggleBtn.classList.contains('fa-toggle-off')) {
    // changing the btn to on by changing class
    toggleBtn.classList.replace('fa-toggle-off', 'fa-toggle-on');

    // removing whiteMode class to apply normal dark theme
    body.classList.remove('whiteMode');
    toggleBtn.style.color = 'grey';
    return;
  }
};

toggleBtn.addEventListener('click', switchThemes);
