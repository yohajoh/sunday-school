import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Package,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function Assets() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const [assets, setAssets] = useState([
    {
      id: "1",
      code: "BK-001",
      name: "Holy Bible - Amharic",
      category: "Books",
      status: "Available",
      assignedTo: "",
      purchaseDate: "2023-01-15",
    },
    {
      id: "2",
      code: "CH-001",
      name: "Wooden Chair Set",
      category: "Furniture",
      status: "Assigned",
      assignedTo: "John Doe",
      purchaseDate: "2022-11-20",
    },
    {
      id: "3",
      code: "PR-001",
      name: "Projector System",
      category: "Electronics",
      status: "Maintenance",
      assignedTo: "",
      purchaseDate: "2023-05-10",
    },
    {
      id: "3",
      code: "PR-001",
      name: "Projector System",
      category: "Electronics",
      status: "Maintenance",
      assignedTo: "",
      purchaseDate: "2023-05-10",
    },
    {
      id: "3",
      code: "PR-001",
      name: "Projector System",
      category: "Electronics",
      status: "Maintenance",
      assignedTo: "",
      purchaseDate: "2023-05-10",
    },
  ]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedAssets = [...assets].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredAssets = sortedAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(filteredAssets.map((a) => a.id));
    }
  };

  const toggleSelectAsset = (id: string) => {
    setSelectedAssets((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedAssets.length === 0) {
      toast.error("No assets selected");
      return;
    }
    setAssets((prev) => prev.filter((a) => !selectedAssets.includes(a.id)));
    setSelectedAssets([]);
    toast.success(`${selectedAssets.length} asset(s) deleted`);
  };

  const AssetFormDialog = ({ asset }: { asset?: (typeof assets)[0] }) => {
    const [formData, setFormData] = useState(
      asset || {
        code: "",
        name: "",
        category: "",
        status: "Available",
        assignedTo: "",
        purchaseDate: "",
      }
    );

    const handleSubmit = () => {
      if (asset) {
        setAssets((prev) =>
          prev.map((a) => (a.id === asset.id ? { ...a, ...formData } : a))
        );
        toast.success("Asset updated successfully");
      } else {
        setAssets((prev) => [
          ...prev,
          { id: Date.now().toString(), ...formData },
        ]);
        toast.success("Asset registered successfully");
      }
    };

    return (
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-2xl rounded-3xl">
        <DialogHeader className="border-b border-slate-200 dark:border-slate-700 pb-4">
          <DialogTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl">
              <Package className="h-5 w-5 text-white" />
            </div>
            {asset ? t("common.edit") : t("assets.addNew")}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("assets.code")}
              </Label>
              <Input
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("assets.name")}
              </Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </Label>
            <Textarea
              rows={3}
              className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("assets.category")}
              </Label>
              <Select
                value={formData.category}
                onValueChange={(v) => setFormData({ ...formData, category: v })}
              >
                <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl shadow-xl">
                  <SelectItem
                    value="Books"
                    className="text-slate-900 dark:text-white rounded-lg"
                  >
                    Books
                  </SelectItem>
                  <SelectItem
                    value="Furniture"
                    className="text-slate-900 dark:text-white rounded-lg"
                  >
                    Furniture
                  </SelectItem>
                  <SelectItem
                    value="Electronics"
                    className="text-slate-900 dark:text-white rounded-lg"
                  >
                    Electronics
                  </SelectItem>
                  <SelectItem
                    value="Electronics"
                    className="text-slate-900 dark:text-white rounded-lg"
                  >
                    newaye kidusat
                  </SelectItem>
                  <SelectItem
                    value="Electronics"
                    className="text-slate-900 dark:text-white rounded-lg"
                  >
                    bibles
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("common.status")}
              </Label>
              <Select
                value={formData.status}
                onValueChange={(v) => setFormData({ ...formData, status: v })}
              >
                <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl shadow-xl">
                  <SelectItem
                    value="Available"
                    className="text-slate-900 dark:text-white rounded-lg"
                  >
                    Available
                  </SelectItem>
                  <SelectItem
                    value="Assigned"
                    className="text-slate-900 dark:text-white rounded-lg"
                  >
                    Assigned
                  </SelectItem>
                  <SelectItem
                    value="Maintenance"
                    className="text-slate-900 dark:text-white rounded-lg"
                  >
                    Maintenance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("assets.purchaseDate")}
              </Label>
              <Input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) =>
                  setFormData({ ...formData, purchaseDate: e.target.value })
                }
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("assets.assignedTo")}
              </Label>
              <Input
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300"
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            {t("common.save")}
          </Button>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="space-y-8 p-6">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-900 to-violet-900 p-8 text-white border border-blue-500/20">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-400/30">
                  <Package className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">
                    {t("assets.manage")}
                  </h1>
                  <p className="text-blue-100 text-lg mt-2">
                    {t("assets.overview")}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold">{assets.length}</p>
                    <p className="text-xs text-blue-200">Total Assets</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Zap className="h-6 w-6 text-violet-400" />
                  <div>
                    <p className="text-2xl font-bold">
                      {assets.filter((a) => a.status === "Available").length}
                    </p>
                    <p className="text-xs text-violet-200">Available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold">
                      {assets.filter((a) => a.status === "Assigned").length}
                    </p>
                    <p className="text-xs text-emerald-200">Assigned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              placeholder={t("common.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300 w-80"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          {selectedAssets.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Trash2 className="h-4 w-4" />
              Delete ({selectedAssets.length})
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <Plus className="h-4 w-4" />
                {t("assets.addNew")}
              </Button>
            </DialogTrigger>
            <AssetFormDialog />
          </Dialog>
        </div>
      </div>

      {/* Premium Assets Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border-0 shadow-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50">
            <TableRow className="border-b border-slate-200 dark:border-slate-700">
              <TableHead className="w-12 bg-transparent">
                <Checkbox
                  checked={
                    selectedAssets.length === filteredAssets.length &&
                    filteredAssets.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
              </TableHead>
              <TableHead
                className="cursor-pointer bg-transparent text-slate-800 dark:text-white font-semibold py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 rounded-l-xl"
                onClick={() => handleSort("code")}
              >
                {t("assets.code")}
              </TableHead>
              <TableHead
                className="cursor-pointer bg-transparent text-slate-800 dark:text-white font-semibold py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300"
                onClick={() => handleSort("name")}
              >
                {t("assets.name")}
              </TableHead>
              <TableHead
                className="cursor-pointer bg-transparent text-slate-800 dark:text-white font-semibold py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300"
                onClick={() => handleSort("category")}
              >
                {t("assets.category")}
              </TableHead>
              <TableHead className="bg-transparent text-slate-800 dark:text-white font-semibold py-4">
                {t("common.status")}
              </TableHead>
              <TableHead className="bg-transparent text-slate-800 dark:text-white font-semibold py-4">
                {t("assets.assignedTo")}
              </TableHead>
              <TableHead className="text-right bg-transparent text-slate-800 dark:text-white font-semibold py-4 rounded-r-xl">
                {t("common.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow
                key={asset.id}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 group"
              >
                <TableCell className="py-4">
                  <Checkbox
                    checked={selectedAssets.includes(asset.id)}
                    onCheckedChange={() => toggleSelectAsset(asset.id)}
                    className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                </TableCell>
                <TableCell className="py-4 font-semibold text-slate-800 dark:text-white">
                  {asset.code}
                </TableCell>
                <TableCell className="py-4 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-lg">
                      <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    {asset.name}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm"
                  >
                    {asset.category}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="default"
                    className={`rounded-lg font-medium shadow-sm ${
                      asset.status === "Available"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : asset.status === "Assigned"
                        ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    }`}
                  >
                    {asset.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-slate-700 dark:text-slate-300">
                  {asset.assignedTo || (
                    <span className="text-slate-400 dark:text-slate-500">
                      -
                    </span>
                  )}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <AssetFormDialog asset={asset} />
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAssets((prev) =>
                          prev.filter((a) => a.id !== asset.id)
                        );
                        toast.success("Asset deleted");
                      }}
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Premium Empty State */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-2">
              No assets found
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No assets available in the system"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
