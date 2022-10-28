import { CONTROLS_HEIGHT } from "components/controls/styled";
import styled, { css } from "styled-components";

const TABLE_HEADER_ROW_HEIGHT = "60px";
const TABLE_ROW_HEIGHT = "32px";
const TABLE_HEADER_COLUMN_WIDTH = "500px";
const TABLE_COLUMN_WIDTH = "80px";

const borderStyle = "1px solid var(--spectrum-global-color-gray-300)";

export const Table = styled.table`
  width: 100%;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const Time = styled.span`
  &[title] {
    text-decoration: underline;
  }
`;

export const TaskTitle = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  a {
    text-decoration: none;
  }
`;

export const CellContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 8px 16px;
`;

export const DateCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const firstColumnStyles = css`
  min-width: ${TABLE_HEADER_COLUMN_WIDTH};
  width: ${TABLE_HEADER_COLUMN_WIDTH};
  max-width: ${TABLE_HEADER_COLUMN_WIDTH};
  height: inherit;

  position: sticky;
  left: 0;

  ${CellContent} {
    justify-content: flex-start;
    text-align: start;
  }
`;

const weekendStyles = css`
  :after {
    content: "";
    position: absolute;
    background-color: var(--spectrum-global-color-blue-400);
    mix-blend-mode: overlay;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

const todayStyles = css`
  :after {
    content: "";
    position: absolute;
    background-color: var(--spectrum-global-color-green-400);
    mix-blend-mode: overlay;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

export const THeadRow = styled.tr`
  height: ${TABLE_HEADER_ROW_HEIGHT};
  font-weight: bold;
`;

export const TRow = styled.tr`
  height: ${TABLE_ROW_HEIGHT};

  :nth-child(even) {
    background-color: var(--spectrum-global-color-gray-75);

    th {
      background-color: var(--spectrum-global-color-gray-75);
    }
  }

  :nth-child(odd) {
    background-color: var(--spectrum-global-color-gray-200);

    th {
      background-color: var(--spectrum-global-color-gray-200);
    }
  }

  :last-child {
    background-color: var(--spectrum-global-color-gray-300);
    font-weight: bold;

    th {
      background-color: var(--spectrum-global-color-gray-300);
    }
  }
`;

export const TGroupRow = styled.tr`
  height: ${TABLE_ROW_HEIGHT};
  background-color: var(--spectrum-global-color-gray-300);

  th {
    background-color: var(--spectrum-global-color-gray-300);
  }
`;

export const THeadCell = styled.th<{ isWeekend?: boolean; isToday?: boolean }>`
  min-width: ${TABLE_COLUMN_WIDTH};
  width: ${TABLE_COLUMN_WIDTH};
  max-width: ${TABLE_COLUMN_WIDTH};
  height: inherit;

  background-color: var(--spectrum-global-color-gray-300);

  position: sticky;
  top: ${CONTROLS_HEIGHT};
  z-index: 1;

  :first-child {
    ${firstColumnStyles};
    z-index: 2;
  }

  ${({ isWeekend }) => isWeekend && weekendStyles};
  ${({ isToday }) => isToday && todayStyles};
`;

export const TRowHeadCell = styled.th`
  ${firstColumnStyles};
  z-index: 1;
`;

export const TCell = styled.td<{ isWeekend?: boolean; isToday?: boolean }>`
  ${({ isWeekend }) =>
    isWeekend &&
    css`
      position: relative;
      ${weekendStyles}
    `};

  ${({ isToday }) =>
    isToday &&
    css`
      position: relative;
      ${todayStyles}
    `};
  height: inherit;
  border-right: ${borderStyle};
  border-left: ${borderStyle};
`;
