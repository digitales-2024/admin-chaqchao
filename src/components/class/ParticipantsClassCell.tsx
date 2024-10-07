import { Users } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "../ui/badge";

interface ParticipantsCellProps {
  totalParticipants: number;
  newParticipantsCount: number;
}

const ParticipantsCell: React.FC<ParticipantsCellProps> = ({
  totalParticipants,
  newParticipantsCount,
}) => {
  const [showNewParticipants, setShowNewParticipants] = useState(
    newParticipantsCount > 0,
  );

  useEffect(() => {
    if (newParticipantsCount > 0) {
      setShowNewParticipants(true);
      const timer = setTimeout(() => setShowNewParticipants(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [newParticipantsCount]);

  return (
    <div className="flex min-w-40 items-center truncate">
      <Badge variant="secondary" className="relative flex items-center">
        <Users className="mr-1 h-4 w-4" />
        <span className="text-sm font-light">{totalParticipants}/8 </span>
        {showNewParticipants && (
          <span className="absolute left-full top-1 ml-2 animate-pulse text-xs font-thin text-emerald-500">
            +{newParticipantsCount}{" "}
            {newParticipantsCount === 1 ? "nuevo" : "nuevos"}
          </span>
        )}
      </Badge>
    </div>
  );
};

export default ParticipantsCell;
