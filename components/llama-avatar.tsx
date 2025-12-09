interface LlamaAvatarProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LlamaAvatar({ size = "md", className = "" }: LlamaAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-secondary flex items-center justify-center ${className}`}
      role="img"
      aria-label="Avatar de llama"
    >
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="50" cy="65" rx="25" ry="20" className="fill-primary" />
        {/* Neck */}
        <path d="M45 50 Q40 30 45 15 Q50 10 55 15 Q60 30 55 50 Z" className="fill-primary" />
        {/* Head */}
        <circle cx="50" cy="18" r="12" className="fill-primary" />
        {/* Ears */}
        <ellipse cx="40" cy="8" rx="3" ry="6" className="fill-primary" />
        <ellipse cx="60" cy="8" rx="3" ry="6" className="fill-primary" />
        {/* Inner ears */}
        <ellipse cx="40" cy="8" rx="1.5" ry="3" className="fill-secondary" />
        <ellipse cx="60" cy="8" rx="1.5" ry="3" className="fill-secondary" />
        {/* Eyes */}
        <circle cx="45" cy="16" r="2" className="fill-card" />
        <circle cx="55" cy="16" r="2" className="fill-card" />
        {/* Pupils */}
        <circle cx="45.5" cy="16.5" r="1" className="fill-foreground" />
        <circle cx="55.5" cy="16.5" r="1" className="fill-foreground" />
        {/* Nose */}
        <ellipse cx="50" cy="22" rx="2" ry="1.5" className="fill-secondary" />
        {/* Legs */}
        <rect x="32" y="80" width="6" height="15" rx="3" className="fill-primary" />
        <rect x="42" y="80" width="6" height="15" rx="3" className="fill-primary" />
        <rect x="52" y="80" width="6" height="15" rx="3" className="fill-primary" />
        <rect x="62" y="80" width="6" height="15" rx="3" className="fill-primary" />
        {/* Tail */}
        <ellipse cx="75" cy="60" rx="5" ry="4" className="fill-primary" />
      </svg>
    </div>
  )
}
