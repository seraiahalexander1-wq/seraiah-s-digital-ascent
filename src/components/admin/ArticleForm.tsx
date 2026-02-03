import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Article, ArticleInput, useCreateArticle, useUpdateArticle, ARTICLE_CATEGORIES } from "@/hooks/useArticles";
import type { Database } from "@/integrations/supabase/types";

type ContentCategory = Database["public"]["Enums"]["content_category"];

interface ArticleFormProps {
  article: Article | null;
  onClose: () => void;
}

const ArticleForm = ({ article, onClose }: ArticleFormProps) => {
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const isEditing = !!article;

  const [formData, setFormData] = useState({
    title: article?.title || "",
    summary: article?.summary || "",
    image_url: article?.image_url || "",
    tags: article?.tags || ([] as ContentCategory[]),
    article_url: article?.article_url || "",
    read_time: article?.read_time || "5 min read",
    display_order: article?.display_order || 0,
    is_active: article?.is_active ?? true,
  });

  const handleTagToggle = (tag: ContentCategory) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const articleData: ArticleInput = {
      title: formData.title,
      summary: formData.summary,
      image_url: formData.image_url,
      tags: formData.tags,
      article_url: formData.article_url || null,
      read_time: formData.read_time,
      display_order: formData.display_order,
      is_active: formData.is_active,
    };

    if (isEditing) {
      await updateArticle.mutateAsync({ id: article.id, ...articleData });
    } else {
      await createArticle.mutateAsync(articleData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-medium text-primary">
            {isEditing ? "Edit Article" : "New Article"}
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
                placeholder="e.g. The Science of Metabolic Flexibility"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                required
                rows={3}
                placeholder="Brief summary of this article"
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

            <div className="col-span-2 space-y-3">
              <Label>Tags *</Label>
              <div className="flex flex-wrap gap-3">
                {ARTICLE_CATEGORIES.map((tag) => (
                  <label
                    key={tag}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all ${
                      formData.tags.includes(tag)
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-card border-border hover:border-accent/50"
                    }`}
                  >
                    <Checkbox
                      checked={formData.tags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                      className="hidden"
                    />
                    <span className="text-sm font-medium">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="article_url">Article URL</Label>
              <Input
                id="article_url"
                type="url"
                value={formData.article_url}
                onChange={(e) => setFormData({ ...formData, article_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="read_time">Read Time</Label>
              <Input
                id="read_time"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                placeholder="5 min read"
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

            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="is_active">Active</Label>
                <p className="text-sm text-muted-foreground">Show on public site</p>
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
              disabled={createArticle.isPending || updateArticle.isPending || formData.tags.length === 0}
            >
              {createArticle.isPending || updateArticle.isPending ? "Saving..." : isEditing ? "Update Article" : "Create Article"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;
