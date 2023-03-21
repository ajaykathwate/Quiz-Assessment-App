import toast from "react-hot-toast";

/**Profile validate */
export async function profileValidation(values) {
  // const errors = usernameVerify({}, values);
  const errors = nameVerify({}, values);
  
  // emailVerify(errors, values);
  phoneNumberVerify(errors, values);
  genderVerify(errors, values);
  organizationVerify(errors, values);
  departmentVerify(errors, values);
  yearVerify(errors, values);
  prnVerify(errors, values);
  locationVerify(errors, values);
  dobVerify(errors, values);
  summaryVerify(errors, values);
  return errors;
}

// validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username === " ") {
    error.username = toast.error("Invalid Username...!");
  }

  return error;
}

// verify email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Invalid Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}

// verify name
function nameVerify(error = {}, values) {
  if (!values.name) {
    error.name = toast.error("Name Required..!");
  }

  return error;
}

// verify phone number
function phoneNumberVerify(error = {}, values) {
  if (!values.phone_no) {
    error.phone_no = toast.error("Phone Number Required!");
  } else if (values.phone_no.includes(" ")) {
    error.phone_no = toast.error("Phone Number can't contain space");
  }

  return error;
}

// verify organization
function organizationVerify(error = {}, values) {
  if (!values.organization) {
    error.organization = toast.error("Organization is required..!");
  }

  return error;
}

// verify prn
function prnVerify(error = {}, values) {
  if (!values.prn) {
    error.prn = toast.error("PRN Number is Required!");
  } else if (values.prn.includes(" ")) {
    error.prn = toast.error("Invalid PRN Number!");
  }

  return error;
}

// verify location
function locationVerify(error = {}, values) {
  if (!values.location) {
    error.location = toast.error("Location Required!");
  }

  return error;
}

// verify dob
function dobVerify(error = {}, values) {
  if (!values.dob) {
    error.dob = toast.error("Date Of Birth is Required!");
  }

  return error;
}

// verify summary
function summaryVerify(error = {}, values) {
  if (!values.summary) {
    error.summary = toast.error("Summary Required!");
  } else if (values.summary.length < 51) {
    error.summary = toast.error("Summary must be atleast 50 characters!");
  }

  return error;
}
// verify gender
function genderVerify(error = {}, values) {
  if (!values.gender) {
    error.gender = toast.error("Gender Required!");
  }

  return error;
}
// verify department
function departmentVerify(error = {}, values) {
  if (!values.department) {
    error.department = toast.error("Department Required!");
  }

  return error;
}
// verify year
function yearVerify(error = {}, values) {
  if (!values.year) {
    error.year = toast.error("Year Required!");
  }

  return error;
}
