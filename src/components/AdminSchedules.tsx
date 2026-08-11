import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save, X, Plus, Trash2 } from "lucide-react";

const DIAS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const fmt = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

const parseToMinutes = (timeStr: string) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

export default function AdminSchedules() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
    fetchSchedules();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: hasRole } = await supabase.rpc("has_role", {
      _user_id: user.id,
      _role: "admin"
    });
    
    setIsAdmin(!!hasRole);
  };

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from("schedules")
        .select("*")
        .order("day_index", { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar horários: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleClosed = (index: number) => {
    const newSchedules = [...schedules];
    if (newSchedules[index].open_minutes === null) {
      newSchedules[index].open_minutes = 540; // 09:00
      newSchedules[index].close_minutes = 1140; // 19:00
    } else {
      newSchedules[index].open_minutes = null;
      newSchedules[index].close_minutes = null;
    }
    setSchedules(newSchedules);
  };

  const handleTimeChange = (index: number, field: "open_minutes" | "close_minutes", value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = parseToMinutes(value);
    setSchedules(newSchedules);
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const item of schedules) {
        const { error } = await supabase
          .from("schedules")
          .update({
            open_minutes: item.open_minutes,
            close_minutes: item.close_minutes,
            updated_at: new Date().toISOString()
          })
          .eq("id", item.id);
        
        if (error) throw error;
      }
      toast.success("Horários atualizados com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao salvar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isAdmin && !loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-silva-white">Acesso Restrito</h2>
        <p className="mt-2 text-silva-white/60">Você não tem permissão para editar os horários.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-silva-yellow" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 p-4 sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-kamerik text-2xl font-bold uppercase tracking-wider text-silva-yellow">
          Editar Horários
        </h2>
        <Button 
          onClick={saveAll} 
          disabled={saving}
          className="rounded-full bg-silva-yellow font-bold text-silva-black hover:bg-silva-yellow/80"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Salvar Tudo
        </Button>
      </div>

      <div className="space-y-4 rounded-2xl border border-silva-white/10 bg-silva-white/5 p-6 backdrop-blur-md">
        {schedules.map((item, idx) => (
          <div key={item.id} className="flex flex-col gap-4 border-b border-silva-white/5 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Label className="w-28 font-kamerik text-sm font-bold text-silva-white">
                {DIAS[item.day_index]}
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleClosed(idx)}
                className={`h-8 rounded-full border-silva-yellow/40 text-[10px] uppercase tracking-tighter hover:bg-silva-yellow hover:text-silva-black ${
                  item.open_minutes === null ? "bg-silva-yellow text-silva-black" : "text-silva-white/60"
                }`}
              >
                {item.open_minutes === null ? "Fechado" : "Aberto"}
              </Button>
            </div>

            {item.open_minutes !== null && (
              <div className="flex items-center gap-2">
                <Input
                  type="time"
                  value={fmt(item.open_minutes)}
                  onChange={(e) => handleTimeChange(idx, "open_minutes", e.target.value)}
                  className="h-9 w-24 border-silva-white/10 bg-silva-white/5 text-silva-white focus-visible:ring-silva-yellow"
                />
                <span className="text-silva-white/40">até</span>
                <Input
                  type="time"
                  value={fmt(item.close_minutes)}
                  onChange={(e) => handleTimeChange(idx, "close_minutes", e.target.value)}
                  className="h-9 w-24 border-silva-white/10 bg-silva-white/5 text-silva-white focus-visible:ring-silva-yellow"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
