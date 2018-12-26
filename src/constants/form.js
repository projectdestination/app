export const YEARS = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
export const PROGRAMMES = [
  { text: "Vehicle Engineering", key: "vehicle_engineering" },
  { text: "Physics", key: "physics" }
];
export const DIETS = [
  { text: "Vegan", key: "vegan" },
  { text: "Vegetarian", key: "vegetarian" },
  { text: "Pescetarian", key: "pescetarian" },
  { text: "Pescetarian", key: "pescetarian" },
  { text: "None", key: "none" },
  { text: "Other, specify in free text", key: "other" }
];
export const GENDERS = [
  { text: "Female", key: "female" },
  { text: "Male", key: "male" },
  { text: "Prefer not to say", key: "prefer_not_to_say" },
  { text: "Other", key: "other" }
];
export const TERMS = {
  template: `<div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title pd-font">Terms and Conditions</p>
    </header>
    <section class="modal-card-body">
    <div class="pd-font">
      By applying to the terms and conditions you commit to:
      <div class="section">
      <ul style="list-style-type:disc">
        <li>
          Attending this event. Not attending this event without letting us know will eventually lead to suspension from future Project Destination events.
        </li>
        <li>
          Letting Project Destination save your form-data for future usage.
        </li>
      </ul>
      </div>
      Note that Project Destination is a student organisation, for student by students, that values your privacy, we will not hand out contact information to companies without your consent.
    </div>
    </section>
    <footer class="modal-card-foot">
    </footer>
  </div>`
};
