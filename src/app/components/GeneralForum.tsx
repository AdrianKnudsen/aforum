// GeneralForum — thin wrapper that renders ForumSection for the "General" category.
import React from "react";
import ForumSection from "./ForumSection";

export default function generalForum() {
  return <ForumSection category="generalPost" title="General" />;
}
