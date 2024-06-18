const currentYear = new Date().getFullYear();

function getAge(birthdate: string): number {
  const now = new Date(birthdate);

  const birthdateObj = new Date(now);
  const age = currentYear - birthdateObj.getFullYear();

  return age;
}

export function isOlderThan13(birthdate: string): boolean {
  const age = getAge(birthdate);
  if (age) {
    return age > 13;
  }
  return false;
}
