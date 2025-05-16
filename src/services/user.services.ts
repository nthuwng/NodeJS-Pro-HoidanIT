import getConnection from "config/database";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string
) => {
  const connection = await getConnection();

  try {
    const sql =
      "INSERT INTO `users`(`name`, `email`,`address`) VALUES (?, ?, ?)";
    const values = [fullName, email, address];

    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    return [];
  }
};
const handleDeleteUser = async (id: string) => {
  const connection = await getConnection();

  try {
    const sql = "delete from `users`where `id` = ?";
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    console.error("Error delete user:", error);
    return [];
  }
};

const handleUpdateUser = async (
  id: string,
  fullName: string,
  email: string,
  address: string
) => {
  const connection = await getConnection();

  try {
    const sql =
      "UPDATE `users` SET `name` = ?,`email` = ?,`address` = ? WHERE `id` = ?";
    const values = [fullName, email, address, id];

    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    console.error("Error delete user:", error);
    return [];
  }
};

const handleViewUser = async (id: string) => {
  const connection = await getConnection();

  try {
    const sql = "select * from `users`where `id` = ?";
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);
    return result[0];
  } catch (error) {
    console.error("Error delete user:", error);
    return [];
  }
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
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  handleViewUser,
  handleUpdateUser,
};
