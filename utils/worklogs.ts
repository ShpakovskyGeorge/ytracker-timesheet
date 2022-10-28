import { IssuesData } from "../types/data";

type Entries<TO extends Record<string, unknown>> = [string, TO[keyof TO]][];

export type GroupedProjects = Record<string, Entries<IssuesData>>;

export const getGroupedIssuesData = (issuesData: IssuesData) => {
  return Object.entries(issuesData).reduce<GroupedProjects>((acc, item) => {
    const project = item[0].split("-")[0];
    if (!acc[project]) acc[project] = [];
    acc[project].push(item);
    return acc;
  }, {});
};
