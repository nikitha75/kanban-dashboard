import { v4 as uuidv4 } from "uuid";

export const taskPriorities = [
  {
    priorityId: uuidv4(),
    priority: "HIGH",
  },
  {
    priorityId: uuidv4(),
    priority: "MEDIUM",
  },
  {
    priorityId: uuidv4(),
    priority: "LOW",
  },
];

export const priorityStyle = {
  HIGH: "#ed3980",
  MEDIUM: "#377ef1",
  LOW: "#10b4b3",
};
