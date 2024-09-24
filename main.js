// ------Custom Tailwind CSS------//
tailwind.config = {
    theme: {
      extend: {
        colors: {
          brandColor: '#00935F',
          bgColor: '#00935F33',
          textColor: '#494949',
        },
        fontFamily: {
          manrope: ['Manrope'],
        }
      }
    }
  }

// ------Switching Menu Button-----//
function setActive(link) {
  const buttons = document.querySelectorAll('.menu-btn');
  buttons.forEach(btn => {
      btn.classList.remove('btn-success');
      btn.classList.add('btn');
  });
  link.classList.add('btn-success');

  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
      section.classList.add('hidden');
  });

  const activeSection = document.getElementById(link.dataset.target);
  activeSection.classList.remove('hidden');
}
window.onload = function() {
  const defaultButton = document.querySelector('.menu-btn[data-target="donation-section"]');
  setActive(defaultButton);
};