import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { toggleBookmarkJob } from "@/services/userServices";
import { BookmarkCheck } from "lucide-react";

const BookmarkButton = ({ jobId, isBookmarked }) => {
  const queryClient = useQueryClient();
  // toggle Bookmark mutation
  const { mutate: bookmark } = useMutation({
    mutationFn: (jobId) => toggleBookmarkJob(jobId),
  });

  // handle bookmark
  const handleBookmark = () =>
    bookmark(jobId, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["currentUser"]);

        //NOTE: improve performance
        /*   queryClient.setQueryData(["currentUser"], (old) => ({
          ...old,
          user: {
            ...old.user,
            bookmarkedJobs: data.bookmarkedJobs,
          },
        })); */
        toast(`${isBookmarked ? "Unbookmarked" : "Bookmarked"}`, {
          description: data.message,
          action: {
            label: "Undo",
            onClick: () => bookmark(jobId),
          },
        });
      },
      onError: (error) => {
        console.log(error);
        toast(`${"Bookmark failed"}`, {
          description: `${`<div className="border border-red-500 h-20">Failed</div>`}`,
          action: {
            label: "Undo",
            onClick: () => bookmark(jobId),
          },
        });
      },
    });

  return (
    <Button
      onClick={handleBookmark}
      variant="ghost"
      size="icon"
      className="h-full w-full transition-all rounded-full p-1.5"
    >
      {isBookmarked ? (
        <BookmarkCheck className="fill-primary stroke-white" />
      ) : (
        <Bookmark className="fill-white" />
      )}
    </Button>
  );
};

BookmarkButton.propTypes = {
  jobId: PropTypes.string.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
};

export default BookmarkButton;
