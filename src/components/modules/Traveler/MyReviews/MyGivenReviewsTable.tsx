/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

import { toast } from "sonner";
import { deleteReviewAction } from "@/services/review/review.service";
import UpdateReviewDialog from "./UpdateReviewDialog";

interface MyGivenReviewsTableProps {
  reviews: any[];
}

const MyGivenReviewsTable = ({ reviews }: MyGivenReviewsTableProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedReview) return;
    setIsDeleting(true);
    const result = await deleteReviewAction(selectedReview.id);
    setIsDeleting(false);
    setDeleteOpen(false);
    if (result.success) {
      toast.success("Review deleted successfully!");
    } else {
      toast.error(result.message);
    }
  };

  const openEdit = (review: any) => {
    setSelectedReview(review);
    setEditOpen(true);
  };

  const openDelete = (review: any) => {
    setSelectedReview(review);
    setDeleteOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Travel Plan</TableHead>
            <TableHead>Reviewee</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.travelPlan.destination}</TableCell>
              <TableCell>{review.reviewee.name}</TableCell>
              <TableCell>{review.rating}/5</TableCell>
              <TableCell>{review.comment || "No comment"}</TableCell>
              <TableCell>
                {new Date(review.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEdit(review)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDelete(review)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {reviews.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No reviews given yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedReview && (
        <UpdateReviewDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          review={selectedReview}
        />
      )}

      <DeleteConfirmationDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Review?"
        description="This will permanently delete your review. Are you sure?"
        isDeleting={isDeleting}
      />
    </>
  );
};

export default MyGivenReviewsTable;
