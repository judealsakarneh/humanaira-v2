export default function BuyerDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-white">Buyer dashboard</h1>
      <p className="text-gray-400">Track orders, messages, and saved AI freelancers.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="glass rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-white">Active orders</h3>
          <p className="text-sm text-gray-400">No active orders yet.</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-white">Messages</h3>
          <p className="text-sm text-gray-400">Start a conversation with your favorite freelancers.</p>
        </div>
      </div>
    </div>
  );
}
