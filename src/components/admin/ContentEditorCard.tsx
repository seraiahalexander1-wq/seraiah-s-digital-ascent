import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Image, Type, Link, FileText } from "lucide-react";
import { PortfolioContent, useUpdatePortfolioContent } from "@/hooks/usePortfolioContent";

interface ContentEditorCardProps {
  content: PortfolioContent;
}

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  about: "About Section",
  brands: "Brand Carousel",
  pillars_header: "Strategic Pillars Header",
  knowledge_header: "Knowledge Hub Header",
  contact: "Contact Section",
  footer: "Footer",
};

const ContentEditorCard = ({ content }: ContentEditorCardProps) => {
  const updateContent = useUpdatePortfolioContent();
  
  const [formData, setFormData] = useState({
    headline: content.headline || "",
    body_text: content.body_text || "",
    image_url: content.image_url || "",
    cta_link: content.cta_link || "",
    cta_text: content.cta_text || "",
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = 
      formData.headline !== (content.headline || "") ||
      formData.body_text !== (content.body_text || "") ||
      formData.image_url !== (content.image_url || "") ||
      formData.cta_link !== (content.cta_link || "") ||
      formData.cta_text !== (content.cta_text || "");
    
    setHasChanges(changed);
  }, [formData, content]);

  const handleSave = async () => {
    await updateContent.mutateAsync({
      id: content.id,
      headline: formData.headline || null,
      body_text: formData.body_text || null,
      image_url: formData.image_url || null,
      cta_link: formData.cta_link || null,
      cta_text: formData.cta_text || null,
    });
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-organic transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-xl font-medium text-primary">
            {sectionLabels[content.section_id] || content.section_id}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            ID: {content.section_id}
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || updateContent.isPending}
          className={`gap-2 ${hasChanges ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
          variant={hasChanges ? "default" : "outline"}
        >
          <Save size={16} />
          {updateContent.isPending ? "Publishing..." : "Publish"}
        </Button>
      </div>

      <div className="grid gap-5">
        {/* Headline */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Type size={14} className="text-accent" />
            Headline
          </Label>
          <Input
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            placeholder="Enter headline..."
            className="bg-background border-border focus:border-accent"
          />
        </div>

        {/* Body Text */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <FileText size={14} className="text-accent" />
            Body Text
          </Label>
          <Textarea
            value={formData.body_text}
            onChange={(e) => setFormData({ ...formData, body_text: e.target.value })}
            placeholder="Enter body text..."
            rows={3}
            className="bg-background border-border focus:border-accent resize-none"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Image size={14} className="text-accent" />
            Image URL
          </Label>
          <Input
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://..."
            className="bg-background border-border focus:border-accent"
          />
          {formData.image_url && (
            <div 
              className="w-full h-24 rounded-lg bg-cover bg-center border border-border"
              style={{ backgroundImage: `url(${formData.image_url})` }}
            />
          )}
        </div>

        {/* CTA Fields - Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Link size={14} className="text-accent" />
              CTA Link
            </Label>
            <Input
              value={formData.cta_link}
              onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
              placeholder="#section or https://..."
              className="bg-background border-border focus:border-accent"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">CTA Text</Label>
            <Input
              value={formData.cta_text}
              onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
              placeholder="Button text..."
              className="bg-background border-border focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Change Indicator */}
      {hasChanges && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-accent font-medium">• Unsaved changes</p>
        </div>
      )}
    </div>
  );
};

export default ContentEditorCard;
