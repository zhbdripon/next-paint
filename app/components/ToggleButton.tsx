"use client";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  value: boolean;
  tooltip?: string;
  onSwitchedOn: () => void;
  disabled?: boolean;
}

const ToggleButton = ({
  icon: Icon,
  value,
  tooltip,
  onSwitchedOn,
  disabled = false,
}: Props) => {
  return (
    <div className="p-2 md:border-b-2 ">
      <Tooltip content={tooltip}>
        <IconButton disabled={disabled} variant="outline" color="gray">
          <Icon
            size={25}
            color={disabled ? "gray" : value ? "red" : "black"}
            onClick={onSwitchedOn}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ToggleButton;
