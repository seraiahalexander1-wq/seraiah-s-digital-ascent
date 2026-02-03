import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Image, Type, Link, FileText, Upload, Loader2, Code } from "lucide-react";
import { PortfolioContent, useUpdatePortfolioContent } from "@/hooks/usePortfolioContent";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "./RichTextEditor";

interface ContentEditorCardProps {
  content: PortfolioContent;
}

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  about: "About Section (Legacy - not displayed)",
  about_me: "About Me Section",
  brands: "Brand Carousel (Hidden)",
  pillars_header: "Strategic Pillars Header",
  knowledge_header: "Knowledge Hub Header",
  contact: "Contact Section",
  footer: "Footer",
  technical_skills: "Technical Skills Section",
  navigation: "Navigation / Header",
};

// Sections that have editable metadata with specific schemas
const metadataSchemas: Record<string, { label: string; description: string }> = {
  technical_skills: {
    label: "Skills Data (JSON)",
    description: "Edit skills array: [{name, tools, icon}]. Icons: sparkles, database, search, mail, file-text",
  },
  navigation: {
    label: "Navigation Data (JSON)",
    description: "Edit site_name and nav_links: [{href, label}]",
  },
  hero: {
    label: "Hero Metadata (JSON)",
    description: "Edit badge text, secondary CTA link and text",
  },
  brands: {
    label: "Brands Data (JSON)",
    description: "Edit brands array",
  },
  pillars_header: {
    label: "Header Metadata (JSON)",
    description: "Edit label text",
  },
  knowledge_header: {
    label: "Header Metadata (JSON)",
    description: "Edit label text",
  },
};

const ContentEditorCard = ({ content }: ContentEditorCardProps) => {
  const updateContent = useUpdatePortfolioContent();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [metadataError, setMetadataError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    headline: content.headline || "",
    body_text: content.body_text || "",
    image_url: content.image_url || "",
    cta_link: content.cta_link || "",
    cta_text: content.cta_text || "",
    metadata: JSON.stringify(content.metadata || {}, null, 2),
  });

  const [hasChanges, setHasChanges] = useState(false);

  const hasMetadataSchema = !!metadataSchemas[content.section_id];

  useEffect(() => {
    const metadataChanged = formData.metadata !== JSON.stringify(content.metadata || {}, null, 2);
    const changed = 
      formData.headline !== (content.headline || "") ||
      formData.body_text !== (content.body_text || "") ||
      formData.image_url !== (content.image_url || "") ||
      formData.cta_link !== (content.cta_link || "") ||
      formData.cta_text !== (content.cta_text || "") ||
      metadataChanged;
    
    setHasChanges(changed);
  }, [formData, content]);

  const validateMetadata = (value: string): boolean => {
    try {
      JSON.parse(value);
      setMetadataError(null);
      return true;
    } catch (e) {
      setMetadataError("Invalid JSON format");
      return false;
    }
  };

  const handleMetadataChange = (value: string) => {
    setFormData({ ...formData, metadata: value });
    validateMetadata(value);
  };

  const handleSave = async () => {
    // Validate metadata if it has a schema
    if (hasMetadataSchema && !validateMetadata(formData.metadata)) {
      toast({
        title: "Invalid JSON",
        description: "Please fix the metadata JSON before saving",
        variant: "destructive",
      });
      return;
    }

    let parsedMetadata = content.metadata;
    try {
      parsedMetadata = JSON.parse(formData.metadata);
    } catch (e) {
      // Keep original metadata if parsing fails
    }

    await updateContent.mutateAsync({
      id: content.id,
      headline: formData.headline || null,
      body_text: formData.body_text || null,
      image_url: formData.image_url || null,
      cta_link: formData.cta_link || null,
      cta_text: formData.cta_text || null,
      metadata: parsedMetadata,
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${content.section_id}-${Date.now()}.${fileExt}`;
      const filePath = `sections/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast({ title: "Image uploaded successfully!" });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
          disabled={!hasChanges || updateContent.isPending || !!metadataError}
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
          <RichTextEditor
            value={formData.body_text}
            onChange={(value) => setFormData({ ...formData, body_text: value })}
            placeholder="Enter body text..."
          />
        </div>

        {/* Metadata JSON Editor (only for sections with schemas) */}
        {hasMetadataSchema && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Code size={14} className="text-accent" />
              {metadataSchemas[content.section_id].label}
            </Label>
            <p className="text-xs text-muted-foreground">
              {metadataSchemas[content.section_id].description}
            </p>
            <Textarea
              value={formData.metadata}
              onChange={(e) => handleMetadataChange(e.target.value)}
              placeholder="{}"
              className={`bg-background border-border focus:border-accent font-mono text-sm min-h-[150px] ${
                metadataError ? 'border-red-500 focus:border-red-500' : ''
              }`}
            />
            {metadataError && (
              <p className="text-xs text-red-500">{metadataError}</p>
            )}
          </div>
        )}

        {/* Image URL / Upload */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Image size={14} className="text-accent" />
            Image
          </Label>
          <div className="flex gap-2">
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://... or upload an image"
              className="bg-background border-border focus:border-accent flex-1"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="gap-2 shrink-0"
            >
              {isUploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
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
