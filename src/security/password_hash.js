import bcrypt from 'bcrypt';


export function hash (password) {
  return bcrypt.hashSync(password, 10);
}

export function check (password, token) {
  return bcrypt.compareSync(password, token);
}
