import { Worklog } from "./worklog";

export type DataByDates = {
  [worklogDate: string]: Worklog[];
};

export type IssuesData = {
  [issueKey: string]: DataByDates;
};

export type TotalData = [Date, Duration][];
