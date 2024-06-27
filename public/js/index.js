window.addEventListener("loader", ()=>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    /*------------ Page Loader ------------*/
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() =>{
      document.querySelector(".page-loader").computedStyleMap.display = "none";
    },600);
  });
  
  /*----------------About Tabs -----------------*/
  const tabsContainer = document.querySelector(".about-tabs"),
  aboutSection = document.querySelector(".about-section");
  
  tabsContainer.addEventListener("click", (e) =>{
      if(e.classList.contains("tab-item") && !e.target.classList.contains("active")){
          tabsContainer.querySelector(".active").classList.remove("active");
          e.target.classList.add("active");
          const target = e.target.getAttribute("data-target");
          aboutSection.querySelector(".tab-content.active").classList.remove("active");
          aboutSection.querySelector(target).classList.add("active");
      }
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
    document.addEventListener("click", (e) =>{
      if(e.target.classList.contains("view-project-btn")){
          togglePortfolioPopup();
          document.querySelector(".portfolio-popup").scrollTo(0,0);
          portfolioItemDetails(e.target.parentElement);
      }
    })
  
    function togglePortfolioPopup(){
      document.querySelector(".portfolio-popup").classList.toggle("open");
      document.body.classList.toggle("hide-scrolling");
      document.querySelector(".main").classList.toggle("fade-out");
    }
  
    document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);
  
    // hide popup when clicking outside
    document.addEventListener("click", (e) =>{
      if(e.target.classList.contains("pp-inner")){
          togglePortfolioPopup();
      }
    })
  
    function portfolioItemDetails(portfolioItem){
      document.querySelector("pp-thumbnail img").src =
      portfolioItem.querySelector(".portfolio-item-thumbnail img").src;
  
      document.querySelector(".pp-header h3").innerHTML =
      portfolioItem.querySelector(".portfolio-item-title").innerHTML;
  
      document.querySelector(".pp-body").innerHTML=
      portfolioItem.querySelector(".portfolio-item-details").innerHTML;
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