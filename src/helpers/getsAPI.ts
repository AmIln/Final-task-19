const RSShop = require("../../API/RSShop_admin.json");
const project = Array(RSShop.values)[0];

export function getHost(): string | false {
  for (const element of project) {
    if (element.key === "host") {
      return element.value;
    }
  }
  return false;
}

export function getAuthUrl(): string | false {
  for (const element of project) {
    if (element.key === "auth_url") {
      return element.value;
    }
  }
  return false;
}

export function getProjectHost(): string {
  let host = "";
  let key = "";

  for (const element of project) {
    if (element.key === "host") {
      host = element.value;
    }
    if (element.key === "project-key") {
      key = element.value;
    }
  }

  return `${host}/${key}`;
}

export function getClientId(): string | false {
  for (const element of project) {
    if (element.key === "client_id") {
      return element.value;
    }
  }

  return false;
}

export function getClientSecret(): string | false {
  for (const element of project) {
    if (element.key === "client_secret") {
      return element.value;
    }
  }

  return false;
}

export function getProjectKey(): string | false {
  for (const element of project) {
    if (element.key === "project-key") {
      return element.value;
    }
  }

  return false;
}
