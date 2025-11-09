import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  Filter,
  // Users,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Users() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const [users, setUsers] = useState([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@church.org",
      role: "User",
      status: "Active",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@church.org",
      role: "Admin",
      status: "Active",
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael@church.org",
      role: "User",
      status: "Inactive",
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

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }
    setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u.id)));
    setSelectedUsers([]);
    toast.success(`${selectedUsers.length} user(s) deleted`);
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
                  {/* <Users className="h-8 w-8 text-blue-400" /> */}
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">
                    {t("users.manage")}
                  </h1>
                  <p className="text-blue-100 text-lg mt-2">
                    {t("users.viewManage")}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold">{users.length}</p>
                    <p className="text-xs text-blue-200">Total Users</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Zap className="h-6 w-6 text-violet-400" />
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.status === "Active").length}
                    </p>
                    <p className="text-xs text-violet-200">Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.role === "Admin").length}
                    </p>
                    <p className="text-xs text-emerald-200">Admins</p>
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
              placeholder={t("users.searchPlaceholder")}
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
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            onClick={() => navigate("/signup")}
          >
            <Plus className="h-4 w-4" />
            Add User
          </Button>
          {selectedUsers.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Trash2 className="h-4 w-4" />
              Delete ({selectedUsers.length})
            </Button>
          )}
        </div>
      </div>

      {/* Premium Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border-0 shadow-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50">
            <TableRow className="border-b border-slate-200 dark:border-slate-700">
              <TableHead className="w-12 bg-transparent">
                <Checkbox
                  checked={
                    selectedUsers.length === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
              </TableHead>
              <TableHead
                className="cursor-pointer bg-transparent text-slate-800 dark:text-white font-semibold py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 rounded-l-xl"
                onClick={() => handleSort("firstName")}
              >
                {t("users.user")}
              </TableHead>
              <TableHead
                className="cursor-pointer bg-transparent text-slate-800 dark:text-white font-semibold py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300"
                onClick={() => handleSort("email")}
              >
                Email
              </TableHead>
              <TableHead
                className="cursor-pointer bg-transparent text-slate-800 dark:text-white font-semibold py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300"
                onClick={() => handleSort("role")}
              >
                {t("common.role")}
              </TableHead>
              <TableHead className="bg-transparent text-slate-800 dark:text-white font-semibold py-4">
                {t("common.status")}
              </TableHead>
              <TableHead className="text-right bg-transparent text-slate-800 dark:text-white font-semibold py-4 rounded-r-xl">
                {t("common.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 group"
              >
                <TableCell className="py-4">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleSelectUser(user.id)}
                    className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-600 shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold shadow-md">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-slate-700 dark:text-slate-300">
                  {user.email}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    className={`rounded-lg font-medium shadow-sm ${
                      user.role === "Admin"
                        ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                        : "bg-gradient-to-r from-slate-500 to-slate-600 text-white"
                    }`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    className={`rounded-lg font-medium shadow-sm ${
                      user.status === "Active"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "bg-gradient-to-r from-slate-400 to-slate-500 text-white"
                    }`}
                  >
                    {user.status === "Active"
                      ? t("common.active")
                      : t("common.inactive")}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUsers((prev) =>
                          prev.filter((u) => u.id !== user.id)
                        );
                        toast.success("User deleted");
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
        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {/* <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" /> */}
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-2">
              No users found
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No users available in the system"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
