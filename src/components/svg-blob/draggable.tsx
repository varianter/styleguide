import React, { useCallback, useState, useEffect } from "react";

type Position = {
  x: number;
  y: number;
};
type DraggableOptions = {
  onDrag?(pos: Position): void;
  onDragEnd?(pos: Position): void;
};
type ReturnType<T extends Element> = {
  position: Position;
  drag(e: React.MouseEvent<T, MouseEvent>): void;
};

const useDraggable = <T extends Element>({
  onDrag,
  onDragEnd,
}: DraggableOptions = {}): ReturnType<T> => {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState<boolean>(false);
  const handleMouseDown = useCallback(() => setDragging(true), []);

  const handleMouseMove = useCallback(
    ({ movementX, movementY }: MouseEvent) => {
      if (!isDragging) return;
      const translation = {
        x: pos.x + movementX,
        y: pos.y + movementY,
      };

      setPos(translation);
      onDrag?.(translation);
    },
    [isDragging, pos.x, pos.y, onDrag]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    onDragEnd?.(pos);
  }, [onDragEnd, pos]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { position: pos, drag: handleMouseDown };
};

export default useDraggable;
