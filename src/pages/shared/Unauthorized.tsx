// pages/shared/Unauthorized.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Home, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Unauthorized: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-rose-50/50 dark:from-slate-900 dark:via-amber-950/20 dark:to-rose-950/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl">
              <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            {t("unauthorized.title")}
          </CardTitle>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {t("unauthorized.message")}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <Home className="h-4 w-4 mr-2" />
            {t("unauthorized.goHome")}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("unauthorized.goBack")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
