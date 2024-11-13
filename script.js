// document.addEventListener('DOMContentLoaded', async () => {
//    // Fetch data
//    const response = await fetch('data.json');
//    const data = await response.json();

//    // Initialize hero content
//    initializeHero(data.hero);

//    // Initialize cards
//    initializeCards(data.cards);
//  });

document.addEventListener('DOMContentLoaded', async () => {
   try {
     // Fetch data
     const response = await fetch('data.json');

     if (!response.ok) {
       throw new Error(`Network response was not ok. Data could not be fetched. Status: ${response.statusText}`);
     }

     const data = await response.json();

     // Initialize hero content
     initializeHero(data.hero);

     // Initialize cards
     initializeCards(data.cards);
   } catch (error) {
     console.error('There was a problem initializing the page:', error);

     // Create and style the error message element
     const errorDiv = document.createElement('div');
     errorDiv.style.color = 'white';
     errorDiv.style.backgroundColor = 'red';
     errorDiv.style.padding = '15px';
     errorDiv.style.fontSize = '18px';
     errorDiv.style.fontWeight = 'bold';
     errorDiv.style.margin = '20px';
     errorDiv.style.textAlign = 'center';
     errorDiv.textContent = `An error occurred: ${error.message}`;

     // Append the error message to the body so it's visible
     document.body.prepend(errorDiv);
   }
 });

function initializeHero(heroData) {
	// Populate hero content
	const heroContent = document.querySelector(".hero-content");
   //   <h1>${heroData.title}</h1>
   // <h1 class="heading-with-shadow radient-flow text-style gradient-hover-pause" data-text="${heroData.title}">${heroData.title}</h1>
   // <h1 class="gradient-flow text-style gradient-hover-pause" data-text="${heroData.title}">${heroData.title}</h1>
   // <h1 class="gradient-pulse text-style gradient-hover-pause" data-text="${heroData.title}">${heroData.title}</h1>
   // <h1 class="gradient-shift text-style gradient-hover-pause" data-text="${heroData.title}">${heroData.title}</h1>
	heroContent.innerHTML = `
     <h1 class="gradient-flow text-style" data-text="${heroData.title}">${heroData.title}</h1>
     <p class="hero-subtitle">${heroData.subtitle}</p>
     <a href="${heroData.button.url}" class="button">${heroData.button.text}</a>
   `;

	// Populate slider images
	const sliderContainer = document.querySelector(".hero-slider");
	const controlsContainer = document.querySelector(".hero-controls");

	// Generate slider HTML
	sliderContainer.innerHTML = heroData.slider.images
		.map(
			(image, index) => `
       <img
         src="${image.src}"
         alt="${image.alt}"
         class="hero-slider-image ${index === 0 ? "active" : ""}"
         data-index="${index}"
       >
     `
		)
		.join("");

	// Generate controls HTML
	controlsContainer.innerHTML = heroData.slider.images
		.map(
			(_, index) => `
       <div
         class="hero-controls-dot ${index === 0 ? "active" : ""}"
         data-index="${index}"
       ></div>
     `
		)
		.join("");

	// Initialize slider functionality
	initializeSlider(heroData.slider.interval);
}

function initializeSlider(interval) {
	const sliderImages = document.querySelectorAll(".hero-slider-image");
	const dots = document.querySelectorAll(".hero-controls-dot");
	let currentSlide = 0;
	let isAnimating = false;

	// Function to change slide
	const changeSlide = (newIndex) => {
		if (isAnimating || newIndex === currentSlide) return;
		isAnimating = true;

		// Remove active classes
		sliderImages[currentSlide].classList.remove("active");
		dots[currentSlide].classList.remove("active");

		// Add active classes to new slide
		sliderImages[newIndex].classList.add("active");
		dots[newIndex].classList.add("active");

		currentSlide = newIndex;

		// Prevent rapid transitions
		setTimeout(() => {
			isAnimating = false;
		}, 1000);
	};

	// Auto-advance slides
	const autoAdvance = () => {
		const nextSlide = (currentSlide + 1) % sliderImages.length;
		changeSlide(nextSlide);
	};

	// Set up click handlers for dots
	dots.forEach((dot) => {
		dot.addEventListener("click", () => {
			const newIndex = parseInt(dot.dataset.index);
			changeSlide(newIndex);
		});
	});

	// Start auto-advance timer
	let slideInterval = setInterval(autoAdvance, interval);

	// Pause auto-advance on hover
	const heroSection = document.querySelector(".hero");
	heroSection.addEventListener("mouseenter", () => {
		clearInterval(slideInterval);
	});

	heroSection.addEventListener("mouseleave", () => {
		slideInterval = setInterval(autoAdvance, interval);
	});
}

function initializeCards(cardsData) {
	const cardsGrid = document.querySelector(".cards-grid");

	cardsGrid.innerHTML = cardsData
		.map(
			(card) => `
       <div class="card">
         <img src="${card.image.src}" alt="${card.image.alt}" class="card-image">
         <div class="card-content">
           <h3 class="card-title">${card.title}</h3>
           <p class="card-description">${card.description}</p>
           <a href="${card.button.url}" class="button">${card.button.text}</a>
         </div>
       </div>
     `
		)
		.join("");
}

// // Fetch and inject content
// document.addEventListener('DOMContentLoaded', async () => {
//    // In a real application, this would be fetched from an API
//    const data = await fetch('data.json').then(res => res.json());

//    // Inject hero content
//    document.querySelector('.hero-content h1').textContent = data.hero.title;
//    document.querySelector('.hero-content .hero-subtitle').textContent = data.hero.subtitle;
//    document.querySelector('.hero-content .button').textContent = data.hero.button.text;

//    // Generate cards
//    const cardsGrid = document.querySelector('.cards-grid');
//    cardsGrid.innerHTML = data.cards.map(card => `
//      <div class="card">
//        <img src="${card.image.src}" alt="${card.image.alt}" class="card-image">
//        <div class="card-content">
//          <h3 class="card-title">${card.title}</h3>
//          <p class="card-description">${card.description}</p>
//          <a href="${card.button.url}" class="button">${card.button.text}</a>
//        </div>
//      </div>
//    `).join('');
//  });

//  document.addEventListener('DOMContentLoaded', () => {
//    const sliderImages = document.querySelectorAll('.hero-slider-image');
//    const dots = document.querySelectorAll('.hero-controls-dot');
//    let currentSlide = 0;
//    let isAnimating = false;

//    // Function to change slide
//    const changeSlide = (newIndex) => {
//      if (isAnimating || newIndex === currentSlide) return;
//      isAnimating = true;

//      // Remove active classes
//      sliderImages[currentSlide].classList.remove('active');
//      dots[currentSlide].classList.remove('active');

//      // Add active classes to new slide
//      sliderImages[newIndex].classList.add('active');
//      dots[newIndex].classList.add('active');

//      currentSlide = newIndex;

//      // Prevent rapid transitions
//      setTimeout(() => {
//        isAnimating = false;
//      }, 1000);
//    };

//    // Auto-advance slides
//    const autoAdvance = () => {
//      const nextSlide = (currentSlide + 1) % sliderImages.length;
//      changeSlide(nextSlide);
//    };

//    // Set up click handlers for dots
//    dots.forEach((dot) => {
//      dot.addEventListener('click', () => {
//        const newIndex = parseInt(dot.dataset.index);
//        changeSlide(newIndex);
//      });
//    });

//    // Start auto-advance timer
//    let slideInterval = setInterval(autoAdvance, 5000);

//    // Pause auto-advance on hover
//    const heroSection = document.querySelector('.hero');
//    heroSection.addEventListener('mouseenter', () => {
//      clearInterval(slideInterval);
//    });

//    heroSection.addEventListener('mouseleave', () => {
//      slideInterval = setInterval(autoAdvance, 5000);
//    });
//  });
