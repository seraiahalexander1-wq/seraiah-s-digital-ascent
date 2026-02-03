import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Project, ProjectInput, useCreateProject, useUpdateProject, CONTENT_CATEGORIES } from "@/hooks/useProjects";
import type { Database } from "@/integrations/supabase/types";

type ContentCategory = Database["public"]["Enums"]["content_category"];

interface ProjectFormProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectForm = ({ project, onClose }: ProjectFormProps) => {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const isEditing = !!project;

  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image_url: project?.image_url || "",
    category: project?.category || ("Audience & Revenue Growth" as ContentCategory),
    link: project?.link || "",
    metric: project?.metric || "",
    metric_label: project?.metric_label || "",
    highlights: project?.highlights?.join("\n") || "",
    tech_stack: project?.tech_stack?.join(", ") || "",
    size: project?.size || "medium",
    display_order: project?.display_order || 0,
    is_active: project?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData: ProjectInput = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url,
      category: formData.category,
      link: formData.link || null,
      metric: formData.metric || null,
      metric_label: formData.metric_label || null,
      highlights: formData.highlights.split("\n").filter(h => h.trim()),
      tech_stack: formData.tech_stack.split(",").map(t => t.trim()).filter(Boolean),
      size: formData.size,
      display_order: formData.display_order,
      is_active: formData.is_active,
    };

    if (isEditing) {
      await updateProject.mutateAsync({ id: project.id, ...projectData });
    } else {
      await createProject.mutateAsync(projectData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-medium text-primary">
            {isEditing ? "Edit Project" : "New Project"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g. Audience & Revenue Growth"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={2}
                placeholder="Brief description of this project"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="image_url">Image URL *</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                placeholder="https://..."
              />
              {formData.image_url && (
                <div 
                  className="w-full h-32 rounded-lg bg-cover bg-center border border-border"
                  style={{ backgroundImage: `url(${formData.image_url})` }}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value: ContentCategory) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Card Size</Label>
              <Select 
                value={formData.size} 
                onValueChange={(value) => setFormData({ ...formData, size: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="large">Large (2 columns)</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metric">Metric</Label>
              <Input
                id="metric"
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                placeholder="e.g. 10x"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metric_label">Metric Label</Label>
              <Input
                id="metric_label"
                value={formData.metric_label}
                onChange={(e) => setFormData({ ...formData, metric_label: e.target.value })}
                placeholder="e.g. ROI"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="highlights">Key Highlights (one per line)</Label>
              <Textarea
                id="highlights"
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                rows={3}
                placeholder="0 → 22k subscribers organically&#10;$148k revenue generated&#10;10x ROI on campaigns"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="tech_stack">Tech Stack (comma separated)</Label>
              <Input
                id="tech_stack"
                value={formData.tech_stack}
                onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                placeholder="React, Supabase, Cursor, Gemini"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link URL</Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="col-span-2 flex items-center justify-between py-2">
              <div>
                <Label htmlFor="is_active">Active</Label>
                <p className="text-sm text-muted-foreground">Show this project on the public site</p>
              </div>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary text-primary-foreground"
              disabled={createProject.isPending || updateProject.isPending}
            >
              {createProject.isPending || updateProject.isPending ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
