import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jcmafxkzorbyopxhklfr.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjbWFmeGt6b3JieW9weGhrbGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NzczMjQsImV4cCI6MjA4NDM1MzMyNH0.REGPj1ypjS3sHrW7tgdqxRYHiT1Tmi5h-P4mP2IRUeY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
