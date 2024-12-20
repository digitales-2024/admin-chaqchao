import { validateTimeFormat } from "@/utils/time";

import { Input } from "@/components/ui/input";

interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
}

export function TimeInput({ value, onChange }: TimeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (validateTimeFormat(input)) {
      onChange(input);
    }
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="HH:mm"
      className="w-[120px]"
      maxLength={5}
    />
  );
}
