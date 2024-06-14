import { createClient } from "@supabase/supabase-js";

const link = 'https://twlwhefuowwzygukqbxj.supabase.co'
const chave = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3bHdoZWZ1b3d3enlndWtxYnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzOTk3NDksImV4cCI6MjAzMzk3NTc0OX0.URZiObEmsalLSPslpGzEiUT8CRLjiahwvEj468xFnsY'

export const supabase = createClient(link, chave)
