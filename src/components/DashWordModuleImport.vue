<template>
  <div v-if="show" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeModal">&times;</span>
      <div class="sampi-db-logo module">
        <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
      </div>

      <h2 class="lato-bold">Importera ord från fil</h2>
      <p class="info">
        Ladda upp en CSV- eller Excel-fil med samma kolumner som exportfilen
        (Samiska, Definition på Samiska, Svenska … Polaritetsnod, Känslonod, Uttryck, Uttrycksöversättning).
        Ord som redan finns (samma samiska ord) uppdateras, nya ord läggs till och saknade noder skapas.
        Tomma celler skriver inte över befintliga värden.
      </p>

      <!-- Step 1: choose file -->
      <div v-if="!finished" class="flex-col">
        <label for="import-file">Fil (.csv eller .xlsx)</label>
        <input id="import-file" ref="fileInput" type="file" accept=".csv,.txt,.xlsx,.xls" @change="onFileChange" :disabled="loading" />
      </div>

      <p v-if="errorMessage" class="red-text">{{ errorMessage }}</p>
      <p v-if="loading" class="status">Bearbetar filen …</p>

      <!-- Step 2: preview / Step 3: result -->
      <div v-if="result" class="data">
        <p class="lato-bold">{{ result.dry_run ? 'Förhandsgranskning – inget är sparat än' : 'Importen är klar' }}</p>
        <ul class="summary">
          <li>{{ result.created }} nya ord {{ result.dry_run ? 'läggs till' : 'har lagts till' }}</li>
          <li>{{ result.updated }} befintliga ord {{ result.dry_run ? 'uppdateras' : 'har uppdaterats' }}</li>
          <li v-if="result.unchanged">{{ result.unchanged }} ord är oförändrade</li>
          <li v-if="result.nodes_created.length">
            {{ result.nodes_created.length }} nya noder {{ result.dry_run ? 'skapas' : 'har skapats' }}:
            {{ result.nodes_created.join(', ') }}
          </li>
          <li v-if="result.errors.length" class="red-text">{{ result.errors.length }} rader hoppas över på grund av fel</li>
        </ul>

        <div v-if="result.errors.length" class="errors">
          <p class="label">Rader med fel</p>
          <ul>
            <li v-for="err in result.errors" :key="err.row">
              Rad {{ err.row }}<span v-if="err.word"> ({{ err.word }})</span>: {{ err.message }}
            </li>
          </ul>
        </div>
      </div>

      <div class="submit-section">
        <span class="delete-button" @click="closeModal">{{ finished ? 'Stäng' : 'Avbryt' }}</span>
        <button v-if="!finished" type="button" :disabled="!file || loading" @click="upload(true)">Förhandsgranska</button>
        <button
          v-if="!finished && result && result.dry_run"
          type="button"
          :disabled="loading || (result.created + result.updated === 0)"
          @click="upload(false)"
        >Importera</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { useUrlGet } from '../stores/urlGet';
import EventBus from '../util/event-bus';
import { authFetch, getToken } from '../util/authFetch';

export default {
  setup() {
    const useUrl = useUrlGet();
    return { useUrl };
  },
  props: {
    show: { type: Boolean, required: true }
  },
  emits: ['close-modal'],
  data() {
    return {
      urlImport: this.useUrl.urlGet + '/words/import',
      file: null,
      result: null,
      loading: false,
      finished: false,
      errorMessage: ''
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0] || null;
      this.result = null;
      this.errorMessage = '';
    },

    // Excel files are converted to a ;-separated CSV in the browser; CSV files are sent as they are.
    async fileAsCsv() {
      const name = this.file.name.toLowerCase();
      if (!name.endsWith('.xlsx') && !name.endsWith('.xls')) {
        return { blob: this.file, name: this.file.name };
      }
      const workbook = XLSX.read(await this.file.arrayBuffer(), { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const csv = XLSX.utils.sheet_to_csv(sheet, { FS: ';', blankrows: false });
      return { blob: new Blob([csv], { type: 'text/csv;charset=utf-8' }), name: 'import.csv' };
    },

    async upload(dryRun) {
      if (!this.file) return;
      const token = getToken();
      if (!token) {
        this.errorMessage = 'Du måste vara inloggad för att importera ord.';
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      try {
        const { blob, name } = await this.fileAsCsv();
        const formData = new FormData();
        formData.append('file', blob, name);
        formData.append('dry_run', dryRun ? '1' : '0');

        // authFetch adds the login token and handles an expired login
        const response = await authFetch(this.urlImport, { method: 'POST', body: formData });
        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
          return; // authFetch has already logged out and redirected
        } else if (!response.ok) {
          this.errorMessage = data.message || 'Något gick fel vid importen (felkod ' + response.status + ').';
        } else {
          this.result = data;
          if (!dryRun) {
            this.finished = true;
            EventBus.emit('change-to-database');
          }
        }
      } catch (e) {
        console.error(e);
        this.errorMessage = 'Kunde inte läsa eller skicka filen.';
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.file = null;
      this.result = null;
      this.finished = false;
      this.errorMessage = '';
      this.$emit('close-modal');
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center !important;
  align-items: center;
  z-index: 3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  max-width: 560px;
  width: 80%;
  max-height: 85vh;
  overflow-y: auto;
  background-color: white;
  padding: 20px 40px;
  border-radius: 5px;
  position: relative;
}

.close {
  cursor: pointer;
  padding: 4px 10px 6px 10px;
  border-radius: 15px;
  border: 1px solid #134da2;
  position: absolute;
  top: 10px;
  right: 20px;
}

.close:hover {
  background-color: #134da2;
  color: #fff;
}

div.modal h2 {
  margin-top: 50px;
}

p.info {
  font-size: 0.9em;
  color: #444;
}

div.flex-col {
  display: flex;
  flex-direction: column;
  margin: 1.5em 0;
  gap: 6px;
}

div.flex-col label,
p.label {
  text-transform: uppercase;
  color: grey;
  font-size: xx-small;
}

p.status {
  color: #134da2;
}

.red-text {
  color: red;
}

div.data {
  background-color: #eeeeee;
  padding: 10px 20px;
  margin: 1em 0;
}

ul.summary {
  padding-left: 1.2em;
}

div.errors ul {
  max-height: 160px;
  overflow-y: auto;
  padding-left: 1.2em;
  font-size: 0.85em;
}

div.submit-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin: 1.5em 0 1em 0;
}

span.delete-button {
  text-decoration: underline;
  cursor: pointer;
}

span.delete-button:hover {
  text-decoration: none;
  color: red;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
