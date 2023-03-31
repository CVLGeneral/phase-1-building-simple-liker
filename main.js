// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

modal.classList.add("hidden");

document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".like-glyph");
  
  hearts.forEach((heart) => {
    heart.addEventListener("click", (event) => {
      const heart = event.target;
      
      if (heart.classList.contains("activated-heart")) {
        heart.classList.remove("activated-heart");
        heart.innerText = EMPTY_HEART;
      } else {
        mimicServerCall()
          .then(() => {
            heart.innerText = FULL_HEART;
            heart.classList.add("activated-heart");
          })
          .catch((error) => {
            modalMessage.innerText = error;
            modal.classList.remove("hidden");
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 3000);
          });
      }
    });
  });
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
