import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type ContentCategory = Database["public"]["Enums"]["content_category"];

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: ContentCategory;
  link: string | null;
  metric: string | null;
  metric_label: string | null;
  highlights: string[];
  tech_stack: string[];
  size: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  image_url: string;
  category: ContentCategory;
  link?: string | null;
  metric?: string | null;
  metric_label?: string | null;
  highlights?: string[];
  tech_stack?: string[];
  size?: string;
  display_order?: number;
  is_active?: boolean;
}

export const useProjects = (activeOnly = true) => {
  return useQuery({
    queryKey: ["projects", activeOnly],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (project: ProjectInput) => {
      const { data, error } = await supabase
        .from("projects")
        .insert([project])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Project created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating project", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<ProjectInput>) => {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Project updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Project deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting project", description: error.message, variant: "destructive" });
    },
  });
};

export const CONTENT_CATEGORIES: ContentCategory[] = [
  "Metabolic Health",
  "Education Strategy",
  "SEO & Growth",
  "Compliance",
  "Audience & Revenue Growth",
  "Strategic Communications",
  "Product Strategy & AI Workflows"
];
