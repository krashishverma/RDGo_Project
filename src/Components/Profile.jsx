import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies
import { 
  FaArrowLeft, 
  FaUserCircle, 
  FaPhone, 
  FaEnvelope, 
  FaVenusMars, 
  FaCalendarAlt, 
  FaMedal, 
  FaExclamationCircle 
} from "react-icons/fa";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 1rem;
`;

const ProfileField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0.75rem 0;
  flex-wrap: wrap;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  flex: 1;
`;

const Value = styled.div`
  font-size: 16px;
  color: ${(props) => (props.required ? "orange" : "#333")};
  flex: 1;
  text-align: right;
  cursor: pointer;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SaveButton = styled.button`
  display: block;
  margin: 1.5rem auto 0;
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ProfilePage = ({ closeSidebar }) => {
  const [profile, setProfile] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [tempProfile, setTempProfile] = useState({});
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const phoneNumber = Cookies.get("phone"); // Retrieve phone number from cookies
      if (!phoneNumber) {
        throw new Error("Phone number not found in cookies.");
      }

      const response = await fetch("/api/profile", {
        headers: {
          "x-user-phone": phoneNumber, // Use phone number from cookies
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setProfile(data);
      setTempProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle field edit
  const handleEdit = (field) => {
    setEditingField(field);
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
    setIsModified(true);
  };

  // Save profile data
  const saveProfile = async () => {
    const phoneNumber = Cookies.get("phone"); // Retrieve phone number from cookies
  
    if (!phoneNumber) {
      alert("Phone number is missing. Ensure you're logged in.");
      return;
    }
  
    // Ensure phone number is part of the profile object
    const updatedProfile = { ...tempProfile, phone: phoneNumber };
  
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });
  
      if (response.ok) {
        const savedProfile = await response.json();
        setProfile(savedProfile.profile);
        setIsModified(false);
        setEditingField(null);
        alert("Profile saved successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to save profile: ${error.message}`);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving the profile. Please try again.");
    }
  };
  

  return (
    <Container>
      
      <h2>Profile</h2>
      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <>
          {/* Name */}
          <ProfileField>
            <Label>
              <FaUserCircle /> Name
            </Label>
            {editingField === "name" ? (
              <InputField
                type="text"
                value={tempProfile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            ) : (
              <Value
                required={!profile.name}
                onClick={() => handleEdit("name")}
              >
                {profile.name || "Required"}
              </Value>
            )}
          </ProfileField>

          {/* Phone Number */}
          <ProfileField>
            <Label>
              <FaPhone /> Phone Number
            </Label>
            <Value>{profile.phoneNumber || "Not provided"}</Value>
          </ProfileField>

          {/* Email */}
          <ProfileField>
            <Label>
              <FaEnvelope /> Email
            </Label>
            {editingField === "email" ? (
              <InputField
                type="email"
                value={tempProfile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            ) : (
              <Value
                required={!profile.email}
                onClick={() => handleEdit("email")}
              >
                {profile.email || "Required"}
              </Value>
            )}
          </ProfileField>

          {/* Gender */}
          <ProfileField>
            <Label>
              <FaVenusMars /> Gender
            </Label>
            {editingField === "gender" ? (
              <InputField
                type="text"
                value={tempProfile.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              />
            ) : (
              <Value
                required={!profile.gender}
                onClick={() => handleEdit("gender")}
              >
                {profile.gender || "Required"}
              </Value>
            )}
          </ProfileField>

          {/* Date of Birth */}
          <ProfileField>
            <Label>
              <FaCalendarAlt /> Date of Birth
            </Label>
            {editingField === "dateOfBirth" ? (
              <InputField
                type="date"
                value={tempProfile.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            ) : (
              <Value
                required={!profile.dateOfBirth}
                onClick={() => handleEdit("dateOfBirth")}
              >
                {profile.dateOfBirth || "Required"}
              </Value>
            )}
          </ProfileField>

          {/* Member Since */}
          <ProfileField>
            <Label>
              <FaMedal /> Member Since
            </Label>
            <Value>{profile.memberSince || "Not available"}</Value>
          </ProfileField>

          {/* Emergency Contact */}
          <ProfileField>
            <Label>
              <FaExclamationCircle /> Emergency Contact
            </Label>
            {editingField === "emergencyContact" ? (
              <InputField
                type="text"
                value={tempProfile.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
              />
            ) : (
              <Value
                required={!profile.emergencyContact}
                onClick={() => handleEdit("emergencyContact")}
              >
                {profile.emergencyContact || "Required"}
              </Value>
            )}
          </ProfileField>

          {/* Save Button */}
          <SaveButton
            onClick={saveProfile}
            disabled={!isModified}
          >
            Save Changes
          </SaveButton>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
