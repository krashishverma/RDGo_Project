import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaMapMarkerAlt, FaUser, FaHandsHelping, FaCog, FaChevronDown, FaArrowLeft, FaWallet, FaCar, FaShieldAlt, FaGift, FaBell } from "react-icons/fa";
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import {
  Container, Header, Logo, MenuIcon, SideMenu, MenuItem, SidebarContent, SearchSection, SearchBar, MapContainer, ExploreSection, SectionTitle, ExploreGrid, ExploreItem, SubMenuSlide, BackButton
} from "../assets/Wrappers/HomeLayout";
import Profile from '../Components/Profile';
import Help from '../Components/Help';
import Payments from "../Components/Payments";
import Safety from "../Components/Safety";
import Settings from "../Components/Settings";
import MyRewards from "../Components/MyRewards";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [slideOpen, setSlideOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [autocompleteOrigin, setAutocompleteOrigin] = useState(null);
  const [autocompleteDestination, setAutocompleteDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Default location (Bangalore)
  const [prices, setPrices] = useState({ bike: 0, auto: 0, car: 0 });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const sideMenuRef = useRef(null);
  const sidebarRef = useRef(null);

  // Function to toggle the main menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to open a sidebar
  const openSidebar = (sidebar) => {
    setActiveSidebar(sidebar);
    setMenuOpen(false); // Close the side menu when opening a sidebar
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setActiveSidebar(null);
  };

  // Function to toggle a submenu
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

  // Detect clicks outside the side menu
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

  // Detect clicks outside the sidebar
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

  // Get user's current location and set it as origin
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(currentLocation);
          setOrigin(currentLocation); // Set origin to current location
        },
        (error) => {
          console.error("Error getting current location: ", error);
        }
      );
    }
  }, []);

  const handleSearch = (place) => {
    // Assuming place contains the coordinates { lat, lng }
    setMarkers([...markers, place]);
  };

  const onLoadOrigin = (autocomplete) => {
    setAutocompleteOrigin(autocomplete);
  };

  const onLoadDestination = (autocomplete) => {
    setAutocompleteDestination(autocomplete);
  };

  const onPlaceChangedOrigin = () => {
    if (autocompleteOrigin !== null) {
      const place = autocompleteOrigin.getPlace();
      const location = place.geometry.location;
      setOrigin({ lat: location.lat(), lng: location.lng() });
      if (destination) {
        getDirections({ lat: location.lat(), lng: location.lng() }, destination);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onPlaceChangedDestination = () => {
    if (autocompleteDestination !== null) {
      const place = autocompleteDestination.getPlace();
      const location = place.geometry.location;
      setDestination({ lat: location.lat(), lng: location.lng() });
      if (origin) {
        getDirections(origin, { lat: location.lat(), lng: location.lng() });
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const getDirections = (origin, destination) => {
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
            calculatePrices(origin, destination);
          } else {
            console.error("Error fetching directions: ", status);
          }
        }
      );
    } else {
      alert("Please provide both origin and destination.");
    }
  };

  const calculatePrices = (origin, destination) => {
    const distanceService = new window.google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          const distanceInMeters = response.rows[0].elements[0].distance.value;
          const distanceInKm = distanceInMeters / 1000;

          // Example pricing formulas
          const bikePrice = distanceInKm * 5; // 5 currency units per km
          const autoPrice = distanceInKm * 10; // 10 currency units per km
          const carPrice = distanceInKm * 15; // 15 currency units per km

          setPrices({
            bike: bikePrice.toFixed(2),
            auto: autoPrice.toFixed(2),
            car: carPrice.toFixed(2),
          });
        } else {
          console.error("Error calculating distance: ", status);
        }
      }
    );
  };

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
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
        <LoadScript googleMapsApiKey="AIzaSyDM9u38Og94OUqafCkOStORarCVyGxsl-w" libraries={['places']}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlaceChangedOrigin}>
              <SearchBar placeholder="Your Current Location" />
            </Autocomplete>
            <Autocomplete onLoad={onLoadDestination} onPlaceChanged={onPlaceChangedDestination}>
              <SearchBar placeholder="Destination Location" />
            </Autocomplete>
          </div>
        </LoadScript>
      </SearchSection>

      {/* Map Section */}
      <MapContainer>
        <LoadScript googleMapsApiKey="AIzaSyDM9u38Og94OUqafCkOStORarCVyGxsl-w" libraries={['places']}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={currentLocation}
            zoom={14}
            onLoad={map => setMap(map)}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </MapContainer>

      {/* Explore Section */}
      <ExploreSection>
        <SectionTitle>Explore</SectionTitle>
        <ExploreGrid>
          <ExploreItem onClick={() => handleVehicleClick('bike')}>
            <img src="src/assets/images/bike.png" alt="Bike" />
            
            {selectedVehicle === 'bike' && <p>Price:Rs. {prices.bike} </p>}
          </ExploreItem>
          <ExploreItem onClick={() => handleVehicleClick('auto')}>
            <img src="src/assets/images/auto.png" alt="Auto" />
            
            {selectedVehicle === 'auto' && <p>Price: Rs. {prices.auto}  </p>}
          </ExploreItem>
          <ExploreItem onClick={() => handleVehicleClick('car')}>
            <img src="src/assets/images/car.png" alt="Cab" />
            Cab
            {selectedVehicle === 'car' && <p>Price: Rs. {prices.car} </p>}
          </ExploreItem>
          <ExploreItem onClick={() => handleVehicleClick('emergency')}>
            <img src="src/assets/images/emergency.png" alt="Emergency" />
            Emergency
            {selectedVehicle === 'emergency' && <p>Price:Rs. {prices.car}  </p>}
          </ExploreItem>
        </ExploreGrid>
      </ExploreSection>
    </Container>
  );
};

export default HomePage;