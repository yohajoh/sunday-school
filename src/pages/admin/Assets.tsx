import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

export default function Assets() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const [assets, setAssets] = useState([
    { id: '1', code: 'BK-001', name: 'Holy Bible - Amharic', category: 'Books', status: 'Available', assignedTo: '', purchaseDate: '2023-01-15' },
    { id: '2', code: 'CH-001', name: 'Wooden Chair Set', category: 'Furniture', status: 'Assigned', assignedTo: 'John Doe', purchaseDate: '2022-11-20' },
    { id: '3', code: 'PR-001', name: 'Projector System', category: 'Electronics', status: 'Maintenance', assignedTo: '', purchaseDate: '2023-05-10' },
  ]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAssets = [...assets].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredAssets = sortedAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(filteredAssets.map(a => a.id));
    }
  };

  const toggleSelectAsset = (id: string) => {
    setSelectedAssets(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedAssets.length === 0) {
      toast.error('No assets selected');
      return;
    }
    setAssets(prev => prev.filter(a => !selectedAssets.includes(a.id)));
    setSelectedAssets([]);
    toast.success(`${selectedAssets.length} asset(s) deleted`);
  };

  const AssetFormDialog = ({ asset }: { asset?: typeof assets[0] }) => {
    const [formData, setFormData] = useState(asset || {
      code: '', name: '', category: '', status: 'Available', assignedTo: '', purchaseDate: ''
    });

    const handleSubmit = () => {
      if (asset) {
        setAssets(prev => prev.map(a => a.id === asset.id ? { ...a, ...formData } : a));
        toast.success('Asset updated successfully');
      } else {
        setAssets(prev => [...prev, { id: Date.now().toString(), ...formData }]);
        toast.success('Asset registered successfully');
      }
    };

    return (
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{asset ? t('common.edit') : t('assets.addNew')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('assets.code')}</Label>
              <Input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t('assets.name')}</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('assets.category')}</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('common.status')}</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('assets.purchaseDate')}</Label>
              <Input type="date" value={formData.purchaseDate} onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t('assets.assignedTo')}</Label>
              <Input value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} />
            </div>
          </div>
          <Button onClick={handleSubmit} className="bg-secondary">{t('common.save')}</Button>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('assets.manage')}</h1>
          <p className="text-muted-foreground mt-2">{t('assets.overview')}</p>
        </div>
        <div className="flex gap-2">
          {selectedAssets.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              {t('common.delete')} ({selectedAssets.length})
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-secondary">
                <Plus className="h-4 w-4 mr-2" />
                {t('assets.addNew')}
              </Button>
            </DialogTrigger>
            <AssetFormDialog />
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('common.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="eotc-card rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedAssets.length === filteredAssets.length} onCheckedChange={toggleSelectAll} />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('code')}>{t('assets.code')}</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>{t('assets.name')}</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>{t('assets.category')}</TableHead>
              <TableHead>{t('common.status')}</TableHead>
              <TableHead>{t('assets.assignedTo')}</TableHead>
              <TableHead className="text-right">{t('common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>
                  <Checkbox checked={selectedAssets.includes(asset.id)} onCheckedChange={() => toggleSelectAsset(asset.id)} />
                </TableCell>
                <TableCell className="font-medium">{asset.code}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.category}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-sm ${asset.status === 'Available' ? 'eotc-success' : 'bg-muted'}`}>
                    {asset.status}
                  </span>
                </TableCell>
                <TableCell>{asset.assignedTo || '-'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <AssetFormDialog asset={asset} />
                    </Dialog>
                    <Button variant="outline" size="sm" onClick={() => {
                      setAssets(prev => prev.filter(a => a.id !== asset.id));
                      toast.success('Asset deleted');
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
