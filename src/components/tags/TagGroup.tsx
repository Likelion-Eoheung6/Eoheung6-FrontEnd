import React, { useState } from 'react';
import TagChip from './TagChip';

type TagGroupProps = {
  tags: string[];
  multiple?: boolean;
  onChange?: (selected: string[] | string) => void;
  isEasyVersion?: boolean;
};

export default function TagGroup({ tags, multiple = true, onChange, isEasyVersion = false }: TagGroupProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string) => {
    let next: string[];
    if (multiple) {
      next = selected.includes(label)
        ? selected.filter(t => t !== label)
        : [...selected, label];
    } else {
      next = selected.includes(label) ? [] : [label];
    }
    setSelected(next);
    onChange?.(multiple ? next : next[0] ?? '');
  };

  return (
    <div className="flex flex-wrap gap-[8px]">
      {tags.map(tag => (
        <TagChip key={tag} label={tag} selected={selected.includes(tag)} onClick={() => toggle(tag)} isEasyVersion={isEasyVersion} />
      ))}
    </div>
  );
}


