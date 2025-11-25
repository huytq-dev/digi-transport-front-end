import { useState, useCallback } from 'react';

type SwapState = 'idle' | 'swapping';

const SWAP_ANIMATION_DURATION = 200;

export function useSwapLocations() {
  const [swapState, setSwapState] = useState<SwapState>('idle');

  const swap = useCallback((fromValue: string, toValue: string, onSwap: (from: string, to: string) => void) => {
    if (swapState === 'swapping') return; // Prevent spam clicks
    
    setSwapState('swapping');
    
    // Wait for animation to complete (fade out) -> Swap data -> Reset state
    setTimeout(() => {
      onSwap(toValue, fromValue);
      
      // Reset state after animation completes
      setTimeout(() => {
        setSwapState('idle');
      }, SWAP_ANIMATION_DURATION);
    }, SWAP_ANIMATION_DURATION);
  }, [swapState]);

  return { swapState, swap };
}

