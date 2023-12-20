import passwordValidator from 'password-validator';
import bcrypt from 'bcryptjs';

const passwordChecker = new passwordValidator();

export function isValidEmail(email: string): boolean {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
}

export function isValidatePassword(password: string): boolean {
  return password.length >= 8 && password !== '';
}

export function comparePassword(
  password: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

export function isValidPassword(password: string): boolean {
  passwordChecker
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']);

  return !!passwordChecker.validate(password);
}
