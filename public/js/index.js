window.addEventListener("loader", ()=>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    /*------------ Page Loader ------------*/
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() =>{
      document.querySelector(".page-loader").computedStyleMap.display = "none";
    },600);
  });

  
   /*-------- Smooth scroll for navigation links ----------*/
   const navLinks = document.querySelectorAll('.nav-link');
   navLinks.forEach(link => {
       link.addEventListener('click', function (event) {
           event.preventDefault();
           const targetId = this.getAttribute('href').substring(1);
           const targetSection = document.getElementById(targetId);
  
           window.scrollTo({
               top: targetSection.offsetTop - 70, // Adjust for fixed navbar height
               behavior: 'smooth'
           });
       });
   });
  
  
  /*----------------Portfolio Item Details Pop----------------*/
// Event listener for the "view project" button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-project-btn")) {
      togglePortfolioPopup();
      document.querySelector(".portfolio-popup").scrollTo(0, 0);
      portfolioItemDetails(e.target.parentElement);
  }
});

// Function to toggle portfolio popup visibility
function togglePortfolioPopup() {
  const portfolioPopup = document.querySelector(".portfolio-popup");
  portfolioPopup.classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
  document.querySelector(".main").classList.toggle("fade-out");
}

// Event listener for closing the popup
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

// Event listener to close popup when clicking outside of it
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("pp-inner")) {
      togglePortfolioPopup();
  }
});

// Function to populate portfolio item details in the popup
function portfolioItemDetails(portfolioItem) {
  const thumbnailSrc = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;
  const title = portfolioItem.querySelector(".portfolio-item-title").textContent;
  const detailsHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;

  // Update popup thumbnail image
  const popupThumbnailImg = document.querySelector(".pp-thumbnail img");
  popupThumbnailImg.src = thumbnailSrc;
  popupThumbnailImg.alt = title;

  // Update popup header title
  document.querySelector(".pp-header h3").textContent = title;

  // Update popup body with portfolio item details
  const ppBody = document.querySelector(".pp-body");
  ppBody.innerHTML = ''; // Clear existing content
  ppBody.innerHTML = detailsHTML;
}
  
  
    /*-------- Contact Form ------------*/
    (function(){
      "use strict";
  
      document.querySelector("submit-btn")
      .addEventListener("click", submitMail);
    
    function submitMail(){
      console.log("You clicked the submit button");
    }
  })();

  /*------------Menu Toggle --------------*/
  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});
