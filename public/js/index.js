document.addEventListener("DOMContentLoaded", () => {
  // Event listener for page load
  window.addEventListener("load", () => {
      document.querySelector(".main").classList.remove("hidden");
      document.querySelector(".home-section").classList.add("active");
      /*------------ Page Loader ------------*/
      document.querySelector(".page-loader").classList.add("fade-out");
      setTimeout(() => {
          document.querySelector(".page-loader").style.display = "none";
      }, 600);
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
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("view-project-btn")) {
      const projectId = e.target.getAttribute("data-project-id");
      console.log("Project ID:", projectId); // Check projectId
      try {
          const response = await fetch(`/project/${projectId}`);
          if (!response.ok) {
              throw new Error('Failed to fetch project details');
          }
          const project = await response.json(); // Parse JSON response
          console.log("Fetched Project:", project); // Check fetched project data
          togglePortfolioPopup();
          document.querySelector(".portfolio-popup").scrollTo(0, 0);
          portfolioItemDetails(project); // Pass project data to update popup
      } catch (error) {
          console.error('Error fetching project:', error);
      }
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
  function portfolioItemDetails(project) {
      const thumbnailSrc = project.img_url;
      const title = project.project_name;
      const detailsHTML = `
          <div class="description">
              <p>${project.project_description}</p>
          </div>
          <div class="general-info">
              <ul>
                  <li>Price: ${project.price_eth} ETH</li>
                  <li>Quantity: ${project.quantity}</li>
                  <li>Royalties: ${project.royalty_percent}%</li>
              </ul>
          </div>
      `;

      // Update popup thumbnail image
      const popupThumbnailImg = document.querySelector(".pp-thumbnail img");
      popupThumbnailImg.src = thumbnailSrc;
      popupThumbnailImg.alt = title;

      // Update popup header title
      document.querySelector(".pp-header h3").textContent = title;

      // Update popup body with portfolio item details
      const ppBody = document.querySelector(".pp-body");
      ppBody.innerHTML = detailsHTML;
  }

  /*-------- Contact Form ------------*/
  document.getElementById("contact-form").addEventListener("submit", function (event) {
      event.preventDefault();
      submitMail();
  });

  function submitMail() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      fetch("/mail", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
      })
          .then((response) => response.text())
          .then((data) => {
              console.log("Mail sent successfully:", data);
          })
          .catch((error) => {
              console.error("Error sending mail:", error);
          });
  }

  /*------------Menu Toggle --------------*/
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function () {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
  });
});
