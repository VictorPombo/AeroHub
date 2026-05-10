"use client";

// ═══════════════════════════════════════════════════════
// AeroGest — Header Component
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { mockNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Bell, Menu, Plane, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { navItems, type MockRole } from "@/components/sidebar";

function getPageTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.includes("/aircraft")) return "Aeronaves";
  if (pathname.includes("/flights")) return "Diário de Bordo";
  if (pathname.includes("/maintenance")) return "Manutenção";
  if (pathname.includes("/schedule")) return "Agendamentos";
  if (pathname.includes("/profile")) return "Perfil";
  if (pathname.includes("/settings")) return "Configurações";
  if (pathname.includes("/commercial")) return "Vendas & Fretamento";
  if (pathname.includes("/coordination")) return "Coordenação";
  if (pathname.includes("/safety")) return "Segurança";
  if (pathname.includes("/pilot-profile")) return "Tripulação";
  return "AeroGest";
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeRole, setActiveRole] = useState<MockRole>("admin");
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(activeRole),
  );

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AG";

  return (
    <header className="sticky top-0 z-30 h-16 glass-strong border-b border-border/50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left: Mobile menu + Page title */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.06] transition-colors">
              <Menu className="w-5 h-5 text-muted-foreground" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 glass-strong border-r border-border/50 p-0"
              showCloseButton={false}
            >
              <SheetHeader className="h-16 flex items-center px-4 border-b border-border/50">
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-aero-cyan/10 border border-aero-cyan/20">
                    <Plane className="w-5 h-5 text-aero-cyan" />
                  </div>
                  <SheetTitle className="text-lg font-bold tracking-tight text-white">
                    Aero<span className="text-aero-cyan">Gest</span>
                  </SheetTitle>
                </div>
              </SheetHeader>

              {/* Role Switcher (Mock) */}
              <div className="px-3 py-3 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-2 px-1 font-semibold uppercase">
                  Simulador de Acesso
                </p>
                <select
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value as MockRole)}
                  className="w-full bg-black/20 border border-border/50 rounded-md text-xs py-2 px-2 outline-none text-aero-cyan focus:border-aero-cyan/50"
                >
                  <option value="admin">Administrador</option>
                  <option value="dov">DOV (Operações)</option>
                  <option value="pilot">Piloto</option>
                  <option value="mechanic">Mecânico / Oficina</option>
                  <option value="owner">Proprietário / Cotista</option>
                </select>
              </div>

              <nav className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                {filteredNavItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href));
                  return (
                    <SheetClose
                      key={item.href}
                      render={<Link href={item.href} />}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative",
                          isActive
                            ? "text-aero-cyan bg-aero-cyan/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-aero-cyan rounded-r-full" />
                        )}
                        <item.icon
                          className={cn(
                            "w-5 h-5 shrink-0",
                            isActive ? "text-aero-cyan" : "",
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-950/80 backdrop-blur-sm border-t border-border/50">
                <SheetClose
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-aero-rose hover:bg-aero-rose/10 transition-all duration-200 w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 shrink-0" />
                  <span>Sair</span>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          {/* Page title */}
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {getPageTitle(pathname)}
            </h1>
          </div>
        </div>

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu
            open={showNotifications}
            onOpenChange={setShowNotifications}
          >
            <DropdownMenuTrigger className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.06] transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-aero-rose text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse-glow">
                  {unreadCount}
                </span>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 glass-strong border-border/50"
            >
              <div className="px-3 py-2 border-b border-border/50">
                <p className="text-sm font-semibold">Notificações</p>
              </div>
              {mockNotifications.slice(0, 4).map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  className={cn(
                    "flex flex-col items-start gap-1 px-3 py-3 cursor-pointer",
                    !notif.read && "bg-aero-cyan/5",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {!notif.read && (
                      <div className="w-1.5 h-1.5 rounded-full bg-aero-cyan shrink-0" />
                    )}
                    <span className="text-sm font-medium text-foreground">
                      {notif.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-3.5 line-clamp-2">
                    {notif.body}
                  </p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="justify-center text-xs text-aero-cyan cursor-pointer">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              <Avatar className="w-8 h-8 border border-border/50">
                <AvatarFallback className="bg-aero-cyan/10 text-aero-cyan text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                {user?.full_name || "Usuário"}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 glass-strong border-border/50"
            >
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-foreground">
                  {user?.full_name}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem
                render={<Link href="/dashboard/profile" />}
                className="cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<Link href="/dashboard/settings" />}
                className="cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-aero-rose focus:text-aero-rose cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
