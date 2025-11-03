// Sélection des éléments du formulaire
const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Expressions régulières pour la validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;

// Fonction pour afficher les erreurs
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
  
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = 'red';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  
  input.style.borderColor = 'red';
  
  if (!formGroup.querySelector('.error-message')) {
    formGroup.appendChild(errorDiv);
  }
}

// Fonction pour effacer les erreurs
function clearError(input) {
  const formGroup = input.parentElement;
  const errorDiv = formGroup.querySelector('.error-message');
  
  if (errorDiv) {
    errorDiv.remove();
  }
  
  input.style.borderColor = '';
}

// Validation du nom
function validateName() {
  const value = nameInput.value.trim();
  
  clearError(nameInput);
  
  if (value === '') {
    showError(nameInput, 'Le nom est requis');
    return false;
  }
  
  if (!nameRegex.test(value)) {
    showError(nameInput, 'Le nom doit contenir entre 2 et 50 lettres');
    return false;
  }
  
  return true;
}

// Validation de l'email
function validateEmail() {
  const value = emailInput.value.trim();
  
  clearError(emailInput);
  
  if (value === '') {
    showError(emailInput, 'L\'email est requis');
    return false;
  }
  
  if (!emailRegex.test(value)) {
    showError(emailInput, 'Format d\'email invalide');
    return false;
  }
  
  return true;
}

// Validation de l'âge
function validateAge() {
  const value = parseInt(ageInput.value);
  
  clearError(ageInput);
  
  if (isNaN(value)) {
    showError(ageInput, 'L\'âge est requis');
    return false;
  }
  
  if (value < 18 || value > 120) {
    showError(ageInput, 'L\'âge doit être entre 18 et 120 ans');
    return false;
  }
  
  return true;
}

// Validation du mot de passe
function validatePassword() {
  const value = passwordInput.value;
  
  clearError(passwordInput);
  
  if (value === '') {
    showError(passwordInput, 'Le mot de passe est requis');
    return false;
  }
  
  if (value.length < 8) {
    showError(passwordInput, 'Le mot de passe doit contenir au moins 8 caractères');
    return false;
  }
  
  if (!/[A-Z]/.test(value)) {
    showError(passwordInput, 'Le mot de passe doit contenir au moins une majuscule');
    return false;
  }
  
  if (!/[0-9]/.test(value)) {
    showError(passwordInput, 'Le mot de passe doit contenir au moins un chiffre');
    return false;
  }
  
  return true;
}

// Validation de la confirmation du mot de passe
function validateConfirmPassword() {
  const value = confirmPasswordInput.value;
  
  clearError(confirmPasswordInput);
  
  if (value === '') {
    showError(confirmPasswordInput, 'Veuillez confirmer le mot de passe');
    return false;
  }
  
  if (value !== passwordInput.value) {
    showError(confirmPasswordInput, 'Les mots de passe ne correspondent pas');
    return false;
  }
  
  return true;
}

// Événements de validation en temps réel
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
ageInput.addEventListener('blur', validateAge);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

// Soumission du formulaire
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isAgeValid = validateAge();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  
  if (isNameValid && isEmailValid && isAgeValid && isPasswordValid && isConfirmPasswordValid) {
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      age: parseInt(ageInput.value),
      password: passwordInput.value
    };
    
    console.log('Formulaire valide !', formData);
    alert('Formulaire soumis avec succès !');
    
    // Vous pouvez envoyer les données à un serveur ici
    // fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) })
  } else {
    console.log('Formulaire invalide');
  }
});
