import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Inbox as InboxIcon, Send, Trash2, AlertTriangle, Mail, Star,
  PenSquare, ArrowLeft, Shield, ExternalLink, X
} from 'lucide-react';

interface Email {
  id: number;
  from: string;
  fromRole: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  read: boolean;
  starred: boolean;
  spam: boolean;
  spoofWarning?: string;
}

const mockEmails: Email[] = [
  { id: 1, from: 'Dr. Sarah Johnson', fromRole: 'Lecturer', subject: 'Assignment 3 Feedback', preview: 'Great work on your AI Ethics essay...', body: 'Great work on your AI Ethics essay. I particularly liked your analysis of bias in ML models. A few areas for improvement:\n\n1. Strengthen your conclusion\n2. Add more recent citations\n3. Consider the counterarguments\n\nOverall grade: 85%', time: '10:30 AM', read: false, starred: true, spam: false },
  { id: 2, from: 'Prof. Williams', fromRole: 'Lecturer', subject: 'Research Methods: Updated Syllabus', preview: 'Please find the updated syllabus for...', body: 'Please find the updated syllabus for Research Methods. The deadline for the final paper has been extended to March 15th.\n\nBest regards,\nProf. Williams', time: '9:15 AM', read: true, starred: false, spam: false },
  { id: 3, from: 'Academic Office', fromRole: 'Admin', subject: 'Exam Schedule Published', preview: 'The exam schedule for the spring...', body: 'The exam schedule for the spring semester has been published. Please check the student portal for your individual schedule.', time: 'Yesterday', read: true, starred: false, spam: false },
  { id: 4, from: 'un1versity-admin@g00gle.com', fromRole: 'Unknown', subject: 'URGENT: Verify Your Account', preview: 'Click here to verify your university...', body: 'Click here to verify your university account immediately or it will be suspended: http://un1versity-l0gin.suspicious-site.com', time: '2 days ago', read: false, starred: false, spam: true, spoofWarning: 'This email contains a suspicious link: "un1versity-l0gin.suspicious-site.com" appears to be a spoofed domain mimicking your university.' },
];

const Inbox = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<'inbox' | 'spam'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [composing, setComposing] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const emails = mockEmails.filter(e => tab === 'spam' ? e.spam : !e.spam);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Inbox</h1>
          <p className="text-muted-foreground mt-1">Secure messaging between students and lecturers</p>
        </div>
        <Button onClick={() => { setComposing(true); setSelectedEmail(null); }} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <PenSquare className="w-4 h-4 mr-2" /> Compose
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Email List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex gap-2">
            <Button variant={tab === 'inbox' ? 'default' : 'outline'} size="sm" onClick={() => setTab('inbox')} className={tab === 'inbox' ? 'bg-gradient-primary text-primary-foreground' : ''}>
              <InboxIcon className="w-4 h-4 mr-1" /> Inbox
            </Button>
            <Button variant={tab === 'spam' ? 'default' : 'outline'} size="sm" onClick={() => setTab('spam')} className={tab === 'spam' ? 'bg-destructive text-destructive-foreground' : ''}>
              <AlertTriangle className="w-4 h-4 mr-1" /> Spam
              <Badge variant="destructive" className="ml-1 text-[10px] px-1.5">{mockEmails.filter(e => e.spam).length}</Badge>
            </Button>
          </div>

          <div className="space-y-2">
            {emails.map(email => (
              <Card
                key={email.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedEmail?.id === email.id ? 'ring-2 ring-primary' : ''} ${!email.read ? 'bg-primary/[0.02]' : ''}`}
                onClick={() => { setSelectedEmail(email); setComposing(false); }}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{email.from.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${!email.read ? 'font-semibold' : 'font-medium'}`}>{email.from}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{email.time}</span>
                      </div>
                      <p className="text-xs font-medium truncate">{email.subject}</p>
                      <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
                      {email.spam && (
                        <div className="flex items-center gap-1 mt-1">
                          <Shield className="w-3 h-3 text-destructive" />
                          <span className="text-[10px] text-destructive font-medium">Potential Phishing</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Email Detail / Compose */}
        <div className="lg:col-span-2">
          {composing ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display text-base">New Message</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setComposing(false)}><X className="w-4 h-4" /></Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input  type = "email" placeholder="To..." value={composeTo} onChange={e => setComposeTo(e.target.value)} />
                  <Input placeholder="Subject" value={composeSubject} onChange={e => setComposeSubject(e.target.value)} />
                  <Textarea placeholder="Write your message..." value={composeBody} onChange={e => setComposeBody(e.target.value)} className="min-h-[250px]" />
                  <div className="flex justify-end">
                    <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                      <Send className="w-4 h-4 mr-2" /> Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : selectedEmail ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-display text-lg">{selectedEmail.subject}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        From: <span className="font-medium text-foreground">{selectedEmail.from}</span> • {selectedEmail.time}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm"><Star className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedEmail.spoofWarning && (
                    <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-destructive">⚠ Spoofing Alert</p>
                          <p className="text-xs text-destructive/80 mt-1">{selectedEmail.spoofWarning}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{selectedEmail.body}</p>
                  {!selectedEmail.spam && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <Textarea placeholder="Type your reply..." className="min-h-[100px] mb-3" />
                      <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                        <Send className="w-4 h-4 mr-2" /> Reply
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Mail className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Select an email to read</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
