const images = document.querySelectorAll(".lesson-content img")
const modal = document.getElementById("modal")
const modalImg = document.querySelector("#modal .modal-content img")
const modalClose = document.querySelector("#modal .modal-content .close")

images.forEach((img) => {
  img.addEventListener("click", (event) => {
    let src = event.target.getAttribute("src")
    modalImg.src = src
    modal.style.display = "block"
  })
})

modalClose.addEventListener("click", () => {
  modal.style.display = "none"
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
})
