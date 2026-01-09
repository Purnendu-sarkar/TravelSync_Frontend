/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { updateReviewAction } from "@/services/review/review.service";

interface UpdateReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: any;
}

const UpdateReviewDialog = ({
  open,
  onOpenChange,
  review,
}: UpdateReviewDialogProps) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      rating: review?.rating ?? 1,
      comment: review?.comment ?? "",
    },
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit = async (data: any) => {
    if (!data.rating) {
      toast.error("Rating is required");
      return;
    }

    setIsUpdating(true);

    const formData = new FormData();
    formData.append("id", review.id);
    formData.append("rating", String(data.rating));
    formData.append("comment", data.comment || "");

    const result = await updateReviewAction(null, formData);

    setIsUpdating(false);

    if (result.success) {
      toast.success("Review updated successfully!");
      onOpenChange(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Rating</Label>
            <Select
              defaultValue={review?.rating.toString()}
              onValueChange={(value) => setValue("rating", Number(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Comment</Label>
            <Input
              {...register("comment")}
              placeholder="Update your comment..."
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReviewDialog;
