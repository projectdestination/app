export const formValidation = ({
  email,
  first_name,
  last_name,
  phone,
  programme,
  year,
  diet,
  gender,
  terms,
  domain,
  extraQuestions
}) => {
  let questionsAreOk = [true];
  if (extraQuestions) {
    questionsAreOk = extraQuestions.map(d => {
      return d.required
        ? this.data[d.key].answer !== null && this.data[d.key].answer.length > 0
        : true;
    });
  }
  const emailIsOk =
    email !== null &&
    email.length > `@${domain}`.length &&
    email.includes(domain) &&
    email.includes("@");
  const nameIsOk = first_name !== null && last_name !== null;
  const phoneIsOk = phone !== null && phone.length > 5;
  const restIsOk =
    programme !== null &&
    year !== null &&
    diet !== null &&
    gender !== null &&
    terms;
  const allIsOk =
    emailIsOk &&
    nameIsOk &&
    phoneIsOk &&
    restIsOk &&
    questionsAreOk.every(d => d === true);
  return allIsOk;
};
