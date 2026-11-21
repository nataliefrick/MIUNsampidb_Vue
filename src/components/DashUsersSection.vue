<template>
  <section id="users">
    <div class="title">
      <h3 class="lato-bold">Administratörer</h3>
      <button class="see-all button-icon" @click="toggleForm()">
        {{ showForm ? 'Stäng' : 'Ny administratör' }}<i class="fa-solid fa-user-plus"></i>
      </button>
    </div>
    <p>Personer som kan logga in och administrera databasen. Bara inloggade administratörer kan lägga till nya.</p>

    <!-- New admin form -->
    <form v-if="showForm" class="new-user" @submit.prevent="createUser()">
      <div class="field">
        <label for="new-name">Namn</label>
        <input id="new-name" type="text" v-model="form.name" required autocomplete="off" />
      </div>
      <div class="field">
        <label for="new-email">E-post</label>
        <input id="new-email" type="email" v-model="form.email" required autocomplete="off" />
      </div>
      <div class="field">
        <label for="new-password">Lösenord (minst 8 tecken)</label>
        <input id="new-password" type="password" v-model="form.password" minlength="8" required autocomplete="new-password" />
      </div>
      <div class="actions">
        <button type="submit" :disabled="saving">Skapa administratör</button>
      </div>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="errorMessage" class="red-text">{{ errorMessage }}</p>

    <!-- List -->
    <ul class="user-list">
      <li v-for="user in users" :key="user.id">
        <div class="who">
          <span class="lato-bold">{{ user.name }}</span>
          <span class="email">{{ user.email }}</span>
        </div>
        <span v-if="isMe(user)" class="me">Du</span>
        <template v-else>
          <span v-if="confirmId !== user.id" class="delete-button" @click="confirmId = user.id">Radera</span>
          <span v-else class="confirm">
            <span class="red-text">Radera {{ user.name }}?</span>
            <button @click="deleteUser(user)">Ja</button>
            <button @click="confirmId = null">Nej</button>
          </span>
        </template>
      </li>
    </ul>
  </section>
</template>

<script>
import { useUrlGet } from '../stores/urlGet';
import { authFetch } from '../util/authFetch';

export default {
  setup() {
    const useUrl = useUrlGet();
    return { useUrl };
  },
  data() {
    return {
      urlUsers: this.useUrl.urlGet + '/users',
      users: [],
      showForm: false,
      saving: false,
      confirmId: null,
      message: '',
      errorMessage: '',
      form: { name: '', email: '', password: '' }
    };
  },
  methods: {
    isMe(user) {
      try {
        return user.email === JSON.parse(localStorage.getItem('userEmail'));
      } catch {
        return false;
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
      this.message = '';
      this.errorMessage = '';
    },
    async getUsers() {
      const response = await authFetch(this.urlUsers, { method: 'GET' });
      if (response.ok) {
        this.users = await response.json();
      }
    },
    async createUser() {
      this.saving = true;
      this.message = '';
      this.errorMessage = '';
      try {
        const response = await authFetch(this.urlUsers, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok) {
          this.message = data.message;
          this.form = { name: '', email: '', password: '' };
          this.showForm = false;
          this.getUsers();
        } else if (response.status !== 401) {
          this.errorMessage = data.message || 'Kunde inte skapa administratören.';
        }
      } finally {
        this.saving = false;
      }
    },
    async deleteUser(user) {
      this.message = '';
      this.errorMessage = '';
      const response = await authFetch(this.urlUsers + '/' + user.id, { method: 'DELETE' });
      const data = await response.json().catch(() => ({}));
      this.confirmId = null;
      if (response.ok) {
        this.message = data.message;
        this.getUsers();
      } else if (response.status !== 401) {
        this.errorMessage = data.message || 'Kunde inte radera administratören.';
      }
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
section#users {
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 1451px) { section#users { max-width: 600px; margin: 2%; } }
@media (max-width: 1450px) { section#users { width: 80%; margin: 2% auto; } }

div.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

button {
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  padding: calc(10px + 0.25rem) calc(10px + 0.5rem);
  border-radius: 10px;
  transition: all 0.3s ease;
}

button i {
  margin-left: 10px;
}

button:hover,
button:hover i {
  color: #fff;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

form.new-user {
  background-color: #eeeeee;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

div.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

div.field label {
  text-transform: uppercase;
  color: grey;
  font-size: xx-small;
}

div.field input {
  border: none;
  line-height: 2.5em;
  padding: 0 10px;
  background-color: #134da220;
}

div.field input:focus {
  outline: 1px solid #134da2;
}

div.actions {
  display: flex;
  justify-content: flex-end;
}

p.message {
  color: #087f47;
}

.red-text {
  color: red;
}

ul.user-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

ul.user-list li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 10px 6px;
  border-bottom: 1px solid #134da250;
}

div.who {
  display: flex;
  flex-direction: column;
}

span.email {
  font-size: 0.85em;
  color: #555;
}

span.me {
  font-size: 0.85em;
  color: grey;
}

span.delete-button {
  text-decoration: underline;
  cursor: pointer;
}

span.delete-button:hover {
  text-decoration: none;
  color: red;
}

span.confirm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

span.confirm button {
  padding: 6px 12px;
}
</style>
