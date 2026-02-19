import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload, FileText, ExternalLink, BookOpen, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockResources = [
  { id: 1, title: 'Introduction to Machine Learning', type: 'PDF', source: 'School', author: 'Dr. Johnson', date: '2026-02-15', size: '2.4 MB' },
  { id: 2, title: 'Research Methodology Handbook', type: 'PDF', source: 'School', author: 'Prof. Williams', date: '2026-02-10', size: '5.1 MB' },
  { id: 3, title: 'Academic Writing Standards', type: 'DOC', source: 'School', author: 'Dr. Chen', date: '2026-02-08', size: '1.2 MB' },
  { id: 4, title: 'IEEE Citation Guide 2026', type: 'PDF', source: 'Internet', author: 'IEEE', date: '2026-01-20', size: '800 KB' },
  { id: 5, title: 'Deep Learning with Python', type: 'PDF', source: 'Internet', author: 'F. Chollet', date: '2026-01-15', size: '12.3 MB' },
  { id: 6, title: 'Data Ethics in AI Research', type: 'PDF', source: 'School', author: 'Dr. Patel', date: '2026-02-01', size: '3.7 MB' },
];

const Resources = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'School' | 'Internet'>('all');

  const filtered = mockResources.filter(r =>
    (filter === 'all' || r.source === filter) &&
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-1">Browse and manage academic resources</p>
        </div>
        {user?.role === 'lecturer' && (
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Upload className="w-4 h-4 mr-2" /> Upload Resource
          </Button>
        )}
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          {(['all', 'School', 'Internet'] as const).map(f => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)} className={filter === f ? 'bg-gradient-primary text-primary-foreground' : ''}>
              {f === 'all' ? 'All' : f}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((res, i) => (
          <motion.div key={res.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {res.source === 'Internet' ? <ExternalLink className="w-5 h-5 text-primary" /> : <BookOpen className="w-5 h-5 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{res.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{res.author} • {res.date} • {res.size}</p>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex text-xs">{res.source}</Badge>
                <Badge variant="outline" className="text-xs">{res.type}</Badge>
                <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
