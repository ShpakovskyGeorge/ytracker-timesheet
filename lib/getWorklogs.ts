export const getWorklogs = async (query: string) => {
  const res = await fetch("/api/worklog", { body: query, method: "POST" });
  return res.json();
};
