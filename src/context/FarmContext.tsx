import React, { createContext, useContext, useState, useEffect } from "react";
import { FarmProfileData } from "../types/farmhub";
import { DEFAULT_FARM_PROFILE } from "../data/centralData";

interface FarmContextType {
  farm: FarmProfileData;
  updateFarm: (updates: Partial<FarmProfileData>) => void;
  setFarmProfile: React.Dispatch<React.SetStateAction<FarmProfileData>>;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farm, setFarmProfile] = useState<FarmProfileData>(() => {
    const saved = localStorage.getItem("farmhub_profile");
    return saved ? JSON.parse(saved) : DEFAULT_FARM_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem("farmhub_profile", JSON.stringify(farm));
  }, [farm]);

  const updateFarm = (updates: Partial<FarmProfileData>) => {
    setFarmProfile((prev: FarmProfileData) => ({ ...prev, ...updates }));
  };

  return (
    <FarmContext.Provider value={{ farm, updateFarm, setFarmProfile }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) throw new Error("useFarm must be used within FarmProvider");
  return context;
};
