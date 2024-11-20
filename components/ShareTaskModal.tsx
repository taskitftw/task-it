"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Todo } from "@/types/todo";

interface ShareTaskModalProps {
  todo: Todo;
}

export default function ShareTaskModal({ todo }: ShareTaskModalProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an email address",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }

    try {
      // Get current user
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Create share data
      const shareData = {
        taskId: todo.id,
        taskTitle: todo.title,
        taskDescription: todo.description,
        taskDate: todo.date,
        sharedBy: user.username || 'A user',
        sharedWith: email,
      };

      // Store shared task in localStorage
      const sharedTasks = JSON.parse(localStorage.getItem('sharedTasks') || '[]');
      sharedTasks.push(shareData);
      localStorage.setItem('sharedTasks', JSON.stringify(sharedTasks));

      toast({
        title: "Success",
        description: `Task shared with ${email}`,
      });

      setEmail("");
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to share task. Please try again.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Task Details</Label>
            <div className="rounded-lg border p-3 text-sm">
              <p className="font-medium">{todo.title}</p>
              {todo.description && (
                <p className="text-muted-foreground mt-1">{todo.description}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Share with (email)</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleShare}>Share</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
