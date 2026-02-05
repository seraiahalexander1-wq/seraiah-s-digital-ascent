-- Drop existing restrictive policies for projects
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;

-- Create permissive policies that allow anyone to manage projects
CREATE POLICY "Anyone can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update projects" 
ON public.projects 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete projects" 
ON public.projects 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view all projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Drop the old "Anyone can view active projects" policy since we now have full access
DROP POLICY IF EXISTS "Anyone can view active projects" ON public.projects;

-- Same for articles
DROP POLICY IF EXISTS "Admins can insert articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can update articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can delete articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can view all articles" ON public.articles;

CREATE POLICY "Anyone can insert articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update articles" 
ON public.articles 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete articles" 
ON public.articles 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view all articles" 
ON public.articles 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Anyone can view active articles" ON public.articles;

-- Same for portfolio_content
DROP POLICY IF EXISTS "Admins can insert portfolio content" ON public.portfolio_content;
DROP POLICY IF EXISTS "Admins can update portfolio content" ON public.portfolio_content;
DROP POLICY IF EXISTS "Admins can delete portfolio content" ON public.portfolio_content;

CREATE POLICY "Anyone can insert portfolio content" 
ON public.portfolio_content 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update portfolio content" 
ON public.portfolio_content 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete portfolio content" 
ON public.portfolio_content 
FOR DELETE 
USING (true);