import { FileText, Tags, CheckCircle, Clock } from 'lucide-react';

const stats = [
  { name: 'Total Blogs', value: '42', icon: FileText },
  { name: 'Published', value: '38', icon: CheckCircle },
  { name: 'Drafts', value: '4', icon: Clock },
  { name: 'Categories', value: '6', icon: Tags },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
        <h2 className="text-lg font-medium text-white">Welcome back!</h2>
        <p className="mt-1 text-sm text-white/60">
          Here&apos;s what&apos;s happening with your content today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-6"
          >
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                <stat.icon className="h-6 w-6 text-white/80" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/60">{stat.name}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
