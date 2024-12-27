import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaMapMarkerAlt,
  FaUser,
  FaHandsHelping,
  FaCog,
  FaChevronDown,
  FaArrowLeft,
  FaWallet,
  FaCar,
  FaShieldAlt,
  FaGift,
  FaBell,
} from "react-icons/fa";
import GoogleMapReact from "google-map-react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import {
  Container,
  Header,
  Logo,
  MenuIcon,
  SideMenu,
  MenuItem,
  SidebarContent,
  SearchSection,
  SearchBar,
  MapContainer,
  ExploreSection,
  SectionTitle,
  ExploreGrid,
  ExploreItem,
  SubMenuSlide,
  BackButton,
  DirectionsButton,
} from "../assets/Wrappers/HomeLayout";
import Profile from "../Components/Profile";
import Help from "../Components/Help";
import Payments from "../Components/Payments";
import Safety from "../Components/Safety";
import Settings from "../Components/Settings";
import MyRewards from "../Components/MyRewards";

const libraries = ["places"];

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [slideOpen, setSlideOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [autocompleteOrigin, setAutocompleteOrigin] = useState(null);
  const [autocompleteDestination, setAutocompleteDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  const sideMenuRef = useRef(null);
  const sidebarRef = useRef(null);

  const onLoadOrigin = (autoC) => setAutocompleteOrigin(autoC);
  const onLoadDestination = (autoC) => setAutocompleteDestination(autoC);

  const onPlaceChangedOrigin = () => {
    if (autocompleteOrigin) {
      const place = autocompleteOrigin.getPlace();
      if (place.geometry) {
        setOrigin(place.geometry.location);
      }
    }
  };

  const onPlaceChangedDestination = () => {
    if (autocompleteDestination) {
      const place = autocompleteDestination.getPlace();
      if (place.geometry) {
        setDestination(place.geometry.location);
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => console.error("Unable to retrieve location.")
      );
    }
  }, []);

  const getDirections = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
            setDirections(result);
          } else {
            console.error("Error fetching directions: ", status);
          }
        }
      );
    } else {
      alert("Please provide both origin and destination.");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openSidebar = (sidebar) => {
    setActiveSidebar(sidebar);
    setMenuOpen(false);
  };

  const closeSidebar = () => {
    setActiveSidebar(null);
  };

  const toggleSubMenu = (menu) => {
    if (openSubMenu === menu) {
      setSlideOpen(false);
    } else {
      setOpenSubMenu(menu);
      setSlideOpen(true);
    }
  };

  const closeSubMenu = () => {
    setOpenSubMenu(null);
    setSlideOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    if (activeSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeSidebar]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDM9u38Og94OUqafCkOStORarCVyGxsl-w" libraries={libraries}>
      <Container>
        <Header>
          <Logo>
            <FaMapMarkerAlt />
            RDGo
          </Logo>
          <MenuIcon onClick={toggleMenu}>
            <FaBars />
          </MenuIcon>
        </Header>

        {/* Side Menu */}
        <SideMenu ref={sideMenuRef} menuOpen={menuOpen}>
          <MenuItem onClick={() => openSidebar("profile")}>
            <FaUser /> Profile
          </MenuItem>
          <MenuItem onClick={() => openSidebar("help")}>
            <FaHandsHelping /> Help
          </MenuItem>
          <MenuItem onClick={() => openSidebar("payment")}>
            <FaWallet /> Payment
          </MenuItem>
          <MenuItem onClick={() => openSidebar("myRides")}>
            <FaCar /> My Rides
          </MenuItem>
          <MenuItem onClick={() => openSidebar("safety")}>
            <FaShieldAlt /> Safety
          </MenuItem>
          <MenuItem onClick={() => openSidebar("referEarn")}>
            <FaGift /> Refer and Earn
          </MenuItem>
          <MenuItem onClick={() => openSidebar("myRewards")}>
            <FaGift /> My Rewards
          </MenuItem>
          <MenuItem onClick={() => openSidebar("notifications")}>
            <FaBell /> Notifications
          </MenuItem>
          <MenuItem onClick={() => openSidebar("settings")}>
            <FaCog /> Settings
          </MenuItem>
          <MenuItem onClick={() => toggleSubMenu("profileSettings")}>
            <FaCog /> Profile Settings
            <FaChevronDown style={{ marginLeft: "auto" }} />
          </MenuItem>
        </SideMenu>

        {/* SubMenu Slide */}
        {slideOpen && (
          <SubMenuSlide slideOpen={slideOpen}>
            <BackButton onClick={closeSubMenu}>
              <FaArrowLeft /> Back
            </BackButton>
            {openSubMenu === "profileSettings" && (
              <div>
                <h3>Profile Settings</h3>
                <MenuItem>Change Password</MenuItem>
                <MenuItem>Update Profile Picture</MenuItem>
                <MenuItem>Manage Privacy</MenuItem>
              </div>
            )}
          </SubMenuSlide>
        )}

        {/* Content Sidebar (Dynamic) */}
        {activeSidebar && (
          <SidebarContent ref={sidebarRef}>
            <BackButton onClick={closeSidebar}>
              <FaArrowLeft /> Back
            </BackButton>
            <div>
              {activeSidebar === "profile" && <Profile />}
              {activeSidebar === "help" && <Help />}
              {activeSidebar === "payment" && <Payments />}
              {activeSidebar === "myRides" && <p>My Rides content here</p>}
              {activeSidebar === "safety" && <Safety />}
              {activeSidebar === "referEarn" && <p>Refer and Earn content here</p>}
              {activeSidebar === "myRewards" && <MyRewards />}
              {activeSidebar === "notifications" && <p>Notifications content here</p>}
              {activeSidebar === "settings" && <Settings />}
            </div>
          </SidebarContent>
        )}

        {/* Search Section */}
        <SearchSection>
          <Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlaceChangedOrigin}>
            <SearchBar placeholder="Enter Origin" />
          </Autocomplete>
          <Autocomplete onLoad={onLoadDestination} onPlaceChanged={onPlaceChangedDestination}>
            <SearchBar placeholder="Enter Destination" />
          </Autocomplete>
          <DirectionsButton onClick={getDirections}>Get Directions</DirectionsButton>
        </SearchSection>

        {/* Map Section */}
        <MapContainer>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDM9u38Og94OUqafCkOStORarCVyGxsl-w" }}
            center={currentLocation}
            zoom={14}
            onGoogleApiLoaded={({ map }) => setMap(map)}
          >
            {directions && (
              <div
                lat={directions.routes[0].overview_path[0].lat()}
                lng={directions.routes[0].overview_path[0].lng()}
                style={{ width: "5px", height: "5px", backgroundColor: "red", borderRadius: "50%" }}
              ></div>
            )}
          </GoogleMapReact>
        </MapContainer>

        {/* Explore Section */}
        <ExploreSection>
          <SectionTitle>Explore</SectionTitle>
          <ExploreGrid>
            <ExploreItem>
              <img src="src/assets/images/bike.png" alt="Bike" />
              Bike
            </ExploreItem>
            <ExploreItem>
              <img src="src/assets/images/auto.png" alt="Auto" />
              Auto
            </ExploreItem>
            <ExploreItem>
              <img src="src/assets/images/car.png" alt="Cab" />
              Cab
            </ExploreItem>
            <ExploreItem>
              <img src="src/assets/images/emergency.png" alt="Emergency" />
              Emergency
            </ExploreItem>
          </ExploreGrid>
        </ExploreSection>
      </Container>
    </LoadScript>
  );
};

export default HomePage;
