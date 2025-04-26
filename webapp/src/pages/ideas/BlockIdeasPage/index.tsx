import { getViewIdeaRoute } from "../../../lib/routes"

import { Link } from "react-router"

import { Segment } from "../../../components/Segment"

import { blockIdeaArr } from "../ViewideaPage"
import { useEffect, useState } from "react";
import { TrpcRouteOutput } from "@app/backend/src/router";

export const BlockedIdeasList = () => {
  const [blockedIdeas, setBlockedIdeas] = useState<NonNullable<TrpcRouteOutput["getIdea"]["idea"]>[]>([]);
  
  useEffect(() => {
    // Load blocked ideas when component mounts
    setBlockedIdeas(loadBlockedIdeasFromStorage());
  }, []);
  

  
  if (blockedIdeas.length === 0) {
    return <p>No blocked ideas</p>;
  }
  
  return (
    <div>
      <h2>Blocked Ideas</h2>
      <ul>
        {blockedIdeas.map(idea => (
          <li key={idea.id} className={scss.blockedIdeaItem}>
            <div>
              <strong>{idea.name}</strong> - {idea.author.nick}
            </div>
            <Button 
              color="blue" 
              onClick={() => unBlockIdeaTrpcRoute(idea.id)}
              size="small"
            >
              Unblock
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};