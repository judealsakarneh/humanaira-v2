-- Profiles
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('buyer','freelancer','admin')) default 'buyer',
  name text,
  username text unique,
  avatar_url text,
  bio text,
  headline text,
  hourly_rate numeric,
  skills text[],
  country text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Services
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  freelancer_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  starting_price numeric not null,
  delivery_time_days integer not null,
  tags text[],
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists service_packages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  name text not null,
  price numeric not null,
  description text not null,
  delivery_time_days integer not null,
  revisions integer
);

-- Blog
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  tags text[],
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references profiles(id) on delete cascade,
  freelancer_id uuid references profiles(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  status text check (status in ('pending','paid','cancelled','completed')) default 'pending',
  amount numeric not null,
  currency text not null default 'usd',
  stripe_payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Payouts
create table if not exists payouts (
  id uuid primary key default gen_random_uuid(),
  freelancer_id uuid references profiles(id) on delete cascade,
  amount numeric not null,
  status text check (status in ('pending','processing','paid')) default 'pending',
  method text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Conversations mapping
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references profiles(id) on delete cascade,
  freelancer_id uuid references profiles(id) on delete cascade,
  twilio_conversation_sid text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Policies
alter table profiles enable row level security;
alter table services enable row level security;
alter table service_packages enable row level security;
alter table orders enable row level security;
alter table payouts enable row level security;
alter table conversations enable row level security;
alter table blog_posts enable row level security;

create policy "Public read profiles" on profiles for select using (true);
create policy "User manages own profile" on profiles for all using (auth.uid() = id);

create policy "Public services" on services for select using (true);
create policy "Freelancer manages own services" on services for all using (auth.uid() = freelancer_id);

create policy "Public packages" on service_packages for select using (true);
create policy "Freelancer manages own packages" on service_packages for all using (
  auth.uid() in (select freelancer_id from services where id = service_id)
);

create policy "Orders visible to participants" on orders for select using (
  auth.uid() = buyer_id or auth.uid() = freelancer_id
);
create policy "Insert orders buyer" on orders for insert with check (auth.uid() = buyer_id);
create policy "Update orders participants" on orders for update using (auth.uid() = buyer_id or auth.uid() = freelancer_id);

create policy "Payouts to freelancer" on payouts for select using (auth.uid() = freelancer_id);
create policy "Insert payout request" on payouts for insert with check (auth.uid() = freelancer_id);

create policy "Conversations view participants" on conversations for select using (
  auth.uid() = buyer_id or auth.uid() = freelancer_id
);
create policy "Insert conversations" on conversations for insert with check (auth.uid() = buyer_id or auth.uid() = freelancer_id);

create policy "Public blog select" on blog_posts for select using (published = true);

-- Profile bootstrap
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'role', 'buyer'), new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
