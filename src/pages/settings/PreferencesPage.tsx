import React, { useState } from 'react';
import SettingsLayout from '@/components/settings/SettingsLayout';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
const PreferencesPage = () => {
  const {
    toast
  } = useToast();
  const [preferences, setPreferences] = useState({
    languageStyle: 'professional',
    summaryStructure: 'comprehensive',
    defaultVoice: 'male',
    subject: 'Patient'
  });
  const handleChange = (name: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    toast({
      title: "Preferences updated",
      description: "Your default preferences have been saved"
    });
  };
  return <SettingsLayout title="Default Preferences">
      <form onSubmit={handleSubmit} className="animate-fade-in">
        <div className="space-y-6">
          <div className="space-y-4 section-container">
            <h2 className="section-header">Language Style</h2>
            <p className="text-sm text-muted-foreground">Select your preferred language tone for reports and documents</p>
            
            <RadioGroup defaultValue={preferences.languageStyle} onValueChange={value => handleChange('languageStyle', value)} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center space-x-2 bg-clinical-neutral border border-clinical-border rounded-md p-4 cursor-pointer hover:bg-clinical-blue-light/50">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional" className="cursor-pointer">Professional</Label>
              </div>
              <div className="flex items-center space-x-2 bg-clinical-neutral border border-clinical-border rounded-md p-4 cursor-pointer hover:bg-clinical-blue-light/50">
                <RadioGroupItem value="academic" id="academic" />
                <Label htmlFor="academic" className="cursor-pointer">Academic</Label>
              </div>
              <div className="flex items-center space-x-2 bg-clinical-neutral border border-clinical-border rounded-md p-4 cursor-pointer hover:bg-clinical-blue-light/50">
                <RadioGroupItem value="simplified" id="simplified" />
                <Label htmlFor="simplified" className="cursor-pointer">Simplified</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="bg-clinical-border" />

          <div className="space-y-4 section-container">
            <h2 className="section-header">Default Summary Structure</h2>
            <p className="text-sm text-muted-foreground">Choose how you want your clinical summaries structured</p>
            
            <Select defaultValue={preferences.summaryStructure} onValueChange={value => handleChange('summaryStructure', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">Comprehensive (all details)</SelectItem>
                <SelectItem value="concise">Concise (key findings only)</SelectItem>
                <SelectItem value="bulletPoints">Bullet Points</SelectItem>
                <SelectItem value="narrative">Narrative Style</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-clinical-border" />

          <div className="space-y-4 section-container">
            <h2 className="section-header">Default Voice</h2>
            <p className="text-sm text-muted-foreground">Select the default voice for text-to-speech features</p>
            
            <RadioGroup defaultValue={preferences.defaultVoice} onValueChange={value => handleChange('defaultVoice', value)} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center space-x-2 bg-clinical-neutral border border-clinical-border rounded-md p-4 cursor-pointer hover:bg-clinical-blue-light/50">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">Male Voice</Label>
              </div>
              <div className="flex items-center space-x-2 bg-clinical-neutral border border-clinical-border rounded-md p-4 cursor-pointer hover:bg-clinical-blue-light/50">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">Female Voice</Label>
              </div>
              <div className="flex items-center space-x-2 bg-clinical-neutral border border-clinical-border rounded-md p-4 cursor-pointer hover:bg-clinical-blue-light/50">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral" className="cursor-pointer">Neutral Voice</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="bg-clinical-border" />

          <div className="space-y-4 section-container">
            <h2 className="section-header">Default Subject</h2>
            <p className="text-sm text-muted-foreground">Choose your preferred term for referring to patients in reports</p>
            
            <div>
              <Label htmlFor="subject" className="input-label">Subject Term</Label>
              <Input id="subject" value={preferences.subject} onChange={e => handleChange('subject', e.target.value)} placeholder="e.g. Patient, Client, Individual" className="max-w-xs mt-1" />
              <p className="text-xs text-gray-500 mt-1">This term will be used throughout reports when referring to the person being assessed</p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">Reset to Defaults</Button>
            <Button type="submit" className="text-inherit bg-inherit">
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </div>
      </form>
    </SettingsLayout>;
};
export default PreferencesPage;