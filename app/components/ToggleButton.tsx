"use client";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  value: boolean;
  tooltip?: string;
  onSwitchedOn: () => void;
}

const ToggleButton = ({ icon: Icon, value, tooltip, onSwitchedOn }: Props) => {
  return (
    <div className="p-2 border-b-2 ">
      <Icon size={25} color={value ? "red" : "black"} onClick={onSwitchedOn} />
    </div>
  );
};

export default ToggleButton;
