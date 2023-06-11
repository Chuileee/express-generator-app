"use strict";
// Get all img elements in the slideshow and gallery
const slideshowImages = document.querySelectorAll("#slideshow img");
const galleryImages = document.querySelectorAll("#gallery img");

// Reference the arrow buttons
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

// Initialize the current image index and show the first image in the slideshow and gallery
let currentImageIndex = 0;
slideshowImages[currentImageIndex].classList.add("active");
galleryImages[currentImageIndex].classList.add("active");

// Add onclick event handlers to the arrow buttons
rightArrow.onclick = function() {
  // Hide the current slideshow image
  slideshowImages[currentImageIndex].classList.remove("active");
  
  // Increment the current image index
  currentImageIndex++;

  // If we have reached the end of the slideshowImages array, wrap around to the beginning
  if (currentImageIndex === slideshowImages.length) {
    currentImageIndex = 0;
  }

  // Show the new current slideshow image
  slideshowImages[currentImageIndex].classList.add("active");

  // Show the new current gallery image
  galleryImages.forEach(function(image) {
    image.classList.remove("active");
  });
  galleryImages[currentImageIndex].classList.add("active");
};

leftArrow.onclick = function() {
  // Hide the current slideshow image
  slideshowImages[currentImageIndex].classList.remove("active");
  
  // Decrement the current image index
  currentImageIndex--;

  // If we have reached the beginning of the slideshowImages array, wrap around to the end
  if (currentImageIndex < 0) {
    currentImageIndex = slideshowImages.length - 1;
  }

  // Show the new current slideshow image
  slideshowImages[currentImageIndex].classList.add("active");

  // Show the new current gallery image
  galleryImages.forEach(function(image) {
    image.classList.remove("active");
  });
  galleryImages[currentImageIndex].classList.add("active");
};


// Add onclick event handlers to each gallery image
galleryImages.forEach(function(image, index) {
    image.onclick = function() {
      // Open a new window containing a clear version of the image
      const newWindow = window.open();
      // Create an image element and set its attributes
      const img = document.createElement('img');
      img.src = this.src;
      img.classList.add('new-window');
  
      // Add the image to the new window
      newWindow.document.body.appendChild(img);

      // Create a button to close the window
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close Window';
      closeButton.onclick = function() {
        newWindow.close();
      };
      newWindow.document.body.appendChild(closeButton);
  
      // Create a hyperlink/button to add the image to the favorites area
      const button = document.createElement('button');
      button.textContent = 'Add to Favorites';
      button.onclick = function() {
        // Check if there are already 5 favorites
        const favoritesList = document.getElementById('favorites_list');
        if (favoritesList.children.length >= 5) {
          alert('You have reached the limit of 5 favorites. Please remove at least one favorite first.');
          return;
        }
  
        // Create a new img node with the same src and add it to the favorites area
        const favoriteImg = document.createElement('img');
        favoriteImg.src = image.src;
 
      // Create a new list item to hold the favorite image and remove button
      const newItem = document.createElement("li");
      newItem.appendChild(favoriteImg);

      // Create a remove button
      const removeBtn = document.createElement("a");
      removeBtn.innerHTML = "Remove";
      removeBtn.href = "#";
      removeBtn.onclick = function(event) {
        event.preventDefault();
        favoritesList.removeChild(newItem); // fixed variable name
      }
      
      // Append the remove button to the new list item
      newItem.appendChild(removeBtn); // added this line
      
      // Add the new list item to the favorites area
      favoritesList.appendChild(newItem); // fixed variable name
    };
    newWindow.document.body.appendChild(button);
  
      // Resize the image to fit within the viewport of the new window
      img.onload = function() {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const imageHeight = img.offsetHeight;
        const imageWidth = img.offsetWidth;
  
        // Resize the image if it is too large to fit within the window
        if (imageHeight > windowHeight || imageWidth > windowWidth) {
          const heightScaleFactor = windowHeight / imageHeight;
          const widthScaleFactor = windowWidth / imageWidth;
          const scaleFactor = Math.min(heightScaleFactor, widthScaleFactor);
          img.style.width = `${scaleFactor * imageWidth}px`;
          img.style.height = `${scaleFactor * imageHeight}px`;
        }
      };
  
      // Hide the current slideshow image
      slideshowImages[currentImageIndex].classList.remove("active");
  
      // Update the current image index
      currentImageIndex = index;
  
      // Show the new current slideshow image
      slideshowImages[currentImageIndex].classList.add("active");
  
      // Update the active class on the gallery images
      galleryImages.forEach(function(image) {
        image.classList.remove("active");
      });
  
      this.classList.add("active");
    };
  });

  
  

