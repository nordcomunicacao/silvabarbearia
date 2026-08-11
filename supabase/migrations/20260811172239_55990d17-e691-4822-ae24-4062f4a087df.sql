-- 1. Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- 3. Grant access
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- 4. Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    from public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 6. Create schedules table
CREATE TABLE public.schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_index INTEGER NOT NULL CHECK (day_index >= 0 AND day_index <= 6),
    open_minutes INTEGER, -- NULL means closed
    close_minutes INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Grant access to schedules
GRANT SELECT ON public.schedules TO authenticated;
GRANT SELECT ON public.schedules TO anon;
GRANT ALL ON public.schedules TO authenticated;
GRANT ALL ON public.schedules TO service_role;

-- 8. Enable RLS on schedules
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

-- 9. Create policies for schedules
CREATE POLICY "Anyone can read schedules" ON public.schedules
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage schedules" ON public.schedules
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- 10. Seed initial data
INSERT INTO public.schedules (day_index, open_minutes, close_minutes) VALUES
(0, NULL, NULL),
(1, 540, 1140),
(2, 540, 1140),
(3, 540, 1200),
(4, 540, 1200),
(5, 540, 1200),
(6, 480, 960);
