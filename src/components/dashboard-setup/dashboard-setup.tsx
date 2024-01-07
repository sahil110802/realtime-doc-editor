  //src/components/dashboard-setup/dashboard-setup.tsx

import { CreateWorkspaceFormSchema } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { createWorkspace } from "@/lib/supabase/queries";
import { workspace } from "@/lib/supabase/supabase.types";

  //get supabase client
  //import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
  const supabase = createClientComponentClient();
  //get dispatch function
  const { dispatch } = useAppState();

  //function to handle file submit
  const onSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspaceFormSchema>
  > = async (value) => {
    //get the file itself
    const file = value.logo?.[0];
    //creating the path
    let filePath = null;
    //get a new valid ID
    const workspaceUUID = v4();

    //user chose a file
    if (file) {
      try {
        //uploading to buckets
        const { data, error } = await supabase.storage
          .from('workspace-logos')
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            //1 minute
            cacheControl: '3600',
            //overwrite if exists
            upsert: true,
          });
        if (error) throw new Error();
        //set new file path
        filePath = data.path;
      } catch (error) {
        console.log('Error', error);
        toast({
          variant: 'destructive',
          title: 'Error! Could not upload workspace logo',
        });
      }
    }


        //starting to work with state and db call

    try {
      //constructing workspace to add
      const newWorkspace: workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: selectedEmoji,
        id: workspaceUUID,
        inTrash: '',
        title: value.workspaceName,
        workspaceOwner: user.id,
        logo: filePath || null,
        bannerUrl: '',
      };

      //Calling db function
      const { data, error: createError } = await createWorkspace(newWorkspace);

      //handle error
      if (createError) {
        throw new Error();
      }

      //this will add a new workspace to the state, with no folders created yet.
      dispatch({
        type: 'ADD_WORKSPACE',
        payload: { ...newWorkspace, folders: [] },
      });

      toast({
        title: 'Workspace Created',
        description: `${newWorkspace.title} has been created successfully.`,
      });
      //reset the form
    } finally {
      reset();
    }
  };


  <form onSubmit={handleSubmit(onSubmit)}></form>
    //Done uploading file to bucket!