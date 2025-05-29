import React from "react";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const page = async () => {
  return (
    <div>
      <HomeView />
    </div>
  );
};

export default page;
