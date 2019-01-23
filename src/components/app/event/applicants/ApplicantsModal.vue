<template>
  <div>
    <div class="modal-card" style="width: 100%">
      <header class="modal-card-head">
        <p class="modal-card-title">Applicants</p>
      </header>
      <section class="modal-card-body">
        <div style="margin-left: 50px" class="columns section">
          <div class="column">
            <h2 class="title pd-font is-5 uppercase spacing">
              Double click a row to attend an attendee.
            </h2>
            <h2 class="title pd-font is-6 uppercase spacing">
              Click on the far left of any row to expand the row for more attendee data.
            </h2>
          </div>
          <div class="column">
          </div>
        </div>
        <div style="margin-top: -50px;" class="section">
          <b-field>
            <b-input
            expanded
            placeholder=" Search..."
            type="search"
            v-model="search"></b-input>
          </b-field>
          <b-field>
            <b-switch
            v-model="showOnlyNotAttended"
            type="is-success">
            Show only unchecked.
          </b-switch>
          </b-field>
          <b-table
            detailed
            detail-key="email"
            @dblclick="(obj) => updateRow(obj)"
            :row-class="() => `hover`"
             hoverable
             :data="applicants">
            <template slot-scope="props">
              <b-table-column field="attended" label="Attended" width="10">
                <b-switch disabled v-model="props.row.attended" type="is-success"></b-switch>
              </b-table-column>
              <b-table-column field="name" label="Name" width="200">
                {{ props.row.first_name }} {{props.row.last_name}}
              </b-table-column>
              <b-table-column field="email" label="Email" width="200">
                {{ props.row.email }}
              </b-table-column>
              <b-table-column field="diet" label="Diet" width="150">
                {{ props.row.diet }}
              </b-table-column>
              <b-table-column field="programme" label="Programme" width="200">
                <b-tag type="is-orange">{{ props.row.programme }}</b-tag>
              </b-table-column>
              <b-table-column field="year" label="Year" width="90">
                <b-tag type="is-info">{{ props.row.year }}</b-tag>
              </b-table-column>
            </template>
            <template slot="detail" slot-scope="props">
            <article class="media">
              <a
              :class="props.row.deleteClicked ? `is-loading`: ``"
              @click="() => {
                props.row.deleteClicked = true
                removeApplicant(props.row.id, props.row.formID)
                }"
              class="button is-danger">
                Remove applicant
                <i
                style="font-size: 100% !important;"
                class="material-icons">
                clear
              </i>
              </a>
                <figure class="media-left">
                    <p class="image is-64x64">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="columns">
                      <div v-if="props.row" class="column content">
                          <p>
                              <strong>
                                {{ props.row.first_name }}
                                {{ props.row.last_name }}
                              </strong>
                              signed up at {{ getMoment(props.row.applied_at) }}.
                              <br />
                              <small>
                                {{ props.row.phone }}
                              </small>
                              <br>
                              Free text: {{props.row.free_text}}.
                          </p>
                      </div>
                      <div v-if="props.row.extraQuestions" class="column">
                        <div class="columns">
                          <div class="column">
                            <strong>Other questions --></strong><br />
                          </div>
                          <div class="column">
                            <span
                            v-for="question in props.row.extraQuestions"
                            :key="question.question">
                              <strong>{{question.question}}</strong><br />
                              <small>{{ question.answer }}</small>   <br /><br />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </article>
            </template>

          </b-table>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button :disabled="applicants.length < 1" class="button is-info" type="button" @click="exportData">Download current list as .xlsx</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import XLSX from "xlsx";
import saveAs from "file-saver";
import { XLSX_HEADLINES } from "@/constants/exports";

export default {
  data: () => {
    return {
      search: "",
      showOnlyNotAttended: false
    };
  },
  computed: {
    ...mapState({
      applicants: function(state) {
        const { applicants } = state.admin.applications;
        const searchString = this.search.toLowerCase();
        let applicantsArray = [];
        Object.keys(applicants).forEach(d => {
          const { email, first_name, last_name, phone, attended } = applicants[
            d
          ];
          const found =
            email.toLowerCase().includes(searchString) ||
            first_name.toLowerCase().includes(searchString) ||
            last_name.toLowerCase().includes(searchString) ||
            phone.toLowerCase().includes(searchString);
          const filter = this.showOnlyNotAttended ? !attended : true;
          if (found && filter) {
            applicantsArray = [...applicantsArray, applicants[d]];
          }
        });
        return applicantsArray;
      }
    })
  },
  methods: {
    getMoment(date) {
      return moment(date).format("D MMMM YY - HH:mm");
    },
    removeApplicant(id, formID) {
      const payload = { id, formID };
      this.$store.dispatch("admin/applications/removeApplicant", payload);
    },
    updateRow(object) {
      this.$store.dispatch(
        "loading/startLoading",
        { payload: null },
        { root: true }
      );
      const payload = {
        ...object,
        attended: !object.attended
      };
      this.$store.dispatch("admin/applications/updateApplicant", payload);
    },
    exportData() {
      const { applicants, s2ab, getMoment } = this;
      const form_id = applicants[0].formID;
      const workbook = XLSX.utils.book_new();
      workbook.Props = {
        Title: form_id,
        Subject: "Export of applicants",
        Author: "Project Destination App",
        CreatedDate: Date.now()
      };
      workbook.SheetNames.push("Sheet 1");
      const wb = applicants.map(d => {
        return [
          getMoment(d.applied_at),
          d.email,
          `${d.first_name} ${d.last_name}`,
          d.phone,
          d.gender,
          d.diet,
          d.programme,
          d.year,
          d.free_text,
          d.attended
        ];
      });
      const workbookData = [XLSX_HEADLINES, ...wb];
      workbook.Sheets["Sheet 1"] = XLSX.utils.aoa_to_sheet(workbookData);
      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      const data = s2ab(wbout);
      saveAs(
        new Blob([data], { type: "application/octet-stream" }),
        "export.xlsx"
      );
    },
    s2ab(s) {
      const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      const view = new Uint8Array(buf); //create uint8array as viewer
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
      return buf;
    }
  }
};
</script>

<style scoped lang="css">

.modal-card {
  max-width: none !important;
  width: 75vw !important;
  margin: 0 !important;
  height: 75vh !important;
  border-radius: 0 !important;
}
</style>