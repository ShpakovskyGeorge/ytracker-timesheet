import styled from "styled-components";

export const CONTROLS_HEIGHT = '80px';

export const Container = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 0 24px;
  height: ${CONTROLS_HEIGHT};

  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;

  background-color: var(--spectrum-global-color-gray-100);
`;
