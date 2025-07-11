// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initFAQ();
    initSmoothScrolling();
    initFormHandling();
    initAnalytics();
    initAnimations();

    // --- Survey Landing Page Logic ---
    (function() {
      // Only run on survey-landing.html
      if (!document.body.classList.contains('survey-body')) return;

      // Survey steps/questions definition
      const surveySteps = [
        // 1. Business Profile
        [
          {
            id: 'revenue',
            label: "What's your average monthly revenue on Shopify?",
            type: 'select',
            options: [
              '', '$10K-$25K', '$25K-$50K', '$50K-$100K', '$100K-$250K', '$250K-$500K', '$500K+',
            ],
            required: true
          },
          {
            id: 'sku_count',
            label: 'How many SKUs do you currently manage?',
            type: 'select',
            options: ['', '1-20', '21-100', '101-500', '501-2000', '2000+'],
            required: true
          },
          {
            id: 'categories',
            label: 'What product categories do you sell?',
            type: 'text',
            placeholder: 'e.g. Apparel, Electronics, Beauty',
            required: true
          },
          {
            id: 'business_model',
            label: 'Do you manufacture, wholesale, or dropship?',
            type: 'select',
            options: ['', 'Manufacture', 'Wholesale', 'Dropship', 'Mix'],
            required: true
          },
          {
            id: 'channels',
            label: 'How many sales channels do you use?',
            type: 'select',
            options: ['', '1', '2', '3', '4+'],
            required: true
          }
        ],
        // 2. Current Inventory Management
        [
          {
            id: 'current_method',
            label: 'How do you currently manage inventory?',
            type: 'select',
            options: ['', 'Manual', 'Spreadsheets', 'Inventory Software', 'Shopify Only', 'Other'],
            required: true
          },
          {
            id: 'tools',
            label: 'What tools do you use for inventory tracking?',
            type: 'text',
            placeholder: 'e.g. Shopify, Excel, TradeGecko',
            required: false
          },
          {
            id: 'review_frequency',
            label: 'How often do you review and reorder inventory?',
            type: 'select',
            options: ['', 'Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Less often'],
            required: true
          },
          {
            id: 'decision_maker',
            label: 'Who in your team handles inventory decisions?',
            type: 'text',
            placeholder: 'e.g. Me, Operations Manager',
            required: false
          },
          {
            id: 'biggest_time_waster',
            label: "What's your biggest time-waster in inventory management?",
            type: 'text',
            placeholder: 'e.g. Data entry, chasing suppliers',
            required: false
          }
        ],
        // 3. Pain Points Deep Dive
        [
          {
            id: 'stockouts_per_month',
            label: 'How often do you experience stockouts per month?',
            type: 'select',
            options: ['', 'Never', '1-2', '3-5', '6-10', '10+'],
            required: true
          },
          {
            id: 'revenue_loss_stockout',
            label: "What's the average revenue loss from a typical stockout?",
            type: 'text',
            placeholder: 'e.g. $500',
            required: false
          },
          {
            id: 'overstock_frequency',
            label: 'How often do you have overstock situations?',
            type: 'select',
            options: ['', 'Never', 'Occasionally', 'Monthly', 'Weekly', 'Always'],
            required: true
          },
          {
            id: 'capital_tied_up',
            label: "What percentage of your capital is tied up in slow-moving inventory?",
            type: 'select',
            options: ['', '0-10%', '11-25%', '26-50%', '51%+'],
            required: false
          },
          {
            id: 'biggest_fear',
            label: "What's your biggest inventory management fear?",
            type: 'text',
            placeholder: 'e.g. Running out of bestsellers',
            required: false
          }
        ],
        // 4. Solution Requirements
        [
          {
            id: 'perfect_solution',
            label: 'What would the perfect inventory solution do for you?',
            type: 'textarea',
            required: true
          },
          {
            id: 'essential_integrations',
            label: 'What integrations are absolutely essential?',
            type: 'text',
            placeholder: 'e.g. Shopify, Amazon, QuickBooks',
            required: false
          },
          {
            id: 'time_to_save',
            label: 'How much time would you want to save weekly?',
            type: 'select',
            options: ['', '1-2 hours', '3-5 hours', '6-10 hours', '10+ hours'],
            required: false
          },
          {
            id: 'automation_level',
            label: 'What level of automation are you comfortable with?',
            type: 'select',
            options: ['', 'Full automation', 'Partial automation', 'Manual approval', 'Not sure'],
            required: false
          },
          {
            id: 'reporting_features',
            label: 'What reporting features are most important?',
            type: 'text',
            placeholder: 'e.g. Forecasts, low stock alerts',
            required: false
          }
        ],
        // 5. Investment and Adoption
        [
          {
            id: 'current_spend',
            label: 'How much do you currently spend on inventory management tools?',
            type: 'text',
            placeholder: 'e.g. $0, $29/mo',
            required: false
          },
          {
            id: 'willingness_to_pay',
            label: 'What would you pay monthly for a solution that prevents stockouts?',
            type: 'text',
            placeholder: 'e.g. $49/mo',
            required: true
          },
          {
            id: 'justify_higher_price',
            label: 'What would justify a higher price point for you?',
            type: 'textarea',
            required: false
          },
          {
            id: 'evaluate_software',
            label: 'How do you typically evaluate new software?',
            type: 'text',
            placeholder: 'e.g. Reviews, free trial',
            required: false
          },
          {
            id: 'switch_reason',
            label: 'What would make you switch from your current solution?',
            type: 'text',
            placeholder: 'e.g. Better features, lower price',
            required: false
          }
        ],
        // 6. Beta and Development
        [
          {
            id: 'beta_interest',
            label: 'Would you be interested in beta testing our solution?',
            type: 'select',
            options: ['', 'Yes', 'No', 'Maybe'],
            required: true
          },
          {
            id: 'beta_expectations',
            label: 'What would you want to see in a beta version?',
            type: 'textarea',
            required: false
          },
          {
            id: 'feedback_willingness',
            label: 'How much feedback would you be willing to provide?',
            type: 'select',
            options: ['', 'A lot', 'Some', 'Minimal', 'None'],
            required: false
          },
          {
            id: 'recommend_reason',
            label: 'What would make you recommend this to other merchants?',
            type: 'textarea',
            required: false
          },
          {
            id: 'email',
            label: 'Your email (for rewards & beta access)',
            type: 'email',
            required: true
          }
        ]
      ];

      const surveyForm = document.getElementById('survey-form');
      const progressBar = document.querySelector('.progress-bar .progress');
      const progressText = document.getElementById('current-step');
      const finalProgress = document.getElementById('final-progress');
      const confirmation = document.getElementById('survey-confirmation');

      let currentStep = 0;
      let answers = {};

      // Load from localStorage if available
      if (window.localStorage) {
        const saved = localStorage.getItem('survey-answers');
        const savedStep = localStorage.getItem('survey-step');
        if (saved) answers = JSON.parse(saved);
        if (savedStep) currentStep = parseInt(savedStep, 10);
      }

      function renderStep(step) {
        surveyForm.innerHTML = '';
        const questions = surveySteps[step];
        questions.forEach(q => {
          const wrapper = document.createElement('div');
          wrapper.className = 'survey-question';
          const label = document.createElement('label');
          label.htmlFor = q.id;
          label.textContent = q.label + (q.required ? ' *' : '');
          wrapper.appendChild(label);
          let input;
          if (q.type === 'select') {
            input = document.createElement('select');
            input.id = q.id;
            input.name = q.id;
            q.options.forEach(opt => {
              const option = document.createElement('option');
              option.value = opt;
              option.textContent = opt;
              input.appendChild(option);
            });
          } else if (q.type === 'textarea') {
            input = document.createElement('textarea');
            input.id = q.id;
            input.name = q.id;
            input.rows = 3;
          } else {
            input = document.createElement('input');
            input.type = q.type;
            input.id = q.id;
            input.name = q.id;
            if (q.placeholder) input.placeholder = q.placeholder;
          }
          if (answers[q.id]) input.value = answers[q.id];
          wrapper.appendChild(input);
          surveyForm.appendChild(wrapper);
        });
        // Error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'survey-form-error';
        errorDiv.style.display = 'none';
        surveyForm.appendChild(errorDiv);
        // Navigation
        const nav = document.createElement('div');
        nav.className = 'survey-form-nav';
        if (step > 0) {
          const backBtn = document.createElement('button');
          backBtn.type = 'button';
          backBtn.className = 'btn btn-secondary';
          backBtn.textContent = 'Back';
          backBtn.onclick = () => {
            currentStep--;
            saveProgress();
            renderStep(currentStep);
            updateProgress();
          };
          nav.appendChild(backBtn);
        }
        const nextBtn = document.createElement('button');
        nextBtn.type = 'submit';
        nextBtn.className = 'btn btn-primary';
        nextBtn.textContent = (step === surveySteps.length - 1) ? 'Submit Survey' : 'Next';
        nav.appendChild(nextBtn);
        surveyForm.appendChild(nav);
        // Progress
        updateProgress();
        if (finalProgress) finalProgress.textContent = Math.round((step+1)/surveySteps.length*100) + '%';
      }

      function updateProgress() {
        if (progressBar) progressBar.style.width = ((currentStep+1)/surveySteps.length*100) + '%';
        if (progressText) progressText.textContent = (currentStep+1);
      }

      function saveProgress() {
        if (window.localStorage) {
          localStorage.setItem('survey-answers', JSON.stringify(answers));
          localStorage.setItem('survey-step', currentStep);
        }
      }

      // Alternative: Backend API Integration
      function submitToBackend(data) {
        // Replace with your actual API endpoint
        const apiUrl = 'https://your-api.com/survey-submissions';
        
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            survey_data: data,
            timestamp: new Date().toISOString(),
            source: 'inventory-forecast-survey'
          })
        })
        .then(response => response.json())
        .then(result => {
          console.log('Survey submitted successfully:', result);
          // Show success message
          surveyForm.style.display = 'none';
          confirmation.classList.remove('hidden');
        })
        .catch(error => {
          console.error('Error submitting survey:', error);
          // Show error message
          const errorDiv = surveyForm.querySelector('.survey-form-error');
          errorDiv.textContent = 'There was an error submitting your survey. Please try again.';
          errorDiv.style.display = 'block';
        });
      }

      // Alternative: Email Collection (Simple)
      function submitViaEmail(data) {
        const emailSubject = encodeURIComponent('Inventory Forecast AI Survey Response');
        const emailBody = encodeURIComponent(`
Survey Response Summary:

Business Profile:
- Revenue: ${data.revenue || 'Not provided'}
- SKUs: ${data.sku_count || 'Not provided'}
- Categories: ${data.categories || 'Not provided'}
- Business Model: ${data.business_model || 'Not provided'}
- Channels: ${data.channels || 'Not provided'}

Current Process:
- Method: ${data.current_method || 'Not provided'}
- Tools: ${data.tools || 'Not provided'}
- Review Frequency: ${data.review_frequency || 'Not provided'}

Pain Points:
- Stockouts per month: ${data.stockouts_per_month || 'Not provided'}
- Revenue loss: ${data.revenue_loss_stockout || 'Not provided'}
- Overstock frequency: ${data.overstock_frequency || 'Not provided'}

Solution Requirements:
- Perfect solution: ${data.perfect_solution || 'Not provided'}
- Essential integrations: ${data.essential_integrations || 'Not provided'}
- Time to save: ${data.time_to_save || 'Not provided'}

Investment:
- Current spend: ${data.current_spend || 'Not provided'}
- Willingness to pay: ${data.willingness_to_pay || 'Not provided'}

Beta Interest:
- Interest: ${data.beta_interest || 'Not provided'}
- Email: ${data.email || 'Not provided'}

Full responses available in attached data.
        `);
        
        const mailtoLink = `mailto:amineelom203@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        window.open(mailtoLink);
        
        // Show success message
        surveyForm.style.display = 'none';
        confirmation.classList.remove('hidden');
      }

      // Modify the submit handler to use backend API
      surveyForm.onsubmit = function(e) {
        e.preventDefault();
        // Validate
        const questions = surveySteps[currentStep];
        let valid = true;
        let firstInvalid = null;
        questions.forEach(q => {
          const val = surveyForm[q.id].value.trim();
          if (q.required && !val) {
            valid = false;
            if (!firstInvalid) firstInvalid = q.id;
          }
          answers[q.id] = val;
        });
        // Email validation
        if (questions.some(q => q.id === 'email')) {
          const email = surveyForm['email'].value.trim();
          if (!/^\S+@\S+\.\S+$/.test(email)) {
            valid = false;
            firstInvalid = 'email';
          }
        }
        // Error
        const errorDiv = surveyForm.querySelector('.survey-form-error');
        if (!valid) {
          errorDiv.textContent = 'Please complete all required fields.';
          errorDiv.style.display = 'block';
          if (firstInvalid) surveyForm[firstInvalid].focus();
          return;
        } else {
          errorDiv.style.display = 'none';
        }
        // Save
        saveProgress();
        // Next or submit
        if (currentStep < surveySteps.length - 1) {
          currentStep++;
          saveProgress();
          renderStep(currentStep);
          updateProgress();
        } else {
          // Submit
          submitViaEmail(answers);
        }
      };

      // Initial render
      renderStep(currentStep);

      // Alternative: Google Forms Integration
      function setupGoogleFormsIntegration() {
        // Option 1: Redirect to Google Forms
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdUATZT96ueBye33LYirbmaTult8DqcY0IPKOeIOwiduYjsUA/viewform?usp=dialog';
        
        // Replace the custom form with a redirect button
        const surveyForm = document.getElementById('survey-form');
        surveyForm.innerHTML = `
          <div style="text-align: center; padding: 2rem;">
            <h3>Ready to share your insights?</h3>
            <p>Click below to start the survey in a new tab.</p>
            <a href="${googleFormUrl}" target="_blank" class="btn btn-primary btn-lg">
              Start Survey on Google Forms
            </a>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
              You'll be redirected to Google Forms to complete the survey securely.
            </p>
          </div>
        `;
      }

      // Option 2: Embed Google Forms directly
      function embedGoogleForm() {
        const surveyForm = document.getElementById('survey-form');
        surveyForm.innerHTML = `
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSdUATZT96ueBye33LYirbmaTult8DqcY0IPKOeIOwiduYjsUA/viewform?embedded=true" 
            width="100%" 
            height="800" 
            frameborder="0" 
            marginheight="0" 
            marginwidth="0">
            Loading…
          </iframe>
        `;
      }

      // Alternative: Typeform Integration
      function setupTypeformIntegration() {
        const surveyForm = document.getElementById('survey-form');
        surveyForm.innerHTML = `
          <div style="text-align: center; padding: 2rem;">
            <h3>Ready to share your insights?</h3>
            <p>Click below to start the survey in a new tab.</p>
            <a href="https://form.typeform.com/to/YOUR_FORM_ID" target="_blank" class="btn btn-primary btn-lg">
              Start Survey on Typeform
            </a>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
              You'll be redirected to Typeform to complete the survey securely.
            </p>
          </div>
        `;
      }

      // Option 2: Embed Typeform directly
      function embedTypeform() {
        const surveyForm = document.getElementById('survey-form');
        surveyForm.innerHTML = `
          <div data-tf-widget="YOUR_FORM_ID" data-tf-opacity="100" data-tf-iframe-props="title=Inventory Forecast AI Survey" data-tf-transitive-search-params data-tf-medium="snippet" style="width:100%;height:600px;"></div>
          <script src="//embed.typeform.com/next/embed.js"></script>
        `;
      }

      // Uncomment one of these to use Google Forms:
      setupGoogleFormsIntegration();
      // embedGoogleForm();

      // Uncomment one of these to use Typeform:
      // setupTypeformIntegration();
      // embedTypeform();

      // Social sharing
      document.querySelectorAll('.share-btn').forEach(btn => {
        btn.onclick = function() {
          const url = encodeURIComponent(window.location.href);
          const text = encodeURIComponent('Help shape the future of Shopify inventory management! Take the survey:');
          let shareUrl = '';
          if (btn.dataset.platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
          } else if (btn.dataset.platform === 'linkedin') {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          } else if (btn.dataset.platform === 'facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          }
          window.open(shareUrl, '_blank');
        };
      });
    })();
});

// --- Always enable FAQ toggles ---
// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelectorAll('.faq-item').forEach(item => {
//     const question = item.querySelector('.faq-question');
//     if (question) {
//       question.onclick = function() {
//         item.classList.toggle('active');
//       };
//     }
//   });
// });

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const forecastForm = document.getElementById('forecast-form');
    
    if (forecastForm) {
        forecastForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showSuccessMessage('Thank you! Your free demand forecast report will be sent to your email within 24 hours.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Track conversion
                    trackConversion('forecast_form_submit');
                }, 2000);
            }
        });
    }
    
    // Trial button tracking
    const trialButtons = document.querySelectorAll('a[href="#trial"]');
    trialButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackConversion('trial_button_click');
        });
    });
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data['store-url'] || !data['store-url'].includes('myshopify.com')) {
        errors.push('Please enter a valid Shopify store URL');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.products || data.products.trim().length < 10) {
        errors.push('Please enter at least 5 product names');
    }
    
    if (!data.revenue) {
        errors.push('Please select your monthly revenue range');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('<br>'));
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Error message
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Analytics tracking
function initAnalytics() {
    // Track page views
    trackPageView();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track time on page
    trackTimeOnPage();
}

function trackPageView() {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Inventory Forecast AI Landing Page',
            page_location: window.location.href
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'PageView');
    }
}

function trackConversion(eventName) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'conversion',
            event_label: 'landing_page'
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
    }
}

function trackScrollDepth() {
    let maxScroll = 0;
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track at 25%, 50%, 75%, 100%
            if (maxScroll >= 25 && maxScroll < 50) {
                trackEvent('scroll_depth_25');
            } else if (maxScroll >= 50 && maxScroll < 75) {
                trackEvent('scroll_depth_50');
            } else if (maxScroll >= 75 && maxScroll < 100) {
                trackEvent('scroll_depth_75');
            } else if (maxScroll >= 100) {
                trackEvent('scroll_depth_100');
            }
        }
    });
}

function trackTimeOnPage() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'time_on_page',
                value: timeOnPage
            });
        }
    });
}

function trackEvent(eventName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName);
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-card, .solution-card, .benefit-card, .testimonial-card, .pricing-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Counter animation for stats
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-number, .case-stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const suffix = counter.textContent.replace(/[\d]/g, '');
                
                animateCounter(counter, 0, target, suffix);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Add CSS for animations
const animationStyles = `
    .problem-card, .solution-card, .benefit-card, .testimonial-card, .pricing-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .problem-card.animate-in, .solution-card.animate-in, .benefit-card.animate-in, .testimonial-card.animate-in, .pricing-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .success-message, .error-message {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease;
    }
    
    .success-message {
        background: #10b981;
        color: white;
    }
    
    .error-message {
        background: #ef4444;
        color: white;
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .message-content i {
        font-size: 1.25rem;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-top: 1px solid #e5e7eb;
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and tracking
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 
