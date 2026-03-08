import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Film, Music, Check, Loader2 } from "lucide-react";

interface Format {
  id: string;
  label: string;
  quality: string;
  type: "video" | "audio";
  size: string;
  format: string;
}

const FORMATS: Format[] = [
  { id: "1080p", label: "1080p", quality: "Full HD", type: "video", size: "~250 MB", format: "MP4" },
  { id: "720p", label: "720p", quality: "HD", type: "video", size: "~120 MB", format: "MP4" },
  { id: "480p", label: "480p", quality: "SD", type: "video", size: "~65 MB", format: "MP4" },
  { id: "360p", label: "360p", quality: "Low", type: "video", size: "~35 MB", format: "MP4" },
  { id: "mp3", label: "MP3", quality: "Audio 320kbps", type: "audio", size: "~8 MB", format: "MP3" },
  { id: "m4a", label: "M4A", quality: "Audio AAC", type: "audio", size: "~6 MB", format: "M4A" },
];

const FormatSelector = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = () => {
    if (!selected) return;
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    }, 2500);
  };

  const videoFormats = FORMATS.filter((f) => f.type === "video");
  const audioFormats = FORMATS.filter((f) => f.type === "audio");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Video formats */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
          <Film className="w-4 h-4 text-primary" />
          Video Formats
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {videoFormats.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f.id)}
              className={`relative rounded-xl border p-3 text-left transition-all duration-200 ${
                selected === f.id
                  ? "border-primary bg-primary/10 glow-primary"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {selected === f.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <div className="font-bold text-foreground text-sm">{f.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{f.quality}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">{f.size}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Audio formats */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
          <Music className="w-4 h-4 text-accent" />
          Audio Only
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {audioFormats.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f.id)}
              className={`relative rounded-xl border p-3 text-left transition-all duration-200 ${
                selected === f.id
                  ? "border-accent bg-accent/10 glow-accent"
                  : "border-border bg-card hover:border-accent/40"
              }`}
            >
              {selected === f.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
              )}
              <div className="font-bold text-foreground text-sm">{f.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{f.quality}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">{f.size}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Download button */}
      <motion.button
        onClick={handleDownload}
        disabled={!selected || downloading}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
          done
            ? "bg-green-500 text-white"
            : "gradient-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        }`}
      >
        {downloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : done ? (
          <>
            <Check className="w-4 h-4" />
            Download Complete!
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download {selected ? FORMATS.find((f) => f.id === selected)?.label : ""}
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default FormatSelector;
