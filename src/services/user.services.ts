import getConnection from "../config/database";

const handleCreateUser = (fullName: string, email: string, address: string) => {
  console.log("User created: ", fullName);
};

const getAllUsers = async () => {
  const connection = await getConnection();

  try {
    const [results, fields] = await connection.query("SELECT * FROM `users`");
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
  return "hoidanit";
};

export { handleCreateUser, getAllUsers };
