<template>
  <div class="contact-form-container">
    <h2>Contactez-nous</h2>
    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="formData.name" required aria-label="Nom" placeholder="Entrez votre nom">
        <span class="error" v-if="formErrors.name">{{ formErrors.name }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="formData.email" required aria-label="Email" placeholder="Entrez votre email">
        <span class="error" v-if="formErrors.email">{{ formErrors.email }}</span>
      </div>
      <div class="form-group">
        <label for="message">Message :</label>
        <textarea id="message" v-model="formData.message" required aria-label="Message" placeholder="Entrez votre message"></textarea>
        <span class="error" v-if="formErrors.message">{{ formErrors.message }}</span>
      </div>
      <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}</button>
      <span class="success" v-if="isSubmitted">Formulaire soumis avec succès!</span>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      formErrors: {},
      isSubmitting: false,
      isSubmitted: false
    }
  },
  methods: {
    async submitForm () {
      this.validateForm()
      if (Object.keys(this.formErrors).length === 0) {
        this.isSubmitting = true
        try {
          // Simuler une soumission de formulaire à une API
          await this.submitToAPI()
          console.log('Formulaire soumis avec les données :', this.formData)
          this.isSubmitted = true
          this.resetForm()
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error)
        } finally {
          this.isSubmitting = false
        }
      }
    },
    validateForm () {
      this.formErrors = {}
      if (!this.formData.name.trim()) {
        this.formErrors.name = 'Veuillez entrer votre nom.'
      }
      if (!this.formData.email.trim()) {
        this.formErrors.email = 'Veuillez entrer votre adresse email.'
      } else if (!this.isValidEmail(this.formData.email)) {
        this.formErrors.email = 'Veuillez entrer une adresse email valide.'
      }
      if (!this.formData.message.trim()) {
        this.formErrors.message = 'Veuillez entrer votre message.'
      }
    },
    isValidEmail (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    async submitToAPI () {
      // Simuler une requête API
      return new Promise(resolve => setTimeout(resolve, 1000))
    },
    resetForm () {
      this.formData = {
        name: '',
        email: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact-form-container {
  margin: 5cm auto 0;
  max-width: 800px;
}

.contact-form {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 10px;
  background: #f2f2f2; /* Couleur d'arrière-plan neutre */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333; /* Texte en noir */
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc; /* Bordure gris clair */
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

button {
  display: block;
  width: 100%;
  padding: 16px;
  background-color: #007bff; /* Bleu vif pour le bouton */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* Bleu foncé au survol */
}

.error {
  color: #cc0000; /* Rouge foncé pour les messages d'erreur */
  font-size: 14px;
}

.success {
  color: #008000; /* Vert foncé pour les messages de succès */
  font-size: 16px;
}

.success {
  color: green;
  font-size: 16px;
}
</style>
