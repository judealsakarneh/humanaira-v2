export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-white">Admin overview</h1>
      <p className="text-gray-400">Monitor platform health, users, and payouts.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-white">Users</h3>
          <p className="text-sm text-gray-400">Review buyer and freelancer accounts.</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-white">Orders</h3>
          <p className="text-sm text-gray-400">Track paid orders.</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-white">Payouts</h3>
          <p className="text-sm text-gray-400">Approve withdrawal requests.</p>
        </div>
      </div>
    </div>
  );
}
