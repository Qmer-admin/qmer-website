// src/app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth" // auth.ts dosyamızdan import ediyoruz

export const { GET, POST } = handlers