import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword) {
  const saltRounds = 10; // Number of salt rounds for hashing

  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

export async function comparePasswords(plainPassword, hashedPassword) {
    try {
        console.log(hashedPassword)
      const passwordsMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return passwordsMatch;
    } catch (error) {
      throw error;
    }
  }