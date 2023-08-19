import axios from "axios";

export async function getDemoMessage(token) {
  const url =
    `https://auth-demo-app-dcdda-default-rtdb.firebaseio.com/message.json?auth=${token}`;
  const response = await axios.get(url);

  return response.data;
}
