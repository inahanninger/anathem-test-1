
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuotesPanelProps {
  onAddQuote: () => void;
}

const QuotesPanel = ({ onAddQuote }: QuotesPanelProps) => {
  const [quotes] = useState([
    {
      id: "1",
      text: "Client reports having nightmares and being afraid to leave the house since the incident.",
      source: "Support Worker Notes",
      date: "March 15, 2025"
    }
  ]);
  
  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="py-3 px-4 border-b bg-gray-50">
        <h3 className="text-sm font-medium">Quotes</h3>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {quotes.map(quote => (
          <div key={quote.id} className="border-b pb-3">
            <p className="text-xs italic mb-2">"{quote.text}"</p>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{quote.source}</span>
              <span>{quote.date}</span>
            </div>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-1"
          onClick={onAddQuote}
        >
          <PlusIcon className="h-3.5 w-3.5" />
          Add Quote
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuotesPanel;
