if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is missing');
}

export const env = {
  AUTHSECRET: process.env.JWT_SECRET,
  CONNECTION: process.env.DATABASE_URL,
};
