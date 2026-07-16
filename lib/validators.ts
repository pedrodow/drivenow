export function isValidCPF(rawValue: string): boolean {
  const cpf = rawValue.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digits = cpf.split("").map(Number);

  const checkDigit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += digits[i] * (length + 1 - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return checkDigit(9) === digits[9] && checkDigit(10) === digits[10];
}

export function isValidCardNumber(rawValue: string): boolean {
  const digits = rawValue.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function isFutureExpiry(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;

  const expiry = new Date(year, month, 1);
  return expiry.getTime() > Date.now();
}
