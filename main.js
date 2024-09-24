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
let walletBalance = 8000;
//-----Total donations for each cart--------//
let totalDonated = {
    1: 3600,
    2: 1700,
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
        //-----log donation to history------//
        logDonation(cartId, Math.round(customAmount));
        // Show modal with confirmation message
        showModal(`You have donated ${Math.round(customAmount)} Taka for humankind.`);
    } else {
        alert('Insufficient balance! Please add balance.');
    }
}




//-------Show the modal with window-------//
function showModal(message) {
  const modal = document.getElementById('confirmationModal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.innerText = message;
  modal.style.display = 'flex';
}
//------Close the modal window-------//
function closeModal() {
  const modal = document.getElementById('confirmationModal');
  modal.style.display = 'none';
}




//-----Function for log donation to history------//
function logDonation(cartId, amount, dateTime = new Date().toString()) {
  const historyList = document.getElementById('historyList');
  const cartTitle = getCartTitle(cartId);
  //-----Create a history div-------//
  const historyItem = document.createElement('div');
  historyItem.classList.add('history-item', 'mb-6', 'bg-bgColor', 'p-8', 'rounded-xl');
  historyItem.innerHTML = `
      <strong class="text-xl">${amount} Taka is donated for ${cartTitle}</strong> </br> <strong>Date: </strong>${dateTime}`;
  historyList.appendChild(historyItem);
}
//-------Get the title for each cart-------//
function getCartTitle(cartId) {
  switch(cartId) {
      case 1:
          return "Donate for flood at Noakhali, Bangladesh";
      case 2:
          return "Donate for flood at Feni, Bangladesh";
      case 3:
          return "Aid for injured in the Quota Movement";
      default:
          return "Unknown Cart";
  }
}

