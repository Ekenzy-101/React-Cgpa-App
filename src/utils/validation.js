import validator from "validator";

export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    return "Email is not valid";
  }
};
export const validateName = (name) => {
  if (validator.isEmpty(name)) {
    return "Field is required";
  }
  if (!validator.isLength(name, { max: 25 })) {
    return "Field should be between 5 and 25 characters";
  }
};
export const validatePassword = (password) => {
  if (!validator.isLength(password, { min: 5, max: 1000 })) {
    return "Password must contain at least 5 characters";
  }
};

export const validateTitle = (title) => {
  if (validator.isEmpty(title)) {
    return "Field is required";
  }
  if (!validator.isLength(title, { min: 5 })) {
    return "Field should be up to 5 characters";
  }
};

export const validateCode = (code) => {
  if (validator.isEmpty(code)) {
    return "Field is required";
  }
  if (!validator.isLength(code, { min: 6, max: 6 })) {
    return "Field should be 6 characters";
  }
};

export const validateUnit = (unit) => {
  if (validator.isEmpty(unit)) {
    return "Field is required";
  }
  if (!validator.isInt(unit, { min: 1, max: 6 })) {
    return "Field should be between 1 and 6";
  }
};

export const validateScore = (score) => {
  if (validator.isEmpty(score)) {
    return "Field is required";
  }
  if (!validator.isInt(score, { min: 0, max: 100 })) {
    return "Field should be between 0 and 100";
  }
};

// export const validateSemester = (semester) => {
//   if (validator.isEmpty(semester)) {
//     return "Field is required";
//   }
//   if (!validator.isIn(semester, ["First", "Second"])) {
//     return "Field should be in the given values";
//   }
// };

// export const validateLevel = (level) => {
//   if (validator.isEmpty(level)) {
//     return "Field is required";
//   }
//   if (
//     !validator.isIn(level, ["100", "200", "300", "400", "500", "600", "700"])
//   ) {
//     return "Field should be in the given values";
//   }
// };
