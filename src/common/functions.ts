import * as bcrypt from 'bcrypt';

export const validatePassword = async (inputPassword: string , password: string): Promise<boolean> => {
  return await bcrypt.compare(password , inputPassword);
}