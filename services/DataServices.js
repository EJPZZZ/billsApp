import axios from "../utils/axios";

export async function getTotalBalance() {
  const token = "8|VA6gfSvsetDQmCSYGNjBOlQD1oWcrXinylxYhrIA97fdda0e";

  const { data: total_balance } = await axios.get("/total_balance", {
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return total_balance;
}