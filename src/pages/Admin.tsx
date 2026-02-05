import { useState } from "react";
import { useProjects, useDeleteProject, Project } from "@/hooks/useProjects";
import { useArticles, useDeleteArticle, Article } from "@/hooks/useArticles";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2, EyeOff, Layout, FileText, Briefcase } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";
import ArticleForm from "@/components/admin/ArticleForm";
import ContentEditorCard from "@/components/admin/ContentEditorCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Admin = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects(false);
  const { data: articles, isLoading: articlesLoading } = useArticles(false);
  const { data: portfolioContent, isLoading: contentLoading } = usePortfolioContent();
  const deleteProject = useDeleteProject();
  const deleteArticle = useDeleteArticle();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "project" | "article"; id: string } | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteConfirm) return;
    
    if (deleteConfirm.type === "project") {
      deleteProject.mutate(deleteConfirm.id);
    } else {
      deleteArticle.mutate(deleteConfirm.id);
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-serif text-xl font-medium text-primary">
              Seraiah Alexander
            </a>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-accent font-medium">Admin Hub</span>
          </div>
          <a href="/" target="_blank" className="text-sm text-accent hover:underline">
            View Site →
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-semibold text-primary mb-2">Content Manager</h1>
          <p className="text-muted-foreground">Edit your portfolio content. Changes sync live to your public site.</p>
        </div>

        <Tabs defaultValue="content" className="space-y-8">
          <TabsList className="bg-secondary">
            <TabsTrigger value="content" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Layout size={16} />
              Site Content
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Briefcase size={16} />
              Projects ({projects?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="articles" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText size={16} />
              Articles ({articles?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Site Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl font-medium text-primary">Site Sections</h2>
                <p className="text-sm text-muted-foreground mt-1">Edit headlines, text, and images for each section</p>
              </div>
            </div>

            {contentLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading content...</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioContent?.map((content) => (
                  <ContentEditorCard key={content.id} content={content} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-2xl font-medium text-primary">Strategic Pillars</h2>
              <Button 
                onClick={() => { setEditingProject(null); setShowProjectForm(true); }} 
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Plus size={18} />
                Add Project
              </Button>
            </div>

            {projectsLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading projects...</div>
            ) : projects?.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <p className="text-muted-foreground mb-4">No projects yet. Create your first one!</p>
                <Button onClick={() => setShowProjectForm(true)} className="gap-2">
                  <Plus size={18} />
                  Add Project
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {projects?.map((project) => (
                  <div 
                    key={project.id}
                    className="bg-card rounded-xl border border-border p-6 flex items-center gap-6 hover:shadow-organic transition-shadow"
                  >
                    <div 
                      className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${project.image_url})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-lg font-medium text-primary truncate">{project.title}</h3>
                        {!project.is_active && (
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                            <EyeOff size={12} />
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">{project.category}</span>
                        <span className="text-xs text-muted-foreground">Size: {project.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => { setEditingProject(project); setShowProjectForm(true); }}
                        className="gap-1"
                      >
                        <Edit2 size={14} />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setDeleteConfirm({ type: "project", id: project.id })}
                        className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-2xl font-medium text-primary">Knowledge Hub</h2>
              <Button 
                onClick={() => { setEditingArticle(null); setShowArticleForm(true); }} 
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Plus size={18} />
                Add Article
              </Button>
            </div>

            {articlesLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading articles...</div>
            ) : articles?.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <p className="text-muted-foreground mb-4">No articles yet. Create your first one!</p>
                <Button onClick={() => setShowArticleForm(true)} className="gap-2">
                  <Plus size={18} />
                  Add Article
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {articles?.map((article) => (
                  <div 
                    key={article.id}
                    className="bg-card rounded-xl border border-border p-6 flex items-center gap-6 hover:shadow-organic transition-shadow"
                  >
                    <div 
                      className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${article.image_url})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-lg font-medium text-primary truncate">{article.title}</h3>
                        {!article.is_active && (
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                            <EyeOff size={12} />
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{article.summary}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {article.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => { setEditingArticle(article); setShowArticleForm(true); }}
                        className="gap-1"
                      >
                        <Edit2 size={14} />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setDeleteConfirm({ type: "article", id: article.id })}
                        className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectForm 
          project={editingProject}
          onClose={() => { setShowProjectForm(false); setEditingProject(null); }}
        />
      )}

      {/* Article Form Modal */}
      {showArticleForm && (
        <ArticleForm 
          article={editingArticle}
          onClose={() => { setShowArticleForm(false); setEditingArticle(null); }}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this {deleteConfirm?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
