"use client";

import {
  Activity,
  CheckCircle2,
  Globe,
  Database,
  Shield,
  Mail,
  Server,
  Cpu,
} from "lucide-react";

const services = [
  {
    name: "Operavax Hub",
    description: "Main platform and dashboard",
    icon: Globe,
    status: "Operational",
    uptime: "99.99%",
  },
  {
    name: "API Gateway",
    description: "REST & GraphQL endpoints",
    icon: Server,
    status: "Operational",
    uptime: "99.98%",
  },
  {
    name: "Database Cluster",
    description: "Primary and replica databases",
    icon: Database,
    status: "Operational",
    uptime: "99.99%",
  },
  {
    name: "Authentication",
    description: "Login, SSO, and session management",
    icon: Shield,
    status: "Operational",
    uptime: "100%",
  },
  {
    name: "Email Service",
    description: "Transactional and notification emails",
    icon: Mail,
    status: "Operational",
    uptime: "99.95%",
  },
  {
    name: "Background Workers",
    description: "Job queues and scheduled tasks",
    icon: Cpu,
    status: "Operational",
    uptime: "99.97%",
  },
];

export default function StatusPage() {
  return (
    <div className="px-3 md:px-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6F4EA]">
            <Activity className="h-5 w-5 text-[#0F9D58]" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#222]">
              System Status
            </h1>
            <p className="text-sm text-[#6a6a6a]">
              Monitor the health of all platform services
            </p>
          </div>
        </div>
      </div>

      {/* Overall status banner */}
      <div className="mb-6 rounded-xl md:rounded-2xl border border-[#0F9D58]/20 bg-[#E6F4EA] p-4 md:p-5">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-[#0F9D58]" />
          <div>
            <p className="font-display text-base font-bold tracking-tight text-[#0F9D58]">
              All Systems Operational
            </p>
            <p className="text-sm text-[#0F9D58]/80">
              All {services.length} services are running normally
            </p>
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="rounded-xl md:rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
        {services.map((service, i) => (
          <div
            key={service.name}
            className={`flex items-center gap-3 md:gap-4 px-4 py-3.5 md:px-5 md:py-4 ${
              i < services.length - 1 ? "border-b border-[#f0f0f0]" : ""
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F4EA]">
              <service.icon className="h-5 w-5 text-[#0F9D58]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold tracking-tight text-[#222]">
                {service.name}
              </p>
              <p className="text-xs text-[#6a6a6a]">{service.description}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:block text-xs text-[#6a6a6a]">
                Uptime: <span className="font-semibold text-[#222]">{service.uptime}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F4EA] px-2.5 py-0.5 text-[11px] font-semibold text-[#0F9D58]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F9D58]" />
                {service.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Last checked */}
      <p className="mt-4 text-center text-xs text-[#6a6a6a]">
        Last checked: just now
      </p>
    </div>
  );
}
