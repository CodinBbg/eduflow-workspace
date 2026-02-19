import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, BookOpen, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import authHero from '@/assets/auth-hero.jpg';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        await signup(name, email, password, role);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={authHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-primary opacity-85" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-8 h-8" />
              <span className="font-display text-xl font-bold">EduFlow</span>
            </div>
            <p className="text-sm opacity-80">Academic Intelligence Platform</p>
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight mb-4">
              Empowering Academic<br />Excellence with AI
            </h1>
            <p className="text-lg opacity-90 max-w-md">
              Submit, analyze, and collaborate on academic work with AI-powered plagiarism detection and smart resource recommendations.
            </p>
          </div>
          <div className="flex gap-8 text-sm opacity-80">
            <div><span className="block text-2xl font-bold opacity-100">500+</span>Active Users</div>
            <div><span className="block text-2xl font-bold opacity-100">10K+</span>Documents</div>
            <div><span className="block text-2xl font-bold opacity-100">98%</span>Accuracy</div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <GraduationCap className="w-7 h-7 text-primary" />
            <span className="font-display text-xl font-bold">EduFlow</span>
          </div>

          <h2 className="font-display text-2xl font-bold mb-1">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isLogin ? 'Sign in to continue to your dashboard' : 'Get started with EduFlow today'}
          </p>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {([
              { value: 'student' as UserRole, label: 'Student', icon: BookOpen, desc: 'Submit & learn' },
              { value: 'lecturer' as UserRole, label: 'Lecturer', icon: GraduationCap, desc: 'Review & grade' },
            ]).map(r => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  role === r.value
                    ? 'border-primary bg-primary/5 shadow-glow'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <r.icon className={`w-6 h-6 ${role === r.value ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`font-medium text-sm ${role === r.value ? 'text-primary' : 'text-foreground'}`}>{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.desc}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {role && (
              <motion.form
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {!isLogin && (
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@university.edu" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
