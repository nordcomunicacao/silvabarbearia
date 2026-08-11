INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users
WHERE email IS NOT NULL; -- Promotes all existing users to admin for setup
