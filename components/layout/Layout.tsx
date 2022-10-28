import React from "react";
import { Container } from "./styled";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};
