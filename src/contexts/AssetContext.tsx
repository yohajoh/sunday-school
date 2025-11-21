import React, { createContext, useContext, useReducer } from "react";
import { Asset } from "@/types";

interface AssetContextType {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
}

type AssetAction =
  | { type: "ADD_ASSET"; payload: Asset }
  | { type: "UPDATE_ASSET"; payload: { id: string; updates: Partial<Asset> } }
  | { type: "DELETE_ASSET"; payload: string };

const AssetContext = createContext<AssetContextType | undefined>(undefined);

const assetReducer = (state: Asset[], action: AssetAction): Asset[] => {
  switch (action.type) {
    case "ADD_ASSET":
      return [...state, action.payload];

    case "UPDATE_ASSET":
      return state.map((asset) =>
        asset.id === action.payload.id
          ? { ...asset, ...action.payload.updates }
          : asset
      );

    case "DELETE_ASSET":
      return state.filter((asset) => asset.id !== action.payload);

    default:
      return state;
  }
};

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [assets, dispatch] = useReducer(assetReducer, []);

  const addAsset = (asset: Asset) => {
    dispatch({ type: "ADD_ASSET", payload: asset });
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    dispatch({ type: "UPDATE_ASSET", payload: { id, updates } });
  };

  const deleteAsset = (id: string) => {
    dispatch({ type: "DELETE_ASSET", payload: id });
  };

  const value: AssetContextType = {
    assets,
    addAsset,
    updateAsset,
    deleteAsset,
  };

  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};

export const useAsset = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useAsset must be used within AssetProvider");
  }
  return context;
};
