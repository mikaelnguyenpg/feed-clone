
# Feed Clone

## Usage

```bash
mkdir -p be fe

# --- FE ---
cd fe
npx create-next-app@latest
# pnpm create next-app@latest
npm run dev

# --- BE ---
cd be
cargo generate --git https://github.com/dangos-dev/AxumStarterTemplate.git
cargo run
```

```bash
# FE
# 1. Tạo Next.js project với TypeScript và App Router
pnpm create next-app@latest my-webapp --ts --app
cd my-webapp

# 2. Cài TailwindCSS
pnpm add -D tailwindcss postcss autoprefixer
# npx tailwindcss init -p
# pnpm exec tailwindcss init -p

# 3. Khởi tạo Shadcn UI
pnpm dlx shadcn@latest init --template next

# 4. Thêm các component cần thiết (ví dụ button, card, input)
pnpm dlx shadcn@latest add button card input

pnpm add next-themes
pnpm dlx shadcn@latest add dropdown-menu

```
