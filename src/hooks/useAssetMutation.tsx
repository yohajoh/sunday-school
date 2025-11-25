import { Asset, User } from "@/types";
import { toast } from "sonner";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";

const API = import.meta.env.VITE_API_URL;
// Create user mutation
export const useCreateAsset = (): UseMutationResult<
  Asset,
  Error,
  Omit<Asset, "id">,
  unknown
> => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async (assetData: Omit<Asset, "id">) => {
      const res = await fetch(`${API}/api/sunday-school/assets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assetData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message);
      }

      return await res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      toast.success(t("assetForm.assetCreated"));
    },
    onError: (error: Error) => {
      toast.error(`Failed to create asset: ${error.message}`);
    },
  });
};

export const useAssetMutation = () => {
  const createAsset = useCreateAsset();

  return { createAsset, isPending: createAsset.isPending };
};
