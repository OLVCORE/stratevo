export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-surface-700 rounded-xl ${className}`} />
  )
} 