import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PxToRem from "../../../utils/PxToRem";

const modalRoot = document.getElementById("modal-root");

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

const ContentContainer = styled.div`
  background: #fff;
  padding: ${PxToRem(16)} ${PxToRem(16)} ${PxToRem(24)} ${PxToRem(16)};
  text-align: center;
  border: 1px solid #979797;
  margin: 0 auto;
  border-radius: ${PxToRem(8)};
`;

const Modal = ({
  isOpen,
  children,
  containerWidth = PxToRem(602),
  containerHeight = PxToRem(259),
}) => {
  return (
    isOpen &&
    createPortal(
      <Container>
        <ContentContainer
          style={{ width: containerWidth, height: containerHeight }}
        >
          {children}
        </ContentContainer>
      </Container>,
      modalRoot
    )
  );
};

export default Modal;
