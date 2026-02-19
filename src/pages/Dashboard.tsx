import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, AlertTriangle, Upload, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const studentStats = [
  { label: 'Submitted', value: '12', icon: FileText, color: 'text-primary' },
  { label: 'Graded', value: '8', icon: CheckCircle, color: 'text-success' },
  { label: 'Pending', value: '3', icon: Clock, color: 'text-warning' },
  { label: 'Flagged', value: '1', icon: AlertTriangle, color: 'text-destructive' },
];

const lecturerStats = [
  { label: 'New Submissions', value: '24', icon: Upload, color: 'text-primary' },
  { label: 'Students', value: '86', icon: Users, color: 'text-info' },
  { label: 'Resources', value: '42', icon: BookOpen, color: 'text-success' },
  { label: 'Avg Score', value: '72%', icon: TrendingUp, color: 'text-warning' },
];

const recentActivity = [
  { text: 'Assignment "AI Ethics Essay" submitted', time: '2 hours ago', type: 'submit' },
  { text: 'Grade received: Research Methods - 85%', time: '5 hours ago', type: 'grade' },
  { text: 'New resource uploaded: "Machine Learning Basics"', time: '1 day ago', type: 'resource' },
  { text: 'Document analysis completed - 8% plagiarism', time: '1 day ago', type: 'analysis' },
  { text: 'New message from Dr. Johnson', time: '2 days ago', type: 'message' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const stats = user?.role === 'lecturer' ? lecturerStats : studentStats;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening today.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold font-display">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
