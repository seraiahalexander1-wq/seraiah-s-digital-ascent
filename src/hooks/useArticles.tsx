import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type ContentCategory = Database["public"]["Enums"]["content_category"];

export interface Article {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  tags: ContentCategory[];
  article_url: string | null;
  read_time: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleInput {
  title: string;
  summary: string;
  image_url: string;
  tags?: ContentCategory[];
  article_url?: string | null;
  read_time?: string;
  display_order?: number;
  is_active?: boolean;
}

export const useArticles = (activeOnly = true) => {
  return useQuery({
    queryKey: ["articles", activeOnly],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Article[];
    },
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (article: ArticleInput) => {
      const { data, error } = await supabase
        .from("articles")
        .insert([article])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Article created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating article", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<ArticleInput>) => {
      const { data, error } = await supabase
        .from("articles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Article updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating article", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Article deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting article", description: error.message, variant: "destructive" });
    },
  });
};

export const ARTICLE_CATEGORIES: ContentCategory[] = [
  "Metabolic Health",
  "Education Strategy",
  "SEO & Growth",
  "Compliance"
];
