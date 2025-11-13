export function fourGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}

export function sixGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function convertDate(date) {
  const options = {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date(date).toLocaleString("en-CA", options);
}

export function replaceSpacesAndHyphens(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result += "-";
    } else if (str[i] === "-") {
      result += " ";
    } else {
      result += str[i];
    }
  }
  return result;
}

export function sliceString(string, number) {
  return string.slice(0, number).split(" ").slice(0, -1).join(" ") + " ...";
}

export function areAllStatesValid(states) {
  for (const state of states) {
    const values = Object.values(state);
    for (const value of values) {
      if (value === "") {
        return false;
      }
    }
  }
  return true;
}

export function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function isValidPhoneNumber(phone) {
  const cleaned = phone.replace(/\s+/g, "");
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(cleaned);
}

export function extractParagraphs(text) {
  return text
    .split(/-{3,}|\n\n+/)
    .filter((paragraph) => paragraph.trim() !== "");
}

export function isValidDateFormat(dateString) {
  if (typeof dateString !== "string") return false;
  // ISO/Canadian official date format: yyyy-mm-dd
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return regex.test(dateString);
}

export function convertDateName(date) {
  const newDate = new Date(date);
  return newDate.toLocaleString("en-US", { month: "long", year: "numeric" });
}
