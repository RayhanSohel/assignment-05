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

// ------Button for navigate New page------//
function navigateToNewPage() {
  window.location.href = 'blog.html';
}
function goHome() {
  window.location.href = 'index.html';
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




//----------------donations Calculation------------------------//

//-----initial wallet balance------//
let walletBalance = 10000;

//-----Total donations for each cart--------//
let totalDonated = {
    1: 3600,
    2: 13730,
    3: 7530
};

//-----wallet balance Update-----//
function updateWalletAndDonation(cartId) {
    document.getElementById('wallet').innerText = Math.round(walletBalance);
    document.getElementById(`donatedAmount${cartId}`).innerText = Math.round(totalDonated[cartId]);
}

// ------Common donation function for each cart-----//
function customDonate(cartId) {
    const customAmount = parseFloat(document.getElementById(`customAmount${cartId}`).value);

    if (isNaN(customAmount) || customAmount <= 0 || !Number.isInteger(customAmount)) {
        alert('Please enter a valid & rounded amount!');
    } else if (walletBalance >= customAmount) {
        walletBalance -= Math.round(customAmount);
        totalDonated[cartId] += Math.round(customAmount);
        updateWalletAndDonation(cartId);
        //----void input field after successful donation----//
        document.getElementById(`customAmount${cartId}`).value = '';

        // Show alert with confirmation message
        alert(`Congratulations! You have donated successfully: ${Math.round(customAmount)} BDT`);
    } else {
        alert('Insufficient balance! Please add balance');
    }
}
