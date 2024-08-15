const users = [
  {
    email: "atapas@email.com",
    password: "password"
  },
  {
    email: "alex@email.com",
    password: "password"
  },
  {
    email: "bob@email.com",
    password: "password"
  },
  {
    email: "prosourav49@gmail.com",
    password: "password"
  }
]

export const getUserByEmail = (email: string) => {
  const found = users.find(user => user.email === email);
  return found;
}