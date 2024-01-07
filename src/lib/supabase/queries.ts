import { workspaces } from "../../../migrations/schema";
import db from "./db";
import { workspace } from "./supabase.types";

export const createWorkspace = async (workspace: workspace) => {
    try {
      const response = await db.insert(workspaces).values(workspace);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: 'Error' };
    }
  };
