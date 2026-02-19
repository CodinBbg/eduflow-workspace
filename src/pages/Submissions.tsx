import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, FileText, CheckCircle, Clock, Eye, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Submission {
  id: number;
  student: string;
  title: string;
  date: string;
  status: 'pending' | 'graded';
  plagiarismScore: number;
  grade?: number;
}

const mockSubmissions: Submission[] = [
  { id: 1, student: 'Alex Thompson', title: 'AI Ethics in Modern Education', date: '2026-02-19', status: 'pending', plagiarismScore: 8 },
  { id: 2, student: 'Maria Garcia', title: 'Machine Learning Applications', date: '2026-02-18', status: 'pending', plagiarismScore: 12 },
  { id: 3, student: 'James Wilson', title: 'Neural Network Architecture', date: '2026-02-17', status: 'graded', plagiarismScore: 5, grade: 88 },
  { id: 4, student: 'Emily Davis', title: 'Data Privacy in Healthcare', date: '2026-02-16', status: 'graded', plagiarismScore: 3, grade: 92 },
  { id: 5, student: 'Daniel Kim', title: 'Blockchain in Education', date: '2026-02-15', status: 'pending', plagiarismScore: 22 },
];

const Submissions = () => {
  const [search, setSearch] = useState('');
  const [gradeInput, setGradeInput] = useState('');

  const filtered = mockSubmissions.filter(s =>
    s.student.toLowerCase().includes(search.toLowerCase()) ||
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold">Student Submissions</h1>
        <p className="text-muted-foreground mt-1">Review and grade student work</p>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by student or title..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="space-y-3">
        {filtered.map((sub, i) => (
          <motion.div key={sub.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">{sub.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{sub.title}</p>
                  <p className="text-xs text-muted-foreground">{sub.student} • {sub.date}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={sub.plagiarismScore > 15 ? 'destructive' : 'secondary'} className="text-xs">
                    {sub.plagiarismScore}% plagiarism
                  </Badge>
                  {sub.status === 'graded' ? (
                    <Badge className="bg-success text-success-foreground text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" /> {sub.grade}%
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" /> Pending
                    </Badge>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-display">{sub.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div><span className="text-muted-foreground">Student:</span> {sub.student}</div>
                          <div><span className="text-muted-foreground">Date:</span> {sub.date}</div>
                          <div><span className="text-muted-foreground">Plagiarism:</span> {sub.plagiarismScore}%</div>
                          <div><span className="text-muted-foreground">Status:</span> {sub.status}</div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg text-sm">
                          <p>This is a preview of the submitted document content. Full content would be loaded from the backend...</p>
                        </div>
                        {sub.status === 'pending' && (
                          <div className="space-y-2">
                            <Label>Assign Grade (%)</Label>
                            <div className="flex gap-2">
                              <Input type="number" min="0" max="100" placeholder="Enter grade..." value={gradeInput} onChange={e => setGradeInput(e.target.value)} />
                              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                                <Star className="w-4 h-4 mr-2" /> Grade
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
