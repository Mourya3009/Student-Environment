// JavaScript for Dashboard Functionality

// Update date and time
function updateDateTime() {
  const now = new Date()

  // Format date
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const formattedDate = now.toLocaleDateString("en-US", dateOptions)

  // Format time for IST
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }
  const formattedTime = now.toLocaleTimeString("en-US", timeOptions)

  // Update DOM elements
  document.getElementById("current-date").textContent = formattedDate
  document.getElementById("current-time").textContent = formattedTime
}

// Mood tracking functionality
function initializeMoodTracking() {
  const moodBtn = document.getElementById("mood-btn")
  const moodTracked = document.getElementById("mood-tracked")

  if (moodBtn && moodTracked) {
    moodBtn.addEventListener("click", () => {
      // Hide button and show tracked message
      moodBtn.style.display = "none"
      moodTracked.style.display = "block"

      // Add a little animation
      moodTracked.style.opacity = "0"
      setTimeout(() => {
        moodTracked.style.transition = "opacity 0.3s ease"
        moodTracked.style.opacity = "1"
      }, 100)
    })
  }
}

// Progress bar animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill")

  progressBars.forEach((bar) => {
    const width = bar.style.width
    bar.style.width = "0%"

    setTimeout(() => {
      bar.style.transition = "width 1s ease-out"
      bar.style.width = width
    }, 500)
  })
}

// Button hover effects (for browsers that don't support CSS hover well)
function initializeButtonEffects() {
  const buttons = document.querySelectorAll(".btn-outline")

  buttons.forEach((button) => {
    const originalStyles = {
      backgroundColor: button.style.backgroundColor || "white",
      color: button.style.color || getComputedStyle(button).color,
      borderColor: button.style.borderColor || getComputedStyle(button).borderColor,
    }

    button.addEventListener("mouseenter", () => {
      if (button.classList.contains("btn-mood")) {
        button.style.backgroundColor = "#F48FB1"
        button.style.color = "white"
      } else {
        button.style.backgroundColor = "#9575CD"
        button.style.color = "white"
        button.style.borderColor = "#9575CD"
      }
      button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = originalStyles.backgroundColor
      button.style.color = originalStyles.color
      button.style.borderColor = originalStyles.borderColor
      button.style.boxShadow = "none"
    })
  })
}

// Smooth scroll for any internal links (if added later)
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Add click handlers for interactive elements
function initializeClickHandlers() {
  // Quick access buttons
  const quickAccessButtons = document.querySelectorAll(".quick-access-buttons .btn")
  quickAccessButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.querySelector("span").textContent
      console.log(`Clicked: ${buttonText}`)
      // Add your navigation logic here
      // For example: window.location.href = '/chatbot';
    })
  })

  // Project buttons
  const projectButtons = document.querySelectorAll(".project-item .btn")
  projectButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const projectName = this.closest(".project-item").querySelector("h4").textContent
      console.log(`View project: ${projectName}`)
      // Add your project viewing logic here
    })
  })

  // Course buttons
  const courseButtons = document.querySelectorAll(".current-course .btn, .next-course .btn")
  courseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseName = this.closest("div").querySelector(".course-name").textContent
      console.log(`Course action: ${courseName}`)
      // Add your course navigation logic here
    })
  })
}

// Add loading animation for cards
function addLoadingAnimation() {
  const cards = document.querySelectorAll(".card")

  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease"

    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 100)
  })
}

// Local storage for user preferences
function initializeLocalStorage() {
  // Save mood tracking state
  const moodBtn = document.getElementById("mood-btn")
  const moodTracked = document.getElementById("mood-tracked")

  // Check if mood was already tracked today
  const today = new Date().toDateString()
  const lastMoodTrack = localStorage.getItem("lastMoodTrack")

  if (lastMoodTrack === today) {
    moodBtn.style.display = "none"
    moodTracked.style.display = "block"
  }

  // Save mood tracking when clicked
  if (moodBtn) {
    moodBtn.addEventListener("click", () => {
      localStorage.setItem("lastMoodTrack", today)
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Update date and time immediately and then every minute
  updateDateTime()
  setInterval(updateDateTime, 60000)

  // Initialize all functionality
  initializeMoodTracking()
  initializeButtonEffects()
  initializeSmoothScroll()
  initializeClickHandlers()
  initializeLocalStorage()

  // Add loading animation
  setTimeout(addLoadingAnimation, 100)

  // Animate progress bars after a delay
  setTimeout(animateProgressBars, 1000)
})

// Handle window resize for responsive behavior
window.addEventListener("resize", () => {
  // Add any resize-specific logic here if needed
  console.log("Window resized")
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Add keyboard shortcuts if needed
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "h":
        e.preventDefault()
        console.log("Home shortcut")
        break
      case "m":
        e.preventDefault()
        const moodBtn = document.getElementById("mood-btn")
        if (moodBtn && moodBtn.style.display !== "none") {
          moodBtn.click()
        }
        break
    }
  }
})

// Export functions for potential use in other scripts
window.DashboardApp = {
  updateDateTime,
  animateProgressBars,
  initializeMoodTracking,
}
