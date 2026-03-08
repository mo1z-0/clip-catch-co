import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, ArrowRight, Loader2 } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput = ({ onSubmit, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onSubmit(url.trim());
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (pasted && /^https?:\/\//i.test(pasted)) {
      e.preventDefault();
      setUrl(pasted);
      onSubmit(pasted);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 gradient-primary rounded-2xl opacity-30 group-hover:opacity-50 blur-sm transition-opacity duration-300" />
        <div className="relative flex items-center bg-card rounded-2xl border border-border overflow-hidden">
          <div className="pl-5 text-muted-foreground">
            <Link2 className="w-5 h-5" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onPaste={handlePaste}
            className="flex-1 bg-transparent px-4 py-5 text-foreground placeholder:text-muted-foreground focus:outline-none text-base font-mono"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="m-2 gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 disabled:opacity-40 hover:opacity-90 transition-all duration-200 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Fetch
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          YouTube
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Facebook
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          Instagram
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          Twitter/X
        </span>
      </div>
    </motion.form>
  );
};

export default UrlInput;
