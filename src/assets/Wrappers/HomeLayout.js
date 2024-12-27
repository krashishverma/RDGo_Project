import styled from "styled-components";
import { FaBars, FaMapMarkerAlt } from "react-icons/fa";

// Main container for the whole page
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

// Header section
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #0078d7;
  color: white;
`;

// Logo section inside the header
export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  svg {
    margin-right: 0.5rem;
  }
`;

// Menu Icon (hamburger menu)
export const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

// Side Menu that slides in/out
export const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #fff;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%); /* Initially off-screen */
  transition: transform 0.3s ease-in-out;
  z-index: 1000; /* Ensure it's above other content */

  ${({ menuOpen }) => menuOpen && `
    transform: translateX(0);
  `}
`;

// Menu item inside the side menu
export const MenuItem = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #0078d7;
    color: white;
  }
`;

// Sidebar content (for displaying dynamic information)
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

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  z-index: 1000;
`;

// Search section with input field
export const SearchSection = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #0078d7;
`;

// Search bar inside the search section
export const SearchBar = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;

  &::placeholder {
    color: #aaa;
  }
`;

// Map container that holds the map
export const MapContainer = styled.div`
  flex: 1;
  position: relative;
  height: 300px;
  transition: height 0.3s ease, margin-left 0.3s ease;

  ${({ menuOpen }) => menuOpen && `
    margin-left: 250px;
    height: 250px;
  `}

  @media (min-width: 768px) {
    height: 400px;
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

// Explore section for additional options
export const ExploreSection = styled.section`
  padding: 1rem;
`;

// Section title for the explore items
export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

// Grid for explore items
export const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
`;

// Individual explore item inside the grid
export const ExploreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;

  img {
    width: 100%;
    max-width: 80px;
    height: auto;
    margin-bottom: 0.5rem;
  }

  &:hover {
    background-color: #0078d7;
    color: white;
  }
`;

// Submenu that slides in/out from the right
export const SubMenuSlide = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: white;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
  transform: ${({ slideOpen }) => (slideOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Back button inside the submenu to go back
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #0078d7;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #005bb5;
  }
`;

// Directions button to get directions
export const DirectionsButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

