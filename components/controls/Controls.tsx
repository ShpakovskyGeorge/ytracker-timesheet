import {
  ComboBox,
  Content,
  ContextualHelp,
  DateRangePicker,
  Flex,
  Heading,
  Item,
  Section,
  ActionMenu,
  MenuTrigger,
  Menu,
  ActionButton,
  Picker,
} from "@adobe/react-spectrum";
import {
  CalendarDate,
  endOfMonth,
  endOfWeek,
  getLocalTimeZone,
  parseDate,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import { Key, useEffect } from "react";
import { useRouter } from "next/router";
import Settings from "@spectrum-icons/workflow/Settings";
import { Container } from "./styled";
import { OptionType } from "../../types/common";

type Props = {
  employees: OptionType[];
};

export const Controls = ({ employees }: Props) => {
  const router = useRouter();
  const _employee = router.query.employee as string;
  const _periodFrom = router.query.periodFrom as string;
  const _periodTo = router.query.periodTo as string;
  const _groupBy = router.query.groupBy as string;

  const _period = _periodFrom && _periodTo ? { start: parseDate(_periodFrom), end: parseDate(_periodTo) } : undefined;

  useEffect(() => {
    if (!router.isReady) return;

    if (!_groupBy || !["none", "projects"].includes(_groupBy)) {
      router.query.groupBy = "none";
      router.push(router);
    }

    if (!_periodFrom || !_periodTo) {
      const _today = today(getLocalTimeZone());

      router.query.periodFrom = startOfMonth(_today).toString();
      router.query.periodTo = endOfMonth(_today).toString();
      router.push(router);
    }

    const lastEmployee = localStorage.getItem("employee");

    if (_employee && lastEmployee !== _employee) {
      localStorage.setItem("employee", _employee);
    }

    if (!_employee) {
      if (lastEmployee && employees.some((it) => it.id === lastEmployee)) {
        router.query.employee = lastEmployee;
        router.push(router);
      }
    }

    if (_employee && !employees.some((it) => it.id === _employee)) {
      delete router.query.employee;
      router.push(router);
    }
  }, [_employee, employees, _periodFrom, _periodTo, router, _groupBy]);

  const handleEmployeeChange = (value: Key) => {
    if (value) {
      router.query.employee = `${value}`;
      router.push(router);
    }
  };

  const handlePeriodChange = (value: { start: CalendarDate; end: CalendarDate }) => {
    router.query.periodFrom = value.start.toString();
    router.query.periodTo = value.end.toString();
    router.push(router);
  };

  const handleGroupByChange = (value: Key) => {
    if (value) {
      router.query.groupBy = `${value}`;
      router.push(router);
    }
  };

  const handlePeriodPreset = (value: Key) => {
    const _today = today(getLocalTimeZone());
    switch (value) {
      case "lastDays":
        router.query.periodFrom = _today.subtract({ days: 6 }).toString();
        router.query.periodTo = _today.toString();
        router.push(router);
        return;
      case "thisWeek":
        router.query.periodFrom = startOfWeek(_today, "ru-RU").toString();
        router.query.periodTo = endOfWeek(_today, "ru-RU").toString();
        router.push(router);
        return;
      case "thisMonth":
        router.query.periodFrom = startOfMonth(_today).toString();
        router.query.periodTo = endOfMonth(_today).toString();
        router.push(router);
        return;
      case "lastWeek":
        const weekAgo = _today.subtract({ weeks: 1 });
        router.query.periodFrom = startOfWeek(weekAgo, "ru-RU").toString();
        router.query.periodTo = endOfWeek(weekAgo, "ru-RU").toString();
        router.push(router);
        return;
      case "lastMonth":
        const monthAgo = _today.subtract({ months: 1 });
        router.query.periodFrom = startOfMonth(monthAgo).toString();
        router.query.periodTo = endOfMonth(monthAgo).toString();
        router.push(router);
        return;
      default:
        return;
    }
  };

  const handleThemeSelect = (value: Key) => {
    localStorage.setItem("theme", value as string);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <Container>
      <Flex direction="row" gap="static-size-200" marginBottom="16px" alignItems="end">
        <ComboBox
          label="??????????????????"
          selectedKey={_employee}
          onSelectionChange={handleEmployeeChange}
          minWidth="size-3600"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>?????????????????? - ?????? ????!</Heading>
              <Content>???????????????? ?????? ???? ??????????????????????, ?? ??????????????????, ?? ???? ???? ????????????????!</Content>
            </ContextualHelp>
          }
        >
          {employees.map((it) => (
            <Item key={it.id}>{it.name}</Item>
          ))}
        </ComboBox>
        <DateRangePicker
          label="????????????"
          value={_period}
          onChange={handlePeriodChange}
          minWidth="size-3600"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>???????????? - ?????? ???? ?? ????!</Heading>
              <Content>???????????? ????????, ?????????? ???????? ??????????, ?? ????????????, ?????????? ?????????? ???????? ????????????????????????!</Content>
            </ContextualHelp>
          }
        />
        <ActionMenu onAction={handlePeriodPreset}>
          <Section title="??????????????">
            <Item key="lastDays">?????????????????? 7 ????????</Item>
            <Item key="thisWeek">?????? ????????????</Item>
            <Item key="thisMonth">???????? ??????????</Item>
            <Item key="lastWeek">?????????????? ????????????</Item>
            <Item key="lastMonth">?????????????? ??????????</Item>
          </Section>
        </ActionMenu>
      </Flex>
      <Flex direction="row" gap="static-size-200" marginBottom="16px" alignItems="end">
        <Picker
          label="????????????????????????"
          selectedKey={_groupBy}
          onSelectionChange={handleGroupByChange}
          minWidth="size-3600"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>???????????????????????? - ?????? ???????????? ???? ??????????????!</Heading>
              <Content>???????????? ?????? ?????????????????????? ???? ????????????????, ?? ???????? ??????????! :)</Content>
            </ContextualHelp>
          }
        >
          <Item key="none">?????? ??????????????????????</Item>
          <Item key="projects">???? ????????????????</Item>
        </Picker>
        <MenuTrigger>
          <ActionButton>
            <Settings />
          </ActionButton>
          <Menu onAction={handleThemeSelect}>
            <Section title="????????">
              <Item key="">??????????????????</Item>
              <Item key="light">??????????????</Item>
              <Item key="dark">????????????</Item>
            </Section>
          </Menu>
        </MenuTrigger>
      </Flex>
    </Container>
  );
};
