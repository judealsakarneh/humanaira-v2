export default function FreelancerDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-white">Freelancer dashboard</h1>
      <p className="text-gray-400">Manage services, orders, and earnings.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-white">Services</h3>
          <p className="text-sm text-gray-400">Publish AI offers and packages.</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-white">Orders</h3>
          <p className="text-sm text-gray-400">Stay on top of client deliverables.</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-white">Earnings</h3>
          <p className="text-sm text-gray-400">Request payouts and review balance.</p>
        </div>
      </div>
    </div>
  );
}
