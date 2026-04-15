import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}