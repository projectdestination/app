<template>
    <div class="modal-card">
      <header class="modal-card-head">
          <p class="modal-card-title">{{event.title}}</p>
          <b-field class="top-select is-pulled-right" label="Host">
            <b-select v-model="event.host">
                <option
                    v-for="option in adminUsers"
                    v-if="option"
                    :key="option.id">
                    {{ option.name }}
                </option>
                <option>None</option>
            </b-select>
          </b-field>
          <b-field class="top-select is-pulled-right" label="Status">
            <b-select v-model="event.status">
                <option
                    v-for="option in eventStatuses"
                    v-if="option"
                    :key="option">
                    {{ option }}
                </option>
                <option>None</option>
            </b-select>
          </b-field>
      </header>
      <section class="modal-card-body section">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div class="">
                <h2 class="title pd-font uppercase spacing">{{event.title}} - <b-tag type="is-info">{{getMoment(event.date)}}</b-tag></h2>
                <div>
                  <b-field message="The text for the companies to see." label="Event description">
                    <b-input type="textarea" v-model="event.text"></b-input>
                  </b-field>
                </div>
                <div class="section">
                  <h2 class="title uppercase is-5 spacing pd-font">Preferences from the company</h2>
                  <ul style="list-style-type:disc; margin-left: 20px;" class="title is-6 pd-font spacing">
                    <li class="list-class" v-for="(preference, index) in event.preferences" :key="`${preference}_${index}`">
                      {{preference}} <a @click="removePreference(index)"><i style="font-size: 100% !important;" class="has-text-danger material-icons">clear</i></a>
                    </li>
                  </ul>
                  <b-field message="Add to preference list">
                    <b-input v-model="newPreference"></b-input>
                  </b-field>
                  <a @click="addPreference" class="button is-home">Add preference</a>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="">
                <h2 class="title pd-font uppercase spacing">Logistics</h2>
                <b-field label="Date and time">
                  <b-field>
                    <b-datepicker v-model="event.date"></b-datepicker>
                    <b-timepicker v-model="event.date"></b-timepicker>
                  </b-field>
                </b-field>
                <b-field label="Location">
                  <b-field>
                    <b-input v-model="event.address.room" placeholder="Room"></b-input>
                    <b-input v-model="event.address.street" placeholder="Street"></b-input>
                    <b-input v-model="event.address.number" placeholder="Number"></b-input>
                    <b-input v-model="event.address.city" placeholder="City"></b-input>
                  </b-field>
                </b-field>
                <b-field message="Internal notes about event." label="Notes">
                  <b-input type="textarea" v-model="event.notes"></b-input>
                </b-field>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
            </div>
            <div class="column">
              <div class="section">
              </div>
            </div>
          </div>
          <div class="">
            <h2 class="title pd-font uppercase spacing">Students</h2>
            <span v-if="!event.form">
              <h4 class="title"><b-tag type="is-warning" class="pd-font uppercase spacing">No form has been created </b-tag></h4>
              <a @click="createForm" class="button is-success">Create a form</a>
            </span>
            <span v-if="event.form">
              <h4 class="title">
                <b-tag type="is-success" class="pd-font uppercase spacing">
                  Form created at: {{getMoment(event.form.created_at)}}
                </b-tag>
              </h4>
              <a type="button" @click="goToForm" class="button has-text-weight-normal form-button is-success">Go to form</a>
              <button type="button" @click="toggleForm" :class="event.form.settings.accessible?`is-warning`:`is-success`" class="form-button button has-text-weight-normal">{{event.form.settings.accessible?`Close form`:`Open form`}}</button>
              <button type="button" @click="deleteForm" class="button has-text-weight-normal form-button is-danger">Delete form</button>
              <a @click="applicantsModal" class="button has-text-weight-normal form-button is-info">View applicants</a>
              <a @click="update" class="button has-text-weight-normal form-button is-primary">Update</a>
              <div style="margin-top: 20px;">
                <b-field message="The text which the applicant will read." label="Form text">
                  <b-input @input="saveDebounce" type="textarea" maxlength="400" v-model="event.form.text"></b-input>
                </b-field>
                <b-field message="Only accepting emails from this domain. Leave blank for all domains. Strongly adviced to keep at kth.se to avoid people creating duplicates." label="Domain">
                  <b-input @input="saveDebounce" maxlength="50" v-model="event.form.settings.domain"></b-input>
                </b-field>
                <b-field v-if="event.form.questions.length > 0" v-for="(question, index) in event.form.questions" :key="`${index}`" :label="`Question ${index+1}:`">
                  <b-field>
                    <b-input @input="onLabelInput(index)" required expanded maxlength="50" v-model="question.label" placeholder="Entry"></b-input>
                    <b-input @input="saveDebounce" expanded maxlength="50" v-model="question.message" placeholder="Message"></b-input>
                    <b-input @input="saveDebounce" expanded maxlength="50" v-model="question.placeholder" placeholder="Placeholder"></b-input>
                    <b-select @input="saveDebounce"  v-model="question.maxlength" placeholder="Maxlength">
                      <option v-for="number in maxChars" :key="number">
                        {{number}}
                      </option>
                    </b-select>
                    <span style="margin-left: 10px; margin-top:4px">
                      <b-switch @input="saveDebounce" v-model="question.required" type="is-danger"> Reqired</b-switch>
                    </span>
                    <a style="margin-top:2px" @click="removeQuestion(index)">
                      <b-tooltip type="is-danger" label="Remove question"
                        position="is-top">
                        <i style="font-size: 180% !important;" class="has-text-danger material-icons">
                          clear
                        </i>
                    </b-tooltip>
                  </a>
                  </b-field>
                </b-field>
                <a type="button" @click="addQuestion" class="button has-text-weight-normal form-button is-home">Add question</a>
              </div>
              <div class="section">
                <Applicants :eventID="eventID" />
              </div>
              <span></span>
            </span>
          </div>
        </div>
      </section>
  <footer class="modal-card-foot ">
    <button class="button is-warning" type="button" @click="closeModal">Close <i class="material-icons">clear</i></button>
    <button class="button is-success" type="button" @click="handleSave">Save <i class="material-icons">save</i></button>
    <button class="button is-danger is-pulled-right" type="button" @click="deleteEvent">Delete <i class="material-icons">delete_forever</i></button>
  </footer>
</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import {
  EVENT_STATUSES,
  FORM_MAX_CHARS,
  DEFAULT_QUESTION,
  DEBOUNCE_TIME
} from "@/constants/event";
import Applicants from "@/components/app/event/Applicants";
import ApplicantsModal from "@/components/app/event/ApplicantsModal";
import debounce from "lodash/debounce";
import moment from "moment";

export default {
  data: () => {
    return {
      eventStatuses: EVENT_STATUSES,
      maxChars: FORM_MAX_CHARS,
      newPreference: ""
    };
  },
  components: {
    Applicants
  },
  computed: {
    ...mapState({
      company: function(state) {
        const { companies } = state.admin.companies;
        const company = companies[this.company_key];
        return company;
      },
      event: function(state) {
        const { events } = state.admin.events;
        const activeEvent = events[this.eventID];
        activeEvent.id = this.eventID;
        if (activeEvent.date.seconds) {
          activeEvent.date = new Date(activeEvent.date.seconds * 1000);
        }
        return activeEvent;
      }
    }),
    ...mapGetters({
      adminUsers: "admin/getAdminUsers"
    })
  },
  methods: {
    handleSave() {
      const { dispatch } = this.$store;
      const { event } = this;
      dispatch("admin/events/saveEvent", event);
    },
    addQuestion() {
      this.event.form.questions.push({
        ...DEFAULT_QUESTION,
        key: "",
        label: ""
      });
      this.saveDebounce();
    },
    onLabelInput(index) {
      this.debouncedInput(index);
    },
    removeQuestion(index) {
      this.event.form.questions.splice(index, 1);
      this.handleSave();
    },
    closeModal() {
      this.$parent.close();
    },
    addPreference() {
      const { newPreference, saveDebounce } = this;
      if (newPreference !== "") {
        this.event.preferences.push(newPreference);
        saveDebounce();
      }
    },
    removePreference(index) {
      this.event.preferences.splice(index, 1);
      this.handleSave();
    },
    toggleForm() {
      const { accessible } = this.event.form.settings;
      const { form } = this.event;
      form.settings.accessible = !accessible;
      this.$store.dispatch("form/updateForm", form);
    },
    createForm() {
      this.$store.dispatch("admin/events/createForm", this.event);
    },
    deleteForm() {
      this.$store.dispatch("admin/events/removeForm", this.eventID);
    },
    goToForm() {
      let routeData = this.$router.resolve({ path: `/form/${this.eventID}` });
      window.open(routeData.href, "_blank");
    },
    update() {
      this.$store.dispatch("admin/applications/getApplicantData", this.eventID);
    },
    deleteEvent() {
      this.$store.dispatch("admin/events/deleteEvent", this.eventID);
      this.$parent.close();
    },
    getMoment(date) {
      return moment(date).format("D MMMM YY - HH:mm");
    },
    applicantsModal() {
      this.$modal.open({
        parent: this,
        component: ApplicantsModal,
        hasModalCard: true
      });
    }
  },
  beforeMount() {
    this.debouncedInput = debounce(index => {
      const key = this.event.form.questions[index].label
        .toLowerCase()
        .replace(" ", "_");
      this.event.form.questions[index].key = key;
      this.handleSave();
    }, DEBOUNCE_TIME);
    this.saveDebounce = debounce(() => {
      this.handleSave();
    }, DEBOUNCE_TIME);
  },
  created() {
    this.company_key = this.$attrs.content.owner_key;
    this.eventID = this.$attrs.content.id;
  }
};
</script>

<style scoped>
.top-select {
  margin: 0 10px !important;
}
.modal-card {
  max-width: none !important;
  width: 100vw !important;
  margin: 0 !important;
  height: 100vh !important;
  border-radius: 0 !important;
}
.material-icons {
  transform: scale(0.7);
  margin-left: 5px;
}
.tag {
  margin-right: 5px;
}
.list-class {
  margin-top: 5px;
}
.form-button {
  margin-right: 20px;
}
</style>
