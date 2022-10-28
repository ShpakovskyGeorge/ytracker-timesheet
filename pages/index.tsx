import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import React from "react";
import { Controls } from "components/controls";
import { Layout } from "components/layout";
import { Timesheet } from "components/timesheet";
import { getUsers } from "lib/getUsers";
import sortBy from "lodash/sortBy";
import { OptionType } from "../types/common";

type Props = {
  employees: OptionType[];
};

const Home: NextPage<Props> = ({ employees }) => {
  return (
    <Layout>
      <Head>
        <title>Timesheet | Aldera-Soft</title>
      </Head>
      <Controls employees={employees} />
      <Timesheet />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const employees = sortBy(
    (await getUsers())
      .filter((it) => !it.dismissed && it.firstLoginDate && it.lastLoginDate)
      .map((it) => ({ name: it.display.split(" ").reverse().join(" "), id: it.login })),
    "name",
  );

  return {
    props: { employees },
  };
};

export default Home;
