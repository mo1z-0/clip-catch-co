import { motion } from "framer-motion";
import { Clock, Eye, Calendar } from "lucide-react";

export interface VideoMeta {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  platform: string;
}

interface VideoPreviewProps {
  meta: VideoMeta;
}

const platformColors: Record<string, string> = {
  YouTube: "bg-red-500",
  Facebook: "bg-blue-500",
  Instagram: "bg-pink-500",
  "Twitter/X": "bg-cyan-500",
};

const VideoPreview = ({ meta }: VideoPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto bg-card rounded-2xl border border-border overflow-hidden"
    >
      <div className="relative aspect-video bg-secondary">
        <img
          src={meta.thumbnail}
          alt={meta.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-foreground text-xs font-mono px-2 py-1 rounded-md">
          {meta.duration}
        </div>
        <div className={`absolute top-3 left-3 ${platformColors[meta.platform] || "bg-primary"} text-xs font-semibold px-2.5 py-1 rounded-full text-white`}>
          {meta.platform}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-foreground text-lg leading-tight mb-3 line-clamp-2">
          {meta.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {meta.views}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {meta.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {meta.uploadDate}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPreview;
