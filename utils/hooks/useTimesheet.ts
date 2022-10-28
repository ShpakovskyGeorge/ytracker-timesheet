import { Timesheet, WorklogQuery } from "types/worklog";
import { useMemo } from "react";
import format from "date-fns/format";
import { parse } from "tinyduration";
import { getSummarizedDuration } from "../duration";
import { DataByDates, IssuesData, TotalData } from "types/data";
import { getDatesInPeriod } from "../date/getDatesInPeriod";
import { DATE_FORMAT } from "constants/constants";

type Props = {
  worklogs?: Timesheet;
  query?: WorklogQuery;
};

export const useTimesheet = ({ worklogs, query }: Props) => {
  const periodFrom = query?.start?.from;
  const periodTo = query?.start?.to;

  const datesInPeriod = useMemo(
    () => (periodFrom && periodTo ? getDatesInPeriod(new Date(periodFrom), new Date(periodTo)) : []),
    [periodFrom, periodTo],
  );

  const issuesData = useMemo(
    () =>
      worklogs?.reduce((_data: IssuesData, worklog) => {
        const issueKey = worklog.issue.key;
        const _date = new Date(worklog.start);
        // const worklogDate = format(new Date(_date.toISOString().slice(0, -1)), DATE_FORMAT);
        const worklogDate = format(_date, DATE_FORMAT);

        if (_data[issueKey]?.[worklogDate]) {
          return {
            ..._data,
            [issueKey]: { ..._data[issueKey], [worklogDate]: [..._data[issueKey][worklogDate], worklog] },
          };
        } else {
          return { ..._data, [issueKey]: { ..._data[issueKey], [worklogDate]: [worklog] } };
        }
      }, {}),
    [worklogs],
  );

  const totalData = useMemo<TotalData>(() => {
    const logs = worklogs?.reduce((_data: DataByDates, worklog) => {
      const _date = new Date(worklog.start);
      // const worklogDate = format(new Date(_date.toISOString().slice(0, -1)), DATE_FORMAT);
      const worklogDate = format(_date, DATE_FORMAT);

      if (_data[worklogDate]) {
        return { ..._data, [worklogDate]: [..._data[worklogDate], worklog] };
      } else {
        return { ..._data, [worklogDate]: [worklog] };
      }
    }, {});

    return datesInPeriod
      .map((it) => {
        const _date = format(it, DATE_FORMAT);
        return [it, logs?.[_date]?.map((_it) => parse(_it.duration)) ?? []];
      })
      .map((it) => {
        const day = it[0];
        const durations = it[1] as Duration[];
        return [day, getSummarizedDuration(durations)];
      }) as unknown as TotalData;
  }, [datesInPeriod, worklogs]);

  const totalSpent = useMemo(() => getSummarizedDuration(totalData.map((it) => it[1])), [totalData]);

  return { issuesData, totalSpent, totalData, datesInPeriod };
};
