export type Timesheet = Worklog[];

export type Worklog = {
  self: string;
  id: string;
  version: string;
  issue: Issue;
  comment: string;
  createdBy: User;
  updatedBy: User;
  createdAt: string;
  updatedAt: string;
  start: string;
  duration: string;
};

export type Issue = {
  self: string;
  id: string;
  key: string;
  display: string;
};

export type User = {
  self: string;
  id: string;
  display: string;
};

export type WorklogQuery = {
  createdBy: string;
  start: {
    from: string;
    to: string;
  };
};

export type PeriodPreset = "lastDays" | "thisWeek" | "thisMonth" | "lastWeek" | "lastMonth";
