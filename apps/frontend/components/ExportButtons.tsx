export default function ExportButtons({ onExport }: { onExport: (type: 'pdf' | 'excel' | 'csv') => void }) {
  return (
    <div className="flex gap-2 mt-4">
      <button className="btn btn-primary" onClick={() => onExport('pdf')}>PDF</button>
      <button className="btn btn-accent" onClick={() => onExport('excel')}>Excel</button>
      <button className="btn btn-accent" onClick={() => onExport('csv')}>CSV</button>
    </div>
  )
} 