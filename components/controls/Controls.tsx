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
          label="Сотрудник"
          selectedKey={_employee}
          onSelectionChange={handleEmployeeChange}
          minWidth="size-3600"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Сотрудник - это ты!</Heading>
              <Content>Посмотри где не залогировал, и залогируй, а то не заплатят!</Content>
            </ContextualHelp>
          }
        >
          {employees.map((it) => (
            <Item key={it.id}>{it.name}</Item>
          ))}
        </ComboBox>
        <DateRangePicker
          label="Период"
          value={_period}
          onChange={handlePeriodChange}
          minWidth="size-3600"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Период - это от и до!</Heading>
              <Content>Выбери даты, лучше весь месяц, и смотри, чтобы везде было залогировано!</Content>
            </ContextualHelp>
          }
        />
        <ActionMenu onAction={handlePeriodPreset}>
          <Section title="Периоды">
            <Item key="lastDays">Последние 7 дней</Item>
            <Item key="thisWeek">Эта неделя</Item>
            <Item key="thisMonth">Этот месяц</Item>
            <Item key="lastWeek">Прошлая неделя</Item>
            <Item key="lastMonth">Прошлый месяц</Item>
          </Section>
        </ActionMenu>
      </Flex>
      <Flex direction="row" gap="static-size-200" marginBottom="16px" alignItems="end">
        <Picker
          label="Группировать"
          selectedKey={_groupBy}
          onSelectionChange={handleGroupByChange}
          minWidth="size-3600"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Группировать - это значит по группам!</Heading>
              <Content>Выбери тип группировки по проектам, и будь Дашей! :)</Content>
            </ContextualHelp>
          }
        >
          <Item key="none">Без группировки</Item>
          <Item key="projects">По проектам</Item>
        </Picker>
        <MenuTrigger>
          <ActionButton>
            <Settings />
          </ActionButton>
          <Menu onAction={handleThemeSelect}>
            <Section title="Тема">
              <Item key="">Системная</Item>
              <Item key="light">Светлая</Item>
              <Item key="dark">Темная</Item>
            </Section>
          </Menu>
        </MenuTrigger>
      </Flex>
    </Container>
  );
};
