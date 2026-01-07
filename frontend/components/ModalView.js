import React from 'react';
import styled from 'styled-components';

// Styled component para o overlay (fundo do modal)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  
  &.open {
    opacity: 1;
  }
`;

// Styled component para o conteúdo do modal
const ModalContent = styled.div`
  background-color: white;
  padding: 120px 100px;
  border-radius: 8px;
  min-width: 500px; /* Tamanho fixo do modal */
  min-height: 300px;
  max-width: 90%; /* Largura máxima em telas pequenas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-50px);
  transition: transform 0.3s ease-out;
  
  &.open {
    transform: translateY(0);
  }
`;

// Styled component para o botão de fechar
const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  padding: 2px 10px;
  border-radius: 8px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
//* { isOpen, onClose, children }

const ContainerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
`

const ModalView = (props) => {

  if (!props.isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    <ModalOverlay className={props.isOpen ? 'open' : ''}>
      <ModalContent className={props.isOpen ? 'open' : ''}>
        <CloseButton onClick={props.onClose}>×</CloseButton>
        <ContainerContent>{props.children}</ContainerContent>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalView;