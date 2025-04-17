
import { useState } from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ButtonState = "verify" | "loading" | "download";

const ReportActionButton = () => {
  const [buttonState, setButtonState] = useState<ButtonState>("verify");

  const handleClick = () => {
    if (buttonState === "verify") {
      setButtonState("loading");
      // Simulate processing time
      setTimeout(() => {
        setButtonState("download");
      }, 2000);
    } else if (buttonState === "download") {
      // Handle document download logic
      console.log("Downloading document...");
      // After download is complete, you might want to reset the button or redirect
    }
  };

  const renderButton = () => {
    switch (buttonState) {
      case "verify":
        return (
          <Button 
            onClick={handleClick}
            className="text-sm bg-emerald-400 text-neutral-900 hover:bg-emerald-300"
          >
            <Check className="mr-2 h-4 w-4" />
            Information Correct
          </Button>
        );
      case "loading":
        return (
          <Button 
            disabled
            className="text-sm bg-gray-400 text-white hover:bg-gray-400"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </Button>
        );
      case "download":
        return (
          <Button 
            onClick={handleClick}
            className="text-sm bg-emerald-800 text-white hover:bg-emerald-700"
          >
            Download Documents
            <Download className="ml-2 h-4 w-4" />
          </Button>
        );
      default:
        return null;
    }
  };

  return renderButton();
};

export default ReportActionButton;
