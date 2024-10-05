import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { toggleBookmarkJob } from "@/services/userServices";

const BookmarkButton = ({ jobId, isBookmarked }) => {
  const queryClient = useQueryClient();
  // toggle Bookmark mutation
  const { mutate: bookmark } = useMutation({
    mutationFn: (jobId) => toggleBookmarkJob(jobId),
  });

  // handle bookmark
  const handleBookmark = () =>
    bookmark(jobId, {
      onSuccess: (s) => {
        console.log(s);
        queryClient.invalidateQueries(["user"]);
        toast(`${isBookmarked ? "Unbookmarked" : "Bookmarked"}`, {
          description: isBookmarked,
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
      className="h-full w-full text-black rounded-full p-1.5"
    >
      <Bookmark fill={isBookmarked ? "black" : "white"} />
    </Button>
  );
};

BookmarkButton.propTypes = {
  jobId: PropTypes.string.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
};

export default BookmarkButton;
