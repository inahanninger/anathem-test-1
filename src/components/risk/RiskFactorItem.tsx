
import { PlusIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskFactor, RiskSubItem } from "@/types/risk";

interface RiskFactorItemProps {
  factor: RiskFactor;
  onAddQuote: () => void;
}

const RiskFactorItem = ({ factor, onAddQuote }: RiskFactorItemProps) => {
  if (!factor.items) return null;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'red': return 'bg-red-500';
      case 'amber': return 'bg-amber-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${getStatusColor(factor.status)}`}></div>
        <h2 className="font-medium">{factor.name}</h2>
        <span className="text-sm text-muted-foreground ml-auto">
          {factor.completed} of {factor.total}
        </span>
        <Button variant="ghost" size="sm" className="p-1 h-auto">
          <ChevronUpIcon className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {factor.items.map((item, index) => (
          <div key={item.id} className="border rounded-md overflow-hidden">
            <div className="flex items-start p-4">
              <div className={`h-2 w-2 rounded-full ${factor.status === 'amber' ? 'bg-amber-500' : 'bg-gray-500'} mt-1.5 mr-2`}></div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="gap-1 text-xs h-8"
                onClick={onAddQuote}
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Add Quote
              </Button>
              
              {item.quotes && (
                <div className="flex items-center h-8 px-2 rounded-md bg-gray-100 text-xs ml-2">
                  ({item.quotes})
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskFactorItem;
