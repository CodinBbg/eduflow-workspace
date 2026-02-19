import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Save, Send, Bot, BookOpen, Loader2, X, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Workspace = () => {
  const [title, setTitle] = useState('AI Ethics in Modern Education');
  const [content, setContent] = useState(
    'Artificial intelligence has become increasingly prevalent in educational settings. This essay explores the ethical implications of AI usage in academic environments, focusing on issues of plagiarism detection, student privacy, and equitable access to AI-powered tools.\n\n'
  );
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hi! I'm your AI research assistant. Ask me for journal recommendations, article summaries, or help with your assignment topic." }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiSend = () => {
    if (!aiQuery.trim()) return;
    setAiMessages(prev => [...prev, { role: 'user', content: aiQuery }]);
    setAiLoading(true);
    setAiQuery('');

    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        role: 'assistant',
        content: "Here are some relevant resources for your topic:\n\n📄 **Journal of AI Ethics** (2026) - \"Balancing Innovation and Integrity in Higher Education\"\n\n📄 **IEEE Transactions on Learning Technologies** - \"AI-Assisted Writing: Opportunities and Challenges\"\n\n📄 **Nature Education** - \"The Role of Machine Learning in Academic Assessment\"\n\nWould you like me to summarize any of these articles?"
      }]);
      setAiLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Workspace</h1>
          <p className="text-muted-foreground mt-1">Write, edit, and submit your assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Send className="w-4 h-4 mr-2" /> Turn In
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Editor */}
        <div className={`${aiOpen ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-3`}>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-lg font-display font-semibold border-0 bg-transparent px-0 focus-visible:ring-0"
            placeholder="Assignment Title"
          />
          <Card>
            <CardContent className="p-0">
              <Textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="min-h-[500px] border-0 rounded-lg resize-none focus-visible:ring-0 p-4 text-sm leading-relaxed"
                placeholder="Start writing your assignment..."
              />
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{content.split(/\s+/).filter(Boolean).length} words</p>
            <Button variant="ghost" size="sm" onClick={() => setAiOpen(!aiOpen)}>
              <Bot className="w-4 h-4 mr-2" />
              {aiOpen ? 'Hide' : 'Show'} AI Assistant
            </Button>
          </div>
        </div>

        {/* AI Assistant Panel */}
        {aiOpen && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <CardTitle className="font-display text-sm">AI Research Assistant</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setAiOpen(false)}>
                  <X className="w-3.5 h-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-3 pt-0">
                <div className="flex-1 overflow-y-auto space-y-3 mb-3 max-h-[400px]">
                  {aiMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Loader2 className="w-3 h-3 animate-spin" /> Searching...
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={aiQuery}
                    onChange={e => setAiQuery(e.target.value)}
                    placeholder="Ask for resources..."
                    onKeyDown={e => e.key === 'Enter' && handleAiSend()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={handleAiSend} disabled={aiLoading}>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
