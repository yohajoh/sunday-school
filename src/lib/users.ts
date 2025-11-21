export const getUsers = async () => {
  try {
    const res = await fetch("http:3000/api/sunday-school/users", {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};
