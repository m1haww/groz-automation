import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-sm text-groz-muted mt-1.5">
          Configurare GROZ Automation
        </p>
      </header>

      <section className="card">
        <h2 className="font-semibold text-sm text-white/95 mb-1 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-to-b from-red-400 to-red-700" />
          Budget caps
        </h2>
        <p className="text-xs text-groz-muted mb-4 ml-3">
          Limitează cât consumă sistemul din abonamentul GROZ Claude Max.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-groz-muted block mb-1.5 uppercase tracking-wider">
              Max runs / day
            </label>
            <input
              type="number"
              defaultValue={100}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/95 focus:border-red-500/50 focus:bg-white/[0.07] focus:outline-none transition-colors backdrop-blur-md"
            />
          </div>
          <div>
            <label className="text-xs text-groz-muted block mb-1.5 uppercase tracking-wider">
              Max runs / month
            </label>
            <input
              type="number"
              defaultValue={3000}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/95 focus:border-red-500/50 focus:bg-white/[0.07] focus:outline-none transition-colors backdrop-blur-md"
            />
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="font-semibold text-sm text-white/95 mb-1 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-to-b from-red-300 to-red-600" />
          Integrations
        </h2>
        <p className="text-xs text-groz-muted mb-4 ml-3">
          Servicii externe conectate la GROZ.
        </p>
        <div className="space-y-2">
          {[
            { name: "GitHub", status: "connected", note: "GROZ Org" },
            { name: "Codemagic", status: "connected", note: "iOS pipeline" },
            { name: "Notion", status: "disconnected", note: "—" },
            { name: "Figma", status: "disconnected", note: "—" },
            { name: "Slack", status: "disconnected", note: "—" },
          ].map((integration) => (
            <div
              key={integration.name}
              className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div>
                <div className="text-sm font-medium text-white/95">
                  {integration.name}
                </div>
                <div className="text-xs text-groz-muted">{integration.note}</div>
              </div>
              {integration.status === "connected" ? (
                <span className="badge border text-red-400 bg-red-500/10 border-red-500/30">
                  Connected
                </span>
              ) : (
                <button className="btn text-xs">Connect</button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="font-semibold text-sm text-white/95 mb-1 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-to-b from-red-500 to-red-900" />
          Team
        </h2>
        <p className="text-xs text-groz-muted mb-4 ml-3">
          Membrii GROZ care au acces la control panel.
        </p>
        <div className="space-y-2">
          {[
            {
              name: "Mihai",
              email: "normandcarie782@gmail.com",
              role: "Owner",
            },
            { name: "Colegul", email: "—", role: "Collaborator" },
          ].map((member) => (
            <div
              key={member.email}
              className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(127, 29, 29, 0.85))",
                  }}
                >
                  {member.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-white/95">
                    {member.name}
                  </div>
                  <div className="text-xs text-groz-muted">{member.email}</div>
                </div>
              </div>
              <span className="badge border text-white/70 bg-white/5 border-white/10">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button className="btn btn-primary">
          <Save className="w-4 h-4" />
          Save changes
        </button>
      </div>
    </div>
  );
}
