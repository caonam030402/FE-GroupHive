import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IProps {
  setAction?: (
    sidebarWidth: number,
    setSidebarWidth: Dispatch<SetStateAction<number>>,
  ) => void;
  minWidth?: number;
}

export default function useResize({ setAction, minWidth }: IProps) {
  const [sidebarWidth, setSidebarWidth] = useState(70);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        if (minWidth && minWidth > e.clientX) return;
        requestAnimationFrame(() => {
          setSidebarWidth(e.clientX);
        });
      }
    },
    [isResizing, setSidebarWidth, minWidth],
  );
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    setAction && setAction(sidebarWidth, setSidebarWidth);
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, setAction, sidebarWidth]);

  return {
    sidebarWidth,
    isResizing,
    handleMouseDown,
    setIsResizing,
    setSidebarWidth,
  };
}
