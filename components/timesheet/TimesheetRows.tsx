import React from "react";
import { _formatDuration, getSummarizedDuration } from "../../utils/duration";
import { parse } from "tinyduration";
import { CellContent, TaskTitle, TCell, Time, TRow, TRowHeadCell } from "./styled";
import { Link } from "@adobe/react-spectrum";
import format from "date-fns/format";
import { DATE_FORMAT } from "../../constants/constants";
import isWeekend from "date-fns/isWeekend";
import isToday from "date-fns/isToday";
import { DataByDates } from "../../types/data";

type Props = {
  issuesData: [string, DataByDates][];
  datesInPeriod: Date[];
};

const TimesheetRows = ({ issuesData, datesInPeriod }: Props) => {
  return (
    <>
      {issuesData.map((it) => {
        const key = it[0];
        const worklogs = it[1];

        const issue = Object.values(worklogs).flat()[0].issue;

        const total = _formatDuration(
          getSummarizedDuration(
            Object.values(worklogs)
              .flat()
              .map((it) => parse(it.duration)),
          ),
        );

        return (
          <TRow key={key}>
            <TRowHeadCell title={`[${issue.key}] ${issue.display}`}>
              <CellContent>
                <TaskTitle>
                  <Link>
                    <a href={`https://tracker.yandex.ru/${issue.key}`} target="_blank" rel="noreferrer">
                      {`[${issue?.key}] ${issue.display}`}
                    </a>
                  </Link>
                </TaskTitle>
              </CellContent>
            </TRowHeadCell>
            <TCell>
              <CellContent>{total}</CellContent>
            </TCell>
            {datesInPeriod.map((it) => {
              const _date = format(it, DATE_FORMAT);
              return (
                <TCell key={`${key} ${_date}`} isWeekend={isWeekend(it)} isToday={isToday(it)}>
                  <CellContent>
                    {Object.keys(worklogs).includes(_date) ? (
                      <Time
                        title={
                          worklogs[_date]
                            .map((_it) => _it.comment)
                            .filter(Boolean)
                            .join("; ") || undefined
                        }
                      >
                        {_formatDuration(getSummarizedDuration(worklogs[_date].map((_it) => parse(_it.duration))))}
                      </Time>
                    ) : (
                      "-"
                    )}
                  </CellContent>
                </TCell>
              );
            })}
          </TRow>
        );
      })}
    </>
  );
};

export default TimesheetRows;
