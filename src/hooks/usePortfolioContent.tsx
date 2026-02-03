import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PortfolioContent {
  id: string;
  section_id: string;
  headline: string | null;
  body_text: string | null;
  image_url: string | null;
  cta_link: string | null;
  cta_text: string | null;
  metadata: Record<string, any>;
  updated_at: string;
  created_at: string;
}

export const usePortfolioContent = () => {
  const queryClient = useQueryClient();

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('portfolio_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_content'
        },
        () => {
          // Invalidate and refetch when data changes
          queryClient.invalidateQueries({ queryKey: ["portfolio_content"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["portfolio_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_content")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      return data as PortfolioContent[];
    },
  });
};

export const usePortfolioSection = (sectionId: string) => {
  const { data: allContent, isLoading } = usePortfolioContent();
  
  const section = allContent?.find(item => item.section_id === sectionId);
  
  return { data: section, isLoading };
};

export const useUpdatePortfolioContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PortfolioContent> & { id: string }) => {
      const { data, error } = await supabase
        .from("portfolio_content")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_content"] });
      toast({ title: "Content published successfully!" });
    },
    onError: (error: Error) => {
      toast({ title: "Error saving content", description: error.message, variant: "destructive" });
    },
  });
};

export const useCreatePortfolioContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (content: Omit<PortfolioContent, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("portfolio_content")
        .insert([content])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_content"] });
      toast({ title: "Section created successfully!" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating section", description: error.message, variant: "destructive" });
    },
  });
};
