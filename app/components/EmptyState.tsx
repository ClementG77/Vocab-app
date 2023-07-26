'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import useAddwordModal from "../hooks/useAddwordModal";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  showReset
}) => {
  const router = useRouter();
  const addwordsmodal = useAddwordModal();

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
      {showReset && (
          <Button
            outline
            label="Add some words to your list"
            onClick={addwordsmodal.onOpen}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;