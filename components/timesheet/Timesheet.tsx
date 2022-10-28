import React, { useMemo } from "react";
import {
  CellContent,
  Table,
  TBody,
  TCell,
  THead,
  THeadCell,
  THeadRow,
  TRow,
  TRowHeadCell,
  DateCell,
  TGroupRow,
} from "./styled";
import { Flex, ProgressCircle } from "@adobe/react-spectrum";
import { _formatDuration } from "utils/duration";
import { useRouter } from "next/router";
import { WorklogQuery } from "types/worklog";
import formatISO from "date-fns/formatISO";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import isToday from "date-fns/isToday";
import isWeekend from "date-fns/isWeekend";
import { useQuery } from "@tanstack/react-query";
import { useTimesheet } from "utils/hooks/useTimesheet";
import format from "date-fns/format";
import { DATE_FORMAT } from "constants/constants";
import { ru } from "date-fns/locale";
import { getWorklogs } from "lib/getWorklogs";
import { getGroupedIssuesData } from "utils/worklogs";
import { GroupBy } from "../../types/common";
import TimesheetRows from "./TimesheetRows";

export const Timesheet = () => {
  const router = useRouter();
  const _employee = router.query.employee as string;
  const _periodFrom = router.query.periodFrom as string;
  const _periodTo = router.query.periodTo as string;
  const _groupBy = router.query.groupBy as GroupBy;

  const query = useMemo<WorklogQuery | undefined>(() => {
    if (!_employee || !_periodFrom || !_periodTo) return;
    return {
      createdBy: _employee,
      start: {
        from: formatISO(startOfDay(new Date(_periodFrom))),
        to: formatISO(endOfDay(new Date(_periodTo))),
      },
    };
  }, [_employee, _periodFrom, _periodTo]);

  const { data, isLoading, isFetching, isFetched } = useQuery(
    ["timesheet", JSON.stringify(query)],
    () => getWorklogs(JSON.stringify(query)),
    {
      enabled: !!query,
      refetchOnWindowFocus: false,
    },
  );

  const { issuesData, totalData, totalSpent, datesInPeriod } = useTimesheet({ worklogs: data, query });

  if (!_employee) return null;

  return !isLoading && !isFetching && isFetched ? (
    <Table>
      <THead>
        <THeadRow>
          <THeadCell>
            <CellContent>Задача</CellContent>
          </THeadCell>
          <THeadCell>
            <CellContent>Всего:</CellContent>
          </THeadCell>
          {datesInPeriod.map((it) => {
            const _date = format(it, DATE_FORMAT);
            const _day = format(it, "iiiiii", { locale: ru });
            return (
              <THeadCell key={_date} isWeekend={isWeekend(it)} isToday={isToday(it)}>
                <CellContent>
                  <DateCell>
                    <span>{_day}</span>
                    <span>{_date}</span>
                  </DateCell>
                </CellContent>
              </THeadCell>
            );
          })}
        </THeadRow>
      </THead>
      {issuesData && totalData ? (
        <TBody>
          {_groupBy === "none" && (
            <TimesheetRows issuesData={Object.entries(issuesData)} datesInPeriod={datesInPeriod} />
          )}
          {_groupBy === "projects" &&
            (() => {
              const groupedIssuesData = getGroupedIssuesData(issuesData);
              return Object.entries(groupedIssuesData).map((it) => {
                return (
                  <>
                    <TGroupRow>
                      <TRowHeadCell>
                        <CellContent>{it[0]}</CellContent>
                      </TRowHeadCell>
                      <TCell colSpan={totalData.length + 2} />
                    </TGroupRow>
                    <TimesheetRows issuesData={it[1]} datesInPeriod={datesInPeriod} />
                  </>
                );
              });
            })()}
          <TRow>
            <TRowHeadCell>
              <CellContent>Всего:</CellContent>
            </TRowHeadCell>
            <TCell>
              <CellContent>{_formatDuration(totalSpent)}</CellContent>
            </TCell>
            {totalData.map((it) => {
              const _date = format(it[0], DATE_FORMAT);
              return (
                <TCell key={_date} isWeekend={isWeekend(it[0])} isToday={isToday(it[0])}>
                  {<CellContent>{_formatDuration(it[1])}</CellContent>}
                </TCell>
              );
            })}
          </TRow>
        </TBody>
      ) : null}
    </Table>
  ) : (
    <Flex alignItems={"center"} justifyContent="center">
      <ProgressCircle size="L" isIndeterminate margin="size-600" />
    </Flex>
  );
};
