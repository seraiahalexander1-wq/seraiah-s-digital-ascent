-- Create portfolio_content table for managing all site sections
CREATE TABLE public.portfolio_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id TEXT NOT NULL UNIQUE,
  headline TEXT,
  body_text TEXT,
  image_url TEXT,
  cta_link TEXT,
  cta_text TEXT,
  metadata JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read content (public site)
CREATE POLICY "Anyone can view portfolio content"
ON public.portfolio_content FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can insert portfolio content"
ON public.portfolio_content FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update portfolio content"
ON public.portfolio_content FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete portfolio content"
ON public.portfolio_content FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_portfolio_content_updated_at
BEFORE UPDATE ON public.portfolio_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_content;