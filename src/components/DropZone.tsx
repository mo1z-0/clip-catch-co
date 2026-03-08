import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";

interface DropZoneProps {
  onUrlDetected: (url: string) => void;
  isLoading: boolean;
}

const URL_REGEX = /https?:\/\/[^\s<>"']+/i;

const DropZone = ({ onUrlDetected, isLoading }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const extractUrl = (text: string): string | null => {
    const match = text.match(URL_REGEX);
    return match ? match[0] : null;
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (isLoading) return;

      // Check for plain text (dragged URL)
      const text = e.dataTransfer.getData("text/plain");
      if (text) {
        const url = extractUrl(text);
        if (url) {
          onUrlDetected(url);
          return;
        }
      }

      // Check for dropped files
      const files = Array.from(e.dataTransfer.files);
      const textFile = files.find(
        (f) => f.type === "text/plain" || f.name.endsWith(".txt")
      );
      if (textFile) {
        const content = await textFile.text();
        const url = extractUrl(content);
        if (url) {
          onUrlDetected(url);
        }
      }
    },
    [onUrlDetected, isLoading]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`w-full max-w-2xl mx-auto mt-10 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border bg-card/50 hover:border-muted-foreground/40"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isDragging ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {isDragging ? (
            <Upload className="w-6 h-6 animate-bounce" />
          ) : (
            <FileText className="w-6 h-6" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {isDragging ? "Drop it here!" : "Drag & drop a URL or text file"}
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Drop a .txt file containing a video link, or drag a URL directly
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DropZone;
