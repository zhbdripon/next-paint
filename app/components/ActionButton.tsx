"use client";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  tooltip?: string;
  onClick: () => void;
  disabled: boolean;
}

const ActionButton = ({ icon: Icon, tooltip, onClick, disabled }: Props) => {
  return (
    <div className="p-2 md:border-b-2 ">
      <Tooltip content={tooltip}>
        <IconButton
          onClick={onClick}
          variant="outline"
          color="gray"
          disabled={disabled}
        >
          <Icon size={25} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ActionButton;
