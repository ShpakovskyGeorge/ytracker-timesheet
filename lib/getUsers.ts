import { User } from "types/user";

export const getUsers = async (): Promise<User[]> => {
  const token = process.env.YANDEX_TRACKER_TOKEN;
  const orgid = process.env.YANDEX_TRACKER_ORGID;

  if (!token || !orgid) {
    throw new Error("No token or orgid provided to env");
  }
  try {
    const response = await fetch("https://api.tracker.yandex.net/v2/users?perPage=1000", {
      method: "GET",
      headers: {
        Authorization: token,
        "X-Org-ID": orgid,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (e) {
    throw e;
  }
};
