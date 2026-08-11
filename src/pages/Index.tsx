import { useState, useEffect } from "react";
import SilvaBarbearia from "@/components/SilvaBarbearia";
import AdminSchedules from "@/components/AdminSchedules";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Settings } from "lucide-react";

export default function Index() {
  const [session, setSession] = useState<any>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkAdmin(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkAdmin(session.user.id);
      else setIsAdmin(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data: hasRole } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin"
    });
    setIsAdmin(!!hasRole);
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectAllowed: true,
        redirectTo: window.location.origin
      }
    });
  };

  if (showAdmin && isAdmin) {
    return (
      <div className="min-h-screen bg-silva-black text-silva-white">
        <div className="p-4">
          <Button 
            variant="ghost" 
            onClick={() => setShowAdmin(false)}
            className="text-silva-white hover:text-silva-yellow"
          >
            ← Voltar para o Link Bio
          </Button>
        </div>
        <AdminSchedules />
      </div>
    );
  }

  return (
    <div className="relative">
      <SilvaBarbearia />
      
      {/* Botão discreto de login/admin no rodapé ou canto */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        {session ? (
          <>
            {isAdmin && (
              <Button
                size="icon"
                onClick={() => setShowAdmin(true)}
                className="rounded-full bg-silva-yellow/20 text-silva-yellow hover:bg-silva-yellow hover:text-silva-black"
                title="Editar Horários"
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              onClick={() => supabase.auth.signOut()}
              variant="ghost"
              className="rounded-full text-silva-white/20 hover:text-silva-white"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            size="icon"
            onClick={handleLogin}
            variant="ghost"
            className="rounded-full text-silva-white/5 hover:text-silva-white/20"
            title="Área Administrativa"
          >
            <LogIn className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
