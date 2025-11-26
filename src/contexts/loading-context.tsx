import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { LoadingOverlay } from "@/components/loading-overlay";

interface LoadingContextType {
  isLoading: boolean;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  loadingMessage: string;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Thời gian tối thiểu hiển thị loading (ms) để tránh bị nháy màn hình
const MIN_LOADING_TIME = 500;

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Ref để theo dõi số lượng request đang chạy
  const loadingCount = useRef(0);
  // Ref để lưu thời điểm bắt đầu loading
  const startTime = useRef<number>(0);
  // Ref để clear timeout nếu component unmount (trong browser, setTimeout trả về number)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = useCallback((message?: string) => {
    // Nếu đang có timeout chờ tắt, hủy nó đi để hiện tiếp
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (message) setLoadingMessage(message);

    // Nếu đây là request đầu tiên, đánh dấu thời gian bắt đầu
    if (loadingCount.current === 0) {
      startTime.current = Date.now();
      setIsLoading(true);
    }

    // Tăng biến đếm
    loadingCount.current += 1;
  }, []);

  const stopLoading = useCallback(() => {
    // Giảm biến đếm
    loadingCount.current = Math.max(0, loadingCount.current - 1);

    // Chỉ tắt khi tất cả request đã xong (count về 0)
    if (loadingCount.current === 0) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime.current;

      // Tính toán thời gian cần chờ thêm
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      // Delay việc tắt loading
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        // Reset message sau khi animation tắt hẳn (để tránh text bị đổi đột ngột khi đang fade out)
        setTimeout(() => setLoadingMessage(""), 300);
      }, remainingTime);
    }
  }, []);

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
        loadingMessage,
      }}
    >
      {children}
      <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
