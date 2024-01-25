import _ from "lodash";
import countryJson from "../../jsons/countries.json";
import groupTypeJson from "../../jsons/groupType.json";
import stateJson from "../../jsons/states.json";
import indianStateJson from "../../jsons/indianState.json";
import slipType from "../../jsons/slipType.json";
import pType from "../../jsons/patientType.json";
import vType from "../../jsons/visitType.json"
import PaymentType from "../../jsons/paymentType.json";
import patientCategory from "../../jsons/patientCategory.json";
import referralCode from "../../jsons/referralCode.json";
export const Countries = [...countryJson];
export const States = [...stateJson];
export const IndianStates = [...indianStateJson];
export const patientType = [...pType];
export const visitType = [...vType];
export const SlipType = [...slipType];
export const groupType = [...groupTypeJson];
export const PaymentTypes = [...PaymentType];
export const PatientCategory = [...patientCategory];
export const ReferralCode = [...referralCode];
export const gstTypeList = [
  { name: "Unregistered Consumer", value: "Unregistered" },
  { name: "Registered Consumer", value: "Registered" },
];
export const gender = [
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
];

export const branchType = [
  {
    name: "Head Branch",
    key: "headBranch",
  },
  {
    name: "Branch",
    key: "branch",
  },
];

export const category = [
  {
    name: "Starters",
    key: "starters",
  },
  {
    name: "Indian",
    key: "indian",
  },
  {
    name: "Continental",
    key: "continental",
  },
  {
    name: "Asian",
    key: "asian",
  },
];
export const categoryType = [
  {
    name: "Half",
    key: "half",
  },
  {
    name: "Full",
    key: "full",
  },
 
];
export const getStateByCountry = (countryName) => {
  let findCountry = _.find(countryJson, (item) => {
    return item.name === countryName;
  });
  if (findCountry) {
    let stateList = _.filter(stateJson, (item) => {
      return item.country_id === findCountry.id;
    });
    return stateList;
  } else {
    return [];
  }
};
export const monthYearPicker = (data) => {
  // data = data.toString()
  data = data.replace("/", "").replace(/[^\d]/, "");
  let month = data.substring(0, 2);
  let year = data.substring(2, 6);
  let date = "";
  if (month) {
    date = date + month;
  }
  if (year) {
    year = "/" + year;
  }
  return `${date}${year}`;
};
