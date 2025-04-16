
import React from "react";
interface FileUploadSectionProps {
  /**
   * The title of the file upload section
   */
  title: string;

  /**
   * Description text for the file upload section
   */
  description?: string;

  /**
   * Section identifier
   */
  section?: string;

  /**
   * Whether the file upload is required
   * @default false
   */
  required?: boolean;

  /**
   * Children elements to render inside the file upload section
   */
  children: React.ReactNode;

  /**
   * Optional CSS class name to apply to the component
   */
  className?: string;
}

/**
 * A reusable file upload section component that displays a title,
 * optional required indicator, and contains file upload elements.
 */
const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  title,
  description,
  section,
  required = false,
  children,
  className
}) => {
  return <div className={`mb-8 ${className || ""}`} id={section}>
      <h2 className="text-lg font-semibold mb-4">
        {title} {required && <span className="text-red-500">*</span>}
      </h2>
      {description && (
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </div>;
};
export default FileUploadSection;
