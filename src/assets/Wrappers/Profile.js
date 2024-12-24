import styled from "styled-components";

export const SidebarContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: white;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  padding: 1rem;
  z-index: 1000;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    margin: 0.5rem 0;
  }
`;

export const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  font-size: 1rem;

  svg {
    margin-right: 1rem;
  }
`;
