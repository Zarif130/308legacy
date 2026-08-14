# 308 Legacy — সেটআপ গাইড

## ধাপ ১: Supabase (ফ্রি ডেটাবেজ) বানাও
1. https://supabase.com এ যাও, GitHub দিয়ে সাইনআপ করো (ফ্রি)
2. "New Project" ক্লিক করো, নাম দাও `308legacy`, পাসওয়ার্ড সেট করো, রিজিয়ন দাও (Singapore closest)
3. প্রজেক্ট তৈরি হলে বাম পাশে **SQL Editor** এ যাও, নিচের কোড পেস্ট করে Run করো:

```sql
create table entries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  dept text not null,
  years text not null,
  facebook text,
  phone text,
  created_at timestamp default now()
);

alter table entries enable row level security;

create policy "Public read" on entries for select using (true);
create policy "Public insert" on entries for insert with check (true);
```

4. বাম পাশে **Settings > API** এ যাও, দুইটা জিনিস কপি করে রাখো:
   - **Project URL** (যেমন `https://xxxx.supabase.co`)
   - **anon public key** (লম্বা একটা key)

## ধাপ ২: কোড GitHub এ আপলোড করো
1. github.com এ গিয়ে "New repository" — নাম দাও `308legacy`
2. এই ফোল্ডারের সব ফাইল (`public/`, `api/`, `package.json`) আপলোড করো (GitHub এর "Add file > Upload files" দিয়ে সহজে করা যায়)

## ধাপ ৩: Vercel এ ডিপ্লয় করো
1. vercel.com এ গিয়ে "Add New > Project"
2. তোমার `308legacy` GitHub repo সিলেক্ট করো, Import করো
3. Deploy করার আগে **Environment Variables** সেকশনে দুইটা যোগ করো:
   - `SUPABASE_URL` = তোমার Project URL
   - `SUPABASE_ANON_KEY` = তোমার anon key
4. **Deploy** ক্লিক করো

## ব্যাস, রেডি!
তোমার সাইট পাবা: `308legacy.vercel.app` (বা Vercel যা দেয়)
এই লিংক শেয়ার করলেই সবাই ফর্ম ফিলাপ করতে পারবে, লিস্ট দেখতে পারবে — কোনো লগইন লাগবে না।
