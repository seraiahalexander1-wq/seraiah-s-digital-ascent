import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Image, Type, Link, FileText, Upload, Loader2 } from "lucide-react";
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
};

const ContentEditorCard = ({ content }: ContentEditorCardProps) => {
  const updateContent = useUpdatePortfolioContent();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
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
          <RichTextEditor
            value={formData.body_text}
            onChange={(value) => setFormData({ ...formData, body_text: value })}
            placeholder="Enter body text..."
          />
        </div>

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
