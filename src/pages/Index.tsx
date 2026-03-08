import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Zap, Shield, Globe } from "lucide-react";
import UrlInput from "@/components/UrlInput";
import VideoPreview, { VideoMeta } from "@/components/VideoPreview";
import FormatSelector from "@/components/FormatSelector";
import ThemeToggle from "@/components/ThemeToggle";
import heroThumb from "@/assets/hero-thumbnail.jpg";

const MOCK_META: VideoMeta = {
  title: "Exploring the Neon Cities of Tomorrow — A Cinematic Journey",
  thumbnail: heroThumb,
  duration: "12:34",
  views: "1.2M views",
  uploadDate: "Mar 5, 2026",
  platform: "YouTube",
};

const detectPlatform = (url: string): string => {
  if (url.includes("youtube") || url.includes("youtu.be")) return "YouTube";
  if (url.includes("facebook") || url.includes("fb.")) return "Facebook";
  if (url.includes("instagram")) return "Instagram";
  if (url.includes("twitter") || url.includes("x.com")) return "Twitter/X";
  return "YouTube";
};

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Process videos in seconds" },
  { icon: Shield, title: "Safe & Private", desc: "No data stored on servers" },
  { icon: Globe, title: "Multi-Platform", desc: "YouTube, FB, IG & more" },
];

const Index = () => {
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (url: string) => {
    setError(null);
    setIsLoading(true);
    setMeta(null);

    // Simulate fetch
    setTimeout(() => {
      try {
        const platform = detectPlatform(url);
        setMeta({ ...MOCK_META, platform });
        setIsLoading(false);
      } catch {
        setError("Failed to fetch video. Please check the URL.");
        setIsLoading(false);
      }
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none gradient-primary" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none gradient-accent" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Download className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground tracking-tight">VidGrab</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <main className="relative z-10 px-6 pt-12 pb-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
            Download Any Video,{" "}
            <span className="text-gradient">Instantly</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Paste a link from YouTube, Facebook, Instagram, or X — choose your quality and download.
          </p>
        </motion.div>

        {/* URL Input */}
        <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-destructive font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* Video Preview + Format Selector */}
        {meta && (
          <div className="mt-8 space-y-6">
            <VideoPreview meta={meta} />
            <FormatSelector />
          </div>
        )}

        {/* Features */}
        {!meta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="font-semibold text-foreground text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{f.desc}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Recent downloads */}
        <RecentDownloads />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6 text-center text-xs text-muted-foreground font-mono">
        VidGrab © 2026 — For personal use only
      </footer>
    </div>
  );
};

export default Index;
