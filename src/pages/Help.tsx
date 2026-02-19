import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Video, MessageCircle, Shield, FileSearch, PenTool, Mail, HelpCircle } from 'lucide-react';

const guides = [
  { icon: FileSearch, title: 'Document Analysis', desc: 'Upload documents for AI-powered plagiarism checking. Documents with >15% plagiarism will be flagged with revision recommendations.' },
  { icon: PenTool, title: 'Workspace', desc: 'Write and edit assignments directly in the app. Use the AI Research Assistant for journal and article recommendations.' },
  { icon: Mail, title: 'Secure Messaging', desc: 'Send and receive messages with anti-spoofing protection. Suspicious links are automatically flagged.' },
  { icon: Shield, title: 'Anti-Plagiarism', desc: 'Our AI analyzes documents against academic databases, journals, and web sources to ensure originality.' },
];

const faqs = [
  { q: 'How does the plagiarism detection work?', a: 'Our AI compares your document against millions of academic papers, journals, and web sources. It identifies matching passages and calculates an overall similarity score. Scores above 15% trigger recommendations for revision.' },
  { q: 'Can I resubmit after making changes?', a: 'Yes! If your document is flagged, you can revise it using the recommended resources and resubmit. You also have the option to submit anyway if you believe the matches are properly cited.' },
  { q: 'How does the AI Research Assistant help?', a: 'The AI assistant in the Workspace can find relevant journals, articles, and research papers based on your assignment topic. It can also provide summaries and suggest additional reading materials.' },
  { q: 'What is email spoofing protection?', a: 'Our system scans incoming emails for suspicious links and domains that mimic legitimate addresses (e.g., "un1versity" instead of "university"). Flagged emails are moved to the spam folder with detailed warnings.' },
  { q: 'How do I see my grades?', a: 'Once your lecturer reviews and grades your submission, the score will appear in your Dashboard and in the submission history. You\'ll also receive a notification.' },
  { q: 'Can lecturers upload resources?', a: 'Yes, lecturers can upload study materials, past papers, and reference documents to the Resources section for students to access.' },
];

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold">Help & Training</h1>
        <p className="text-muted-foreground mt-1">Learn how to use EduFlow effectively</p>
      </motion.div>

      {/* Feature Guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guides.map((g, i) => (
          <motion.div key={g.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <g.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{g.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-medium">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact */}
      <Card>
        <CardContent className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm">Need more help?</h3>
            <p className="text-xs text-muted-foreground">Contact the IT support team at support@university.edu or visit the help desk in Building A, Room 101.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
