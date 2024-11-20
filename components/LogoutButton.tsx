"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem('user');
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('todos');

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });

    // Redirect to home page
    router.push('/');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      className="fixed top-4 right-16"
      title="Logout"
    >
      <LogOut className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Logout</span>
    </Button>
  );
}
