import { motion } from "framer-motion";
import { History, ExternalLink } from "lucide-react";

interface DownloadEntry {
  title: string;
  platform: string;
  quality: string;
  time: string;
}

const MOCK_HISTORY: DownloadEntry[] = [
  { title: "Amazing Nature Documentary 4K", platform: "YouTube", quality: "1080p", time: "2 min ago" },
  { title: "React Tutorial for Beginners", platform: "YouTube", quality: "720p", time: "15 min ago" },
  { title: "Sunset Timelapse Reel", platform: "Instagram", quality: "MP3", time: "1 hour ago" },
];

const RecentDownloads = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
        <History className="w-4 h-4 text-primary" />
        Recent Downloads
      </div>
      <div className="space-y-2">
        {MOCK_HISTORY.map((entry, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{entry.title}</div>
              <div className="text-xs text-muted-foreground font-mono mt-0.5">
                {entry.platform} · {entry.quality} · {entry.time}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-3" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentDownloads;
