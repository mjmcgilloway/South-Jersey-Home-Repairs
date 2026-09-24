document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('lead-form');
const steps = Array.from(form.querySelectorAll('.form-step'));
const errorEl = document.getElementById('form-error');

const answers = { service: '', budget: '', urgency: '' };
let currentStepIndex = 0;

function showStep(index) {
  steps.forEach((step, i) => step.classList.toggle('active', i === index));
  currentStepIndex = index;
}

function goToStepByName(name) {
  const index = steps.findIndex(s => s.dataset.step === name);
  if (index !== -1) showStep(index);
}

// Handle option button selection (service / budget / urgency)
form.querySelectorAll('.option-grid').forEach(grid => {
  const field = grid.dataset.field;
  grid.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      answers[field] = btn.textContent.trim();

      // auto-advance to next step after short delay
      setTimeout(() => {
        showStep(currentStepIndex + 1);
      }, 200);
    });
  });
});

// Final submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.hidden = true;

  const formData = new FormData(form);
  const payload = {
    service: answers.service,
    budget: answers.budget,
    urgency: answers.urgency,
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    location: formData.get('location'),
  };

  if (!payload.service || !payload.budget || !payload.urgency) {
    errorEl.textContent = 'Please complete every step before submitting.';
    errorEl.hidden = false;
    goToStepByName('1');
    return;
  }

  const submitBtn = form.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const res = await fetch('/.netlify/functions/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Submission failed');

    goToStepByName('success');
  } catch (err) {
    errorEl.textContent = 'Something went wrong submitting your info. Please call us at (609) 605-8851.';
    errorEl.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Get Connected Today';
  }
});
