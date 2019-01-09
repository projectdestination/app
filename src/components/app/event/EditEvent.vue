<template>
    <div class="modal-card">
      <header class="modal-card-head">
          <p class="modal-card-title">{{event.title}}</p>
          <b-field class="top-select is-pulled-right" label="Host">
            <b-select @input="saveDebounce" v-model="event.host">
                <option
                    v-for="option in adminUsers"
                    v-if="option"
                    :key="option.id">
                    {{ option.name }}
                </option>
                <option>None</option>
            </b-select>
          </b-field>
          <b-field @input="saveDebounce" class="top-select is-pulled-right" label="Status">
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
              <div class="section">
                <h2 class="title pd-font uppercase spacing">{{event.title}} - <b-tag type="is-info">{{getMoment(event.date)}}</b-tag></h2>
                <div>
                  <b-field message="The text for the companies to see." label="Event description">
                    <b-input @input="saveDebounce" type="textarea" v-model="event.text"></b-input>
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
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Logistics</h2>
                <b-field label="Date and time">
                  <b-field>
                    <b-datepicker @input="saveDebounce" v-model="event.date"></b-datepicker>
                    <b-timepicker @input="saveDebounce" v-model="event.date"></b-timepicker>
                  </b-field>
                </b-field>
                <b-field label="Location">
                  <b-field>
                    <b-input @input="saveDebounce" v-model="event.address.room" placeholder="Room"></b-input>
                    <b-input @input="saveDebounce" v-model="event.address.street" placeholder="Street"></b-input>
                    <b-input @input="saveDebounce" v-model="event.address.number" placeholder="Number"></b-input>
                    <b-input @input="saveDebounce" v-model="event.address.city" placeholder="City"></b-input>
                  </b-field>
                </b-field>
                <b-field message="Internal notes about event." label="Notes">
                  <b-input @input="saveDebounce" type="textarea" v-model="event.notes"></b-input>
                </b-field>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="section">
                <h2 style="margin-to" class="title pd-font uppercase spacing">Marketing</h2>
                <div>
                  <b-field message="This text will be visible at the event page." label="Marketing text">
                    <b-input @input="saveDebounce" type="textarea" v-model="event.marketing.text"></b-input>
                  </b-field>
                  <b-field message="Notes about the marketing of event." label="Marketing notes">
                    <b-input @input="saveDebounce" type="textarea" v-model="event.marketing.notes"></b-input>
                  </b-field>
                  <DocumentsHandlerButton
                  accept=".jpg, .png, .jpeg, .PNG, .svg"
                  message="Only accepting .jpg, .png, .jpeg, .svg"
                  :upload="uploadFile" icon="cloud_upload"
                  text="Click to upload marketing image"
                  />
                  <span v-if="marketingImage.url">
                    <h4 class="title is-7 pd-font uppercase is-pulled-left spacing">
                      Uploaded by:
                      {{`${marketingImage.uploaded_by.first_name} ${marketingImage.uploaded_by.last_name}`}}
                      <br />
                      at {{getMoment(marketingImage.timeCreated)}}</h4>
                    <a class="is-pulled-right" @click="removeMarketingImage">
                      <i style="font-size: 200%;" class="has-text-danger material-icons">clear</i>
                    </a>
                    <a style="border: none;" :class="downloadMarketingImage ? `is-loading`:``" class="button is-pulled-right" @click="download">
                      <i v-if="!downloadMarketingImage" style="font-size: 200%;" class="has-text-success material-icons">cloud_download</i>
                    </a>
                    <img style="border-radius: 10px;" :src="marketingImage.url" alt="">
                    <div class="">

                    </div>
                  </span>

                  <div class="section">
                    <h2 class="title uppercase is-5 spacing pd-font">Marketing checklist</h2>
                    <ul style="list-style-type:disc; margin-left: 20px;" class="title is-6 pd-font spacing">
                      <li class="list-class" v-for="(preference, index) in event.marketing.checklist" :key="`${preference}_${index}`">
                        {{preference}} <a @click="removeChecklistItem(index)"><i style="font-size: 100% !important;" class="has-text-danger material-icons">clear</i></a>
                      </li>
                    </ul>
                    <b-field message="Add to checklist">
                      <b-input v-model="newChecklistItem"></b-input>
                    </b-field>
                    <a @click="addChecklistItem" class="button is-home">Add to checklist</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="section">
                <h2 style="margin-to" class="title pd-font uppercase spacing">Documents</h2>
                <div class="">
                  <DocumentsHandler
                  icon="cloud_upload"
                  :upload="uploadDocument"
                  text="Drop your files here or click to upload"
                  message="Files with identical names will be overwritten."
                   />
                </div>
                <DocumentList :documents="event.documents" />
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
              <a type="button" @click="goToForm" class="button has-text-weight-normal form-button is-info">Go to form</a>
              <button type="button" @click="toggleForm" :class="event.form.settings.accessible?`is-warning`:`is-info`" class="form-button button has-text-weight-normal">{{event.form.settings.accessible?`Close form`:`Open form`}}</button>
              <button type="button" @click="deleteForm" class="button has-text-weight-normal form-button is-danger">Delete form</button>
              <a @click="applicantsModal" class="button has-text-weight-normal form-button is-info">View applicants</a>
              <a @click="update" class="button has-text-weight-normal form-button is-primary">Update</a>
              <div style="margin-top: 20px;">
                <b-field message="The text which the applicant will read." label="Form text">
                  <b-input @input="saveDebounce" type="textarea" maxlength="1000" v-model="event.form.text"></b-input>
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
  <footer class="modal-card-foot">
    <button class="button is-warning" type="button" @click="closeModal">Close <i class="material-icons">clear</i></button>
    <button class="button is-success" type="button" @click="handleSave">Save <i class="material-icons">save</i></button>
    <button class="button is-twitter is-pulled-right" type="button" @click="goToEvent">Go to event <i class="material-icons">call_made</i></button>
    <button class="button is-danger is-pulled-right" type="button" @click="deleteEvent">Delete <i class="material-icons">delete_forever</i></button>
    <b-tooltip :label="event.public ? `Unpublishing event will make the event disapear from our front webpage.` : `Publishing event will make the event appear in our front webpage.`">
      <b-field class="top-select is-pulled-right">
        <b-switch @input="saveDebounce" v-model="event.public"
        type="is-success">
        {{event.public ? `UNPUBLISH` : `PUBLISH`}} EVENT
        </b-switch>
      </b-field>
    </b-tooltip>
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
import DocumentsHandler from "@/components/app/document_handler/DocumentsHandler";
import DocumentsHandlerButton from "@/components/app/document_handler/DocumentsHandlerButton";
import DocumentList from "@/components/DocumentList";

export default {
  data: () => {
    return {
      eventStatuses: EVENT_STATUSES,
      maxChars: FORM_MAX_CHARS,
      newPreference: "",
      downloadMarketingImage: false,
      newChecklistItem: ""
    };
  },
  components: {
    Applicants,
    DocumentsHandler,
    DocumentsHandlerButton,
    DocumentList
  },
  computed: {
    ...mapState({
      company: function(state) {
        const { companies } = state.admin.companies;
        const company = companies[this.company_key];
        return company;
      },
      currentUser(state) {
        return state.user.user;
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
    marketingImage() {
      return this.$store.getters[`admin/events/getMarketingImage`](
        this.eventID
      );
    },
    ...mapGetters({
      adminUsers: "admin/getAdminUsers"
    })
  },
  methods: {
    uploadFile(file) {
      if (file.length > 0) {
        if (this.marketingImage !== "") {
          this.removeMarketingImage();
        }
        this.saveDebounce();
        this.$store.dispatch("document_handler/uploadFile", {
          file: file[0],
          id: this.eventID,
          type: "event",
          user: this.currentUser,
          saveAction: "admin/events/addMarketingImage"
        });
      }
    },
    download() {
      this.downloadMarketingImage = true;
      const callBack = () => {
        this.downloadMarketingImage = false;
      };
      const file = this.event.marketing.image;
      this.$store.dispatch("document_handler/downloadFile", {
        callBack,
        file,
        http: this.$http
      });
    },
    uploadDocument(file) {
      if (file.length > 0) {
        this.saveDebounce();
        this.$store.dispatch("document_handler/uploadFile", {
          file: file[0],
          id: this.eventID,
          type: "event_document",
          user: this.currentUser,
          saveAction: "admin/events/addDocument"
        });
      }
    },
    removeMarketingImage() {
      const { image } = this.event.marketing;
      this.$store.dispatch("document_handler/removeFile", {
        name: image.name,
        id: this.eventID,
        type: "event",
        saveAction: "admin/events/removeMarketingImage"
      });
    },
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
    addChecklistItem() {
      const { newChecklistItem, saveDebounce } = this;
      if (newChecklistItem !== "") {
        this.event.marketing.checklist.push(newChecklistItem);
        this.newChecklistItem = "";
        saveDebounce();
      }
    },
    removeChecklistItem(index) {
      this.event.marketing.checklist.splice(index, 1);
      this.handleSave();
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
        this.newPreference = "";
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
    goToEvent() {
      let routeData = this.$router.resolve({ path: `/event/${this.eventID}` });
      window.open(routeData.href, "_blank");
    },
    update() {
      this.$store.dispatch("admin/applications/getApplicantData", this.eventID);
    },
    deleteEvent() {
      const { documents } = this.event;
      if (this.marketingImage.url !== undefined) {
        this.$store.dispatch("document_handler/deleteAllFiles", {
          type: "event",
          name: this.marketingImage.name,
          id: this.eventID
        });
      }
      const keys = Object.keys(documents);
      if (keys.length > 0) {
        keys.forEach(d => {
          this.$store.dispatch("document_handler/deleteAllFiles", {
            type: "event_document",
            name: documents[d].name,
            id: this.eventID
          });
        });
      }
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
    this.saveDebounce = debounce(
      () => {
        console.log("asdfasdfasdf");
        this.handleSave();
      },
      DEBOUNCE_TIME,
      {
        leading: false,
        trailing: true
      }
    );
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
