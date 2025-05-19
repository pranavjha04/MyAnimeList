import { useState } from "react";

export default function Synopsis({ animeInfo }) {
  const [expand, setExpand] = useState(false);
  return (
    <div className="synopsis">
      <h3 className="sub-heading">Synopsis</h3>
      <p>
        {expand
          ? animeInfo.synopsis
          : `${animeInfo.synopsis.slice(0, 200)}... `}
        <button onClick={() => setExpand(!expand)} className="text-blue-500">
          {expand ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
}
