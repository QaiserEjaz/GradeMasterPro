import { useState, useEffect, useCallback, useRef } from 'react';

const getCalculatorDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 320, height: 420 };
  }
  const width = Math.min(320, Math.max(260, window.innerWidth - 32));
  const height = Math.min(420, Math.max(340, window.innerHeight - 64));
  return { width, height };
};

interface FloatingCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FloatingCalculator({ isOpen, onClose }: FloatingCalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculation, setCalculation] = useState('');
  
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState(getCalculatorDimensions);
  const [position, setPosition] = useState(() => {
    const { width, height } = getCalculatorDimensions();
    const centerX = typeof window !== 'undefined' ? (window.innerWidth - width) / 2 : 400;
    const centerY = typeof window !== 'undefined' ? (window.innerHeight - height) / 2 : 300;
    return { x: Math.max(0, centerX), y: Math.max(0, centerY) };
  });

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  }, [position.x, position.y]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    e.stopPropagation();
    setIsDragging(true);
    const touch = e.touches[0];
    dragOffsetRef.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    };
  }, [position.x, position.y]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const newX = e.clientX - dragOffsetRef.current.x;
    const newY = e.clientY - dragOffsetRef.current.y;
    
    const calculatorWidth = dimensions.width;
    const calculatorHeight = dimensions.height;
    const maxX = Math.max(0, window.innerWidth - calculatorWidth);
    const maxY = Math.max(0, window.innerHeight - calculatorHeight);
    
    const newPosition = {
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    };
    
    setPosition(newPosition);
  }, [isDragging, dimensions]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    if (!touch) return;

    const newX = touch.clientX - dragOffsetRef.current.x;
    const newY = touch.clientY - dragOffsetRef.current.y;

    const calculatorWidth = dimensions.width;
    const calculatorHeight = dimensions.height;
    const maxX = Math.max(0, window.innerWidth - calculatorWidth);
    const maxY = Math.max(0, window.innerHeight - calculatorHeight);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDragging, dimensions]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard handler
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Only handle keyboard events when calculator is open
    if (!isOpen) return;
    
    const key = e.key;
    console.log('Keyboard pressed:', key, 'display:', display, 'waitingForOperand:', waitingForOperand);
    
    if (key >= '0' && key <= '9') {
      e.preventDefault();
      inputNumber(key);
    } else if (key === '.') {
      e.preventDefault();
      inputNumber('.');
    } else if (key === '+') {
      e.preventDefault();
      inputOperation('+');
    } else if (key === '-') {
      e.preventDefault();
      inputOperation('-');
    } else if (key === '*') {
      e.preventDefault();
      inputOperation('×');
    } else if (key === '/') {
      e.preventDefault();
      inputOperation('÷');
    } else if (key === 'Enter' || key === '=') {
      e.preventDefault();
      performCalculation();
    } else if (key === 'Backspace') {
      e.preventDefault();
      deleteLastDigit();
    } else if (key === 'Escape') {
      e.preventDefault();
      clear();
    } else if (key === 'Delete') {
      e.preventDefault();
      clear();
    }
  }, [isOpen, display, waitingForOperand]);

  // Set up event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('keydown', handleKeyPress);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [isOpen, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd, handleKeyPress]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getCalculatorDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPosition(prev => {
      if (typeof window === 'undefined') return prev;
      const maxX = Math.max(0, window.innerWidth - dimensions.width);
      const maxY = Math.max(0, window.innerHeight - dimensions.height);
      return {
        x: Math.max(0, Math.min(prev.x, maxX)),
        y: Math.max(0, Math.min(prev.y, maxY))
      };
    });
  }, [dimensions]);

  const inputNumber = (num: string) => {
    console.log('inputNumber called with:', num, 'current display:', display, 'waitingForOperand:', waitingForOperand);
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
      setCalculation(prev => prev + num);
    } else {
      const newDisplay = display === '0' ? num : display + num;
      console.log('Setting display to:', newDisplay);
      setDisplay(newDisplay);
      
      // Update calculation - replace the last number if we're continuing to type
      if (calculation && !waitingForOperand && previousValue !== null) {
        // We're continuing to type a number after an operation
        const parts = calculation.split(' ');
        if (parts.length >= 3) {
          // Replace the last part (current number being typed)
          parts[parts.length - 1] = newDisplay;
          setCalculation(parts.join(' '));
        } else {
          setCalculation(prev => prev + num);
        }
      } else if (calculation === '') {
        // Starting fresh
        setCalculation(newDisplay);
      } else {
        // Continuing to type the first number
        setCalculation(newDisplay);
      }
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setCalculation(display + ' ' + nextOperation + ' ');
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setCalculation(prev => prev + ' = ' + newValue + ' ' + nextOperation + ' ');
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setCalculation(prev => prev + ' = ' + newValue);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setCalculation('');
  };

  const deleteLastDigit = () => {
    if (display === '0') return;
    
    const newDisplay = display.length === 1 ? '0' : display.slice(0, -1);
    setDisplay(newDisplay);
    
    // Update calculation display
    if (calculation) {
      if (newDisplay === '0') {
        setCalculation('');
      } else {
        // Remove the last character from calculation
        setCalculation(prev => prev.slice(0, -1));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Calculator Window */}
      <div 
        className={`w-80 rounded-2xl bg-white p-6 shadow-2xl border-2 select-none z-[10000] transition-none ${
          isDragging ? 'border-blue-500 shadow-3xl' : 'border-gray-200'
        }`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'default',
          userSelect: 'none',
          willChange: 'transform',
          width: dimensions.width,
          maxWidth: 'calc(100vw - 2rem)',
          height: dimensions.height,
          maxHeight: 'calc(100vh - 4rem)'
        }}
      >
        {/* Header - Draggable */}
        <div 
          className="mb-4 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Calculator</h3>
            <p className="text-xs text-gray-500">Drag to move • Use keyboard</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Display */}
        <div className="mb-4 rounded-lg bg-gray-900 p-4 text-right">
          <div className="min-h-[1.5rem] text-sm font-mono text-gray-400">
            {calculation || '\u00A0'}
          </div>
          <div className="text-2xl font-mono text-white">{display}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="rounded-lg bg-gray-300 p-2 text-sm font-semibold text-gray-700 hover:bg-gray-400"
          >
            AC
          </button>
          <button
            onClick={deleteLastDigit}
            className="rounded-lg bg-gray-300 p-2 text-sm font-semibold text-gray-700 hover:bg-gray-400"
          >
            Del
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className="rounded-lg bg-orange-500 p-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            ÷
          </button>
          <button
            onClick={() => inputOperation('×')}
            className="rounded-lg bg-orange-500 p-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            ×
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            9
          </button>
          <button
            onClick={() => inputOperation('-')}
            className="rounded-lg bg-orange-500 p-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            −
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            6
          </button>
          <button
            onClick={() => inputOperation('+')}
            className="rounded-lg bg-orange-500 p-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            +
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            3
          </button>
          <button
            onClick={performCalculation}
            className="row-span-2 rounded-lg bg-orange-500 p-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            =
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            0
          </button>
          <button
            onClick={() => inputNumber('.')}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            .
          </button>
        </div>
      </div>
    </>
  );
}
