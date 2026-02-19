import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, AlertTriangle, CheckCircle, RefreshCw, Send, BookOpen, ExternalLink } from 'lucide-react';

type AnalysisState = 'idle' | 'uploading' | 'analyzing' | 'result';

interface AnalysisResult {
  plagiarismScore: number;
  flagged: boolean;
  sections: { text: string; score: number; source?: string }[];
  recommendations: { title: string; url: string; type: string }[];
}

const mockResult: AnalysisResult = {
  plagiarismScore: 22,
  flagged: true,
  sections: [
    { text: '"Machine learning is a subset of artificial intelligence that..."', score: 85, source: 'Wikipedia - Machine Learning' },
    { text: '"The backpropagation algorithm was first described in..."', score: 45, source: 'DeepLearning.ai Course Notes' },
    { text: '"Neural networks consist of layers of interconnected nodes..."', score: 30, source: 'MIT OpenCourseWare' },
  ],
  recommendations: [
    { title: 'Journal of Machine Learning Research - Vol 27', url: '#', type: 'Journal' },
    { title: 'IEEE Transactions on Neural Networks', url: '#', type: 'Journal' },
    { title: 'Nature Machine Intelligence - Recent Papers', url: '#', type: 'Article' },
    { title: 'ArXiv: Latest ML Research Papers', url: '#', type: 'Preprint' },
  ],
};

const DocumentAnalysis = () => {
  const [state, setState] = useState<AnalysisState>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState('');

  const handleUpload = () => {
    setFileName('AI_Ethics_Essay_Final.docx');
    setState('uploading');
    setProgress(0);

    const uploadTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(uploadTimer);
          setState('analyzing');
          // Simulate analysis
          setTimeout(() => {
            setResult(mockResult);
            setState('result');
          }, 2000);
          return 100;
        }
        return p + 20;
      });
    }, 300);
  };

  const resetAnalysis = () => {
    setState('idle');
    setResult(null);
    setProgress(0);
    setFileName('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold">Document Analysis</h1>
        <p className="text-muted-foreground mt-1">AI-powered plagiarism detection and content analysis</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="border-2 border-dashed border-border hover:border-primary/40 transition-colors">
              <CardContent className="p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">Upload Document</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Drag and drop your document here, or click to browse. Supports PDF, DOCX, and TXT files.
                </p>
                <Button onClick={handleUpload} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                  <Upload className="w-4 h-4 mr-2" /> Select File
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {(state === 'uploading' || state === 'analyzing') && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium mb-1">{fileName}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {state === 'uploading' ? 'Uploading...' : 'Analyzing document for plagiarism...'}
                </p>
                <Progress value={state === 'analyzing' ? 100 : progress} className="max-w-xs mx-auto" />
                {state === 'analyzing' && (
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Running AI analysis...
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {state === 'result' && result && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {/* Score Card */}
            <Card className={result.flagged ? 'border-warning/50' : 'border-success/50'}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${result.flagged ? 'bg-warning/10' : 'bg-success/10'}`}>
                    {result.flagged
                      ? <AlertTriangle className="w-8 h-8 text-warning" />
                      : <CheckCircle className="w-8 h-8 text-success" />
                    }
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      Plagiarism Score: {result.plagiarismScore}%
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {result.flagged
                        ? 'Score exceeds 15% threshold. We recommend revising your work.'
                        : 'Your document is within acceptable limits.'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flagged Sections */}
            {result.flagged && (
              <Card>
                <CardHeader><CardTitle className="font-display text-base">Flagged Sections</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {result.sections.map((s, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm italic text-foreground/80">{s.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Source: {s.source}</span>
                        <span className={`text-xs font-medium ${s.score > 50 ? 'text-destructive' : 'text-warning'}`}>
                          {s.score}% match
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {result.flagged && (
              <Card>
                <CardHeader><CardTitle className="font-display text-base">Recommended Resources</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <a key={i} href={r.url} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <BookOpen className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm flex-1">{r.title}</span>
                      <span className="text-xs text-muted-foreground">{r.type}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {result.flagged && (
                <Button onClick={resetAnalysis} variant="outline" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" /> Redo & Resubmit
                </Button>
              )}
              <Button className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90">
                <Send className="w-4 h-4 mr-2" /> {result.flagged ? 'Submit Anyway' : 'Submit'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentAnalysis;
